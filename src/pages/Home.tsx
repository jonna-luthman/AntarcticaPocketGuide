import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAllSpecies } from "../hooks/useSpecies";
import { Specie } from "../types/species";
import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import { UserAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const [species, setSpecies] = useState<Specie[]>([]);

  const { session } = UserAuth();
  console.log("session", session)

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
      </IonContent>
    </IonPage>
  );
};

export default Home;
