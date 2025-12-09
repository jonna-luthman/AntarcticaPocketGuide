import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAllSpecies } from "../hooks/useSpecies";
import { Specie } from "../types/species";
import { UserAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const [species, setSpecies] = useState<Specie[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useIonRouter();

  const { session, signOutUser } = UserAuth();
  console.log("session", session)

  const handleSignOut = async (e: Event) => {
    e.preventDefault();
    try {
      await signOutUser();
      router.push("/login", "none");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(session);
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
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {species.map((specie) => (
            <IonItem key={specie.id}>
              <IonLabel>{specie.name_common}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonButton
        className="ion-margin-top"
        expand="block"
        onClick={handleSignOut}
      >
        Sign out
      </IonButton>
    </IonPage>
  );
};

export default Home;
