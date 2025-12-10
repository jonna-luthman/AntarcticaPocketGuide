import {
  IonPage,
  IonContent,
  IonTitle,
  IonItem,
  IonList,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import { useParams } from "react-router";
import useSpecies from "../hooks/useSpecies";
import { Specie, SpecieSummary } from "../types/species";

const AnimalClassPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { className } = useParams<{ className: string }>();
  const { getSpeciesByClass, species } = useSpecies();

  useEffect(() => {
    if (!classId) return;
      getSpeciesByClass(classId);
  }, [classId]);

  return (
    <IonPage>
      <Header showBackButton={true} />
      <CollapsableHeader />
      <IonContent fullscreen>
        <IonTitle>{className}</IonTitle>
        <IonList>
          {species?.map((specie: SpecieSummary) => (
            <IonRouterLink href={`/animal/${specie.id}`}>
              <IonItem key={specie.id}>
                <IonText>{specie.name_common}</IonText>
              </IonItem>
            </IonRouterLink>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AnimalClassPage;
