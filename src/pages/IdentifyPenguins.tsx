import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import React from "react";
import Header from "../components/Header";
import styles from "./styles/IdentifyPenguins.module.css";
import { useTranslation } from "react-i18next";
import identifyPenguinIcon from "../assets/icons/identify-penguin-icon.svg";

const IdentifyPenguins: React.FC = () => {
  const { t } = useTranslation();

  const PenguinCard = ({
    penguin,
    description,
    src,
  }: {
    penguin: string;
    description: string;
    src: string;
  }) => {
    return (
      <div className="">
        {/* TODO: Add routerLink when all species are added. */}
        {/* <IonRouterLink> */}
          <IonCard color="tertiary" className={styles.cardWrapper}>
            <div>
              <IonCardHeader className={styles.cardHeader}>
                <IonCardTitle>
                  <h2 className={styles.cardFont}>{penguin}</h2>
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent className={styles.cardFont}>
                {description}
              </IonCardContent>
            </div>
            <img
              src={src}
              alt={`${penguin} penguin`}
              className={styles.cardImage}
            />
          </IonCard>
        {/* </IonRouterLink> */}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header showBackButton={true} />
        <div className={styles.gridWrapper}>
          <PenguinCard
            penguin="Gentoo"
            description={t("identifyingPenguins.gentoo")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/identifyPenguins/Northern_Rockhopper_penguin_KM_1.webp"
          />
          <PenguinCard
            penguin="Adelie"
            description={t("identifyingPenguins.adelie")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/identifyPenguins/Adelie_KM.webp"
          />
          <div>
            <IonCard color="tertiary" className={styles.card}>
              <IonCardHeader className={styles.cardHeader}>
                <IonCardTitle>
                  <h4>{t("identifyingPenguins.description")}</h4>
                </IonCardTitle>
              </IonCardHeader>
              <img
                src={identifyPenguinIcon}
                alt={t("identifyingPenguins.imageAtt")}
                className={styles.cardIntro}
              />
            </IonCard>
          </div>
          <PenguinCard
            penguin="Chinstrap"
            description={t("identifyingPenguins.chinstrap")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/identifyPenguins/Penguin_Chinstrap_04_KM%202_1.webp"
          />
          <PenguinCard
            penguin="King"
            description={t("identifyingPenguins.king")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/identifyPenguins/King%20Penguin_KM_1.webp"
          />
          <PenguinCard
            penguin="Emperor"
            description={t("identifyingPenguins.emperor")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/identifyPenguins/Penguin_King_1000px_1.webp"
          />
          <PenguinCard
            penguin="Macaroni"
            description={t("identifyingPenguins.macaroni")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/identifyPenguins/Penguin_Macaroni_KM%202_1.webp"
          />
          <PenguinCard
            penguin="Rockhopper"
            description={t("identifyingPenguins.rockhopper")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/identifyPenguins/Northern_Rockhopper_penguin_KM_1.webp"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default IdentifyPenguins;
