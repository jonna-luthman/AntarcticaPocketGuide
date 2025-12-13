import { IonPage, IonContent, IonList, IonRouterLink, useIonRouter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import { useParams } from "react-router";
import useSpecies from "../hooks/useSpecies";
import { SpecieSummary } from "../types/species";
import SpecieCard from "../components/Species/SpecieCard";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import useAnimals from "../hooks/useAnimals";
import { useLoading } from "../context/LoadingContext";
import { AnimalClassSummary } from "../types/animalClasses";

const AnimalClassPage: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();
  const { classSlug } = useParams<{ classSlug: string }>();
  const { getSpeciesByClass } = useSpecies();
  const { getAnimalClass } = useAnimals();

  const [species, setSpecies] = useState<SpecieSummary[] | null>(null);
  const [animalClass, setAnimalClass] = useState<AnimalClassSummary | null>(
    null
  );

  const router = useIonRouter();

  useEffect(() => {
    const fetch = async () => {
      showLoading();

      const classData = await getAnimalClass(classSlug);
      setAnimalClass(classData);

      if (classData?.id) {
        const speciesData = await getSpeciesByClass(classData.id);
        setSpecies(speciesData);
      }

      hideLoading();
    };

    fetch();
  }, [classSlug]);

  return (
    <IonPage>
      <IonContent>
      <Header showBackButton={true} />
      <CollapsableHeader />
        <Breadcrumbs param1={animalClass?.name} />
        <IonList>
          {species?.map((specie: SpecieSummary) => (
            <div key={specie.id} onClick={() => router.push(`/animals/${classSlug}/${specie.id}`, "forward")}>
            <SpecieCard
              title={specie.name_common}
              subtitle={specie.name_latin}
              src="/WeddellSeal.svg"
            />
            </div>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AnimalClassPage;
