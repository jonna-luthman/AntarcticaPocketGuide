import {
  IonContent,
  IonItem,
  IonPage,
  IonText,
  IonGrid,
  IonCol,
  useIonRouter,
  IonThumbnail,
} from "@ionic/react";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

import useAnimals from "../hooks/useAnimals";

import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import Image from "../components/Image";

import styles from "./styles/Home.module.css";
import IdentifyPenguin from "../assets/identify-penguin-icon.svg";
import { resolveImageUrl } from "../utils/resolveImageUrl";

const Home: React.FC = () => {
  const { animalClasses, getAllAnimalClasses } = useAnimals();
  const { session } = UserAuth();

  const router = useIonRouter();
  console.log("session", session);

  useEffect(() => {
    getAllAnimalClasses();
  }, []);

  const handleNavigate = (url: string) => {
    router.push(url, "forward", "replace");
  };

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <Header showMenu={true} />
        <CollapsableHeader />
        <IonGrid className={styles.parent}>
          {animalClasses?.map((animalClass) => (
            <IonCol
              key={animalClass.id}
              className={styles.gridItem}
              onClick={() => handleNavigate(`/animals/${animalClass.slug}`)}
            >
              <Image
                image={animalClass.SpeciesMedia[0]}
                className="coverImage"
                imageUrl={resolveImageUrl(
                  animalClass?.SpeciesMedia[0]?.media_url,
                  "Homepage"
                )}
              />
              <IonText className={styles.heading}>{animalClass.name}</IonText>
            </IonCol>
          ))}

          {/* Add my species list when page is created. */}

          <IonCol className={styles.fullWidthRow}>
            <IonItem
              lines="none"
              button
              detail={false}
              className={styles.identifyItem}
              routerLink="/identify-penguins"
            >
              <IonThumbnail slot="start" className={styles.icon}>
                <img alt="Man with binoculars" src={IdentifyPenguin} />
              </IonThumbnail>
              <IonText>
                <h2>How to identify penguins</h2>
                <p>Use our guide to find out what you saw</p>
              </IonText>
            </IonItem>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
