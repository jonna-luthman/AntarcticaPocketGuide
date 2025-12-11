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
import { Specie } from "../types/species";

const AnimalSpeciesPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { getAllSpecies, species } = useSpecies();

  console.log(classId)

  useEffect(() => {
    const fetchSpecies = async () => {
      const data = await getAllSpecies();

    };
    fetchSpecies();
  }, []);

  return (
    <IonPage>
      <Header showBackButton={true} />
      <IonContent fullscreen>
        <IonTitle>Animal Species page</IonTitle>
        {/* <IonList>
          {species?.map((specie) => (
            <IonRouterLink href={`/anim/${specie.id}`}>
              <IonItem key={specie.id}>
                <IonText>{specie.name_common}</IonText>
              </IonItem>
            </IonRouterLink>
          ))} */}
        {/* </IonList> */}
      </IonContent>
    </IonPage>
  );
};

export default AnimalSpeciesPage;
