import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonGrid,
  IonCol,
  useIonRouter,
} from "@ionic/react";
import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import useAnimals from "../hooks/useAnimals";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import styles from "./styles/Homepage.module.css";
import Image from "../components/Image";
import imageStyles from "../components/styles/Image.module.css";
import useMedia from "../hooks/useMedia.ts";

const Home: React.FC = () => {
  const { animalClasses, getAllAnimalClasses } = useAnimals();
  const { session } = UserAuth();

  const router = useIonRouter();
  console.log("session", session);


  useEffect(() => {
    getAllAnimalClasses();
  }, []);

  const handleNavigate = (classSlug: string) => {
    router.push(`/animals/${classSlug}`, "forward", "replace");
  };

  return (
    <IonPage>
      <IonContent>
        <Header showMenu={true} />
        <CollapsableHeader />
        <IonGrid className={styles.parent}>
          {animalClasses?.map((animalClass) => (
            <IonCol
              key={animalClass.id}
              className={styles.gridItem}
              onClick={() => handleNavigate(animalClass.slug)}
            >
              <Image
                image={animalClass.SpeciesMedia[0]}
                className="coverImage"
                bucket="Homepage"
              />
              <IonText className={styles.heading}>{animalClass.name}</IonText>
            </IonCol>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
