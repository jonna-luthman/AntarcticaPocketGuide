import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useState, useEffect } from "react";
import { getAllSpecies } from "../hooks/useSpecies";
import { Specie } from "../types/species";

const Home: React.FC = () => {
  const [species, setSpecies] = useState<Specie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllSpecies();
        setSpecies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
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
