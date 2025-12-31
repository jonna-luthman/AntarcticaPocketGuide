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

import useAnimals from "../hooks/useAnimals";
import useGetLang from "../hooks/useGetLang";

import Header from "../components/Header";
import CollapsableHeader from "../components/CollapsableHeader";
import Image from "../components/Image";

import styles from "./styles/Home.module.css";
import IdentifyPenguin from "../assets/icons/identify-penguin-icon.svg";

import { resolveImageUrl } from "../utils/resolveImageUrl";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { animalClasses, getAllAnimalClasses } = useAnimals();
  const getLang = useGetLang();
  const { t } = useTranslation();

  const router = useIonRouter();

  useEffect(() => {
    getAllAnimalClasses();
  }, []);

  const handleNavigate = (url: string) => {
    router.push(url, "forward", "replace");
  };

  return (
    <IonPage>
        <Header showMenu={true} />
      <IonContent fullscreen={true}>
        <IonGrid className={styles.parent}>
          {animalClasses?.map((animalClass) => (
            <IonCol
              key={animalClass.id}
              className={styles.gridItem}
              onClick={() => handleNavigate(`/animals/${animalClass.slug}`)}
            >
              <Image
                image={animalClass?.SpeciesMedia[0]}
                className="coverImage"
                imageUrl={resolveImageUrl(
                  animalClass?.SpeciesMedia[0]?.media_url,
                  "Homepage"
                )}
              />
              <IonText className={styles.heading}>
                {getLang(animalClass, "name")}
              </IonText>
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
                <h2>{t("pages.home.identifyPenguins")}</h2>
                <p>{t("pages.home.identifyPenguinsNote")}</p>
              </IonText>
            </IonItem>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
