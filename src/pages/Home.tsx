import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import useAnimals from "../hooks/useAnimals";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home: React.FC = () => {
  const { animalClasses, getAllAnimalClasses } = useAnimals();
  const { session } = UserAuth();
  console.log("session", session);

  useEffect(() => {
    getAllAnimalClasses();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <Header showMenu={true} />
        <CollapsableHeader />
        <IonList>
          {animalClasses?.map((animalClass) => (
            <IonItem
              routerLink={`/animals/${animalClass.slug}`}
              routerDirection="forward"
              button
              key={animalClass.id}
            >
              <IonText>{animalClass.name}</IonText>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
