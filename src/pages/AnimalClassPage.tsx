import { IonPage, IonContent, IonList } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Header from "../components/Header";
import SpeciesCard from "../components/Species/SpeciesCard";
import Breadcrumbs from "../components/ui/Breadcrumbs";

import useAnimals from "../hooks/useAnimals";
import useSpecies from "../hooks/useSpecies";

import { UISpecieSummaryWithMedia } from "../types/species";
import { AnimalClassSummary } from "../types/animalClasses";
import { mapSpecieSummaryToUI } from "../mappers/speciesSummary";
import useGetLang from "../hooks/useGetLang";
import { findImageByRole } from "../utils/getMediaTypes";

const AnimalClassPage: React.FC = () => {
  const { classSlug } = useParams<{ classSlug: string }>();
  const { getSpeciesByClass } = useSpecies();
  const { getAnimalClass } = useAnimals();
  const getLang = useGetLang();

  const [species, setSpecies] = useState<UISpecieSummaryWithMedia[] | null>(
    null
  );
  const [animalClass, setAnimalClass] = useState<AnimalClassSummary | null>(
    null
  );

  useEffect(() => {
    getAnimalClass(classSlug).then(setAnimalClass);
  }, [classSlug]);

  useEffect(() => {
    const classId = animalClass?.id;
    if (!classId) return;

    const fetchData = async () => {
      try {
        const data = await getSpeciesByClass(classId, { includeMedia: true });

        if (!data) return;

        const uiData = data.map(mapSpecieSummaryToUI);

        setSpecies(uiData);
      } catch (error) {
        console.error("Failed to fetch species:", error);
      }
    };

    fetchData();
  }, [animalClass]);

  return (
    <IonPage>
        <Header showBackButton={true} />
      <IonContent>
        {/* <CollapsableHeader /> */}
        <Breadcrumbs param1={getLang(animalClass, "name")} />
        <IonList>
          {species &&
            species.map((s) => {
              const headerImage = findImageByRole(s.SpeciesMedia, "header");
              return (
                <div key={s.id}>
                  <SpeciesCard
                    species={s}
                    headerImage={headerImage ?? undefined}
                    title={getLang(s, "name_common")}
                    subtitle={s.name_latin}
                  />
                </div>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AnimalClassPage;
