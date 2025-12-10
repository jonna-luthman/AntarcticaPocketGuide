import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useState, useEffect } from "react";
import { getAllSpecies } from "../hooks/useSpecies";
import { Specie } from "../types/species";
import Header from "../components/header";
import CollapsableHeader from "../components/CollapsableHeader";


const Home: React.FC = () => {
  const [species, setSpecies] = useState<Specie[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllSpecies();
        setSpecies(data);
      } catch (err) {
        console.error(err);
      } 
    }

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
      <Header showMenu={true}/>
      <CollapsableHeader/>
        <IonList>
          {species.map((specie) => (
            <IonItem key={specie.id}>
              <IonLabel>{specie.name_common}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
