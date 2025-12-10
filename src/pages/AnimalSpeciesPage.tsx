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
  const { getSpeciesByClass, getAllSpecies } = useSpecies();
  const [species, setSpecies] = useState<Specie | null>(null);

  console.log(classId)

  useEffect(() => {
    const fetchSpecies = async () => {
      // const data = await getSpeciesByClass(classId);
      const data = await getAllSpecies();
      console.log("data in fetchspecies", data);
      setSpecies(data)
    };
    fetchSpecies();
  }, []);

  return (
    <IonPage>
      <Header showBackButton={true} />
      <CollapsableHeader />
      <IonContent fullscreen>
        <IonTitle>Animal Species page: {classId}</IonTitle>
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
