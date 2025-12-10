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

const Home: React.FC = () => {
  const { animalClasses } = useAnimals();
  const { session } = UserAuth();
  console.log("session", session)

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header showMenu={true} />
        <CollapsableHeader />
        <IonList>
          {animalClasses?.map((animalClass) => (
              <IonRouterLink href={`/${animalClass.name}/${animalClass.id}`}>
            <IonItem key={animalClass.id}>
                <IonText>{animalClass.name}</IonText>
            </IonItem>
              </IonRouterLink>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
