import { IonPage, IonContent, IonList } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import SpeciesCard from "../components/Species/SpeciesCard";
import Breadcrumbs from "../components/ui/Breadcrumbs";

import useAnimals from "../hooks/useAnimals";
import useSpecies from "../hooks/useSpecies";

import { SpecieSummary } from "../types/species";
import { AnimalClassSummary } from "../types/animalClasses";

const AnimalClassPage: React.FC = () => {
  const { classSlug } = useParams<{ classSlug: string }>();
  const { getSpeciesWithHeaderMediaByClass } = useSpecies();
  const { getAnimalClass } = useAnimals();

  const [species, setSpecies] = useState<SpecieSummary[] | null>(null);
  const [animalClass, setAnimalClass] = useState<AnimalClassSummary | null>(
    null
  );

  useEffect(() => {
    getAnimalClass(classSlug).then(setAnimalClass);
  }, [classSlug]);

  useEffect(() => {
    if (!animalClass?.id) return;

    getSpeciesWithHeaderMediaByClass(animalClass.id).then(setSpecies);
  }, [animalClass]);

  return (
    <IonPage>
      <IonContent>
        <Header showBackButton={true} />
        <CollapsableHeader />
        <Breadcrumbs param1={animalClass?.name} />
        <IonList>
          {species && species.map((s) => {
            const headerImage = s.SpeciesMedia?.[0];

            return (
              <div key={s.id}>
              <SpeciesCard species={s} headerImage={headerImage} title={s.name_common}
              subtitle={s.name_latin} />
              </div>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AnimalClassPage;
