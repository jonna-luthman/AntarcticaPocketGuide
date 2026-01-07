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
    link,
  }: {
    penguin: string;
    description: string;
    src: string;
    link: string;
  }) => {
    return (
      <div className="">
        <IonCard
          color="tertiary"
          className={styles.cardWrapper}
          routerLink={link}
        >
          <IonCardHeader className={styles.cardHeader}>
            <IonCardTitle>
              <h2 className={styles.cardFont}>{penguin}</h2>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent className={styles.cardFont}>
            <p>{description}</p>
          </IonCardContent>
          <img
            src={src}
            alt={`${penguin} penguin`}
            className={styles.cardImage}
          />
        </IonCard>
      </div>
    );
  };

  return (
    <IonPage>
      <Header showBackButton={true} />
      <IonContent fullscreen>
        <div className={styles.gridWrapper}>
          <div>
            <IonCard color="tertiary" className={styles.cardWrapper}>
              <IonCardHeader className={styles.cardHeader}>
                <IonCardTitle>
                  <p className={`${styles.cardIntroText} ${styles.cardFont}`}>
                    {t("identifyingPenguins.description")}
                  </p>
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
            penguin="Adelie"
            description={t("identifyingPenguins.adelie")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/species/1109642f-de43-44ad-a76f-dfd877b64048/adelie-penguin.webp"
            link="/animals/birds/1109642f-de43-44ad-a76f-dfd877b64048"
          />
          <PenguinCard
            penguin="Gentoo"
            description={t("identifyingPenguins.gentoo")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/species/bd8bd490-eca8-46b6-ae1f-0e4998d74152/Gentoo.webp"
            link="/animals/birds/bd8bd490-eca8-46b6-ae1f-0e4998d74152"
          />
          <PenguinCard
            penguin="King"
            description={t("identifyingPenguins.king")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/species/991d9fb4-8885-407d-8b80-c64869d64ddd/king-penguin.webp"
            link="/animals/birds/991d9fb4-8885-407d-8b80-c64869d64ddd"
          />
          <PenguinCard
            penguin="Chinstrap"
            description={t("identifyingPenguins.chinstrap")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/species/769300b4-7c9d-401e-a026-29defdfaf12f/Chinstrap.webp"
            link="/animals/birds/769300b4-7c9d-401e-a026-29defdfaf12f"
          />
          <PenguinCard
            penguin="Emperor"
            description={t("identifyingPenguins.emperor")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/species/9c869b1e-3ab7-4864-ba95-91058b2eb71d/emperor-penguin.webp"
            link="/animals/birds/9c869b1e-3ab7-4864-ba95-91058b2eb71d"
          />
          <PenguinCard
            penguin="Macaroni"
            description={t("identifyingPenguins.macaroni")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/species/d8ec5262-4873-4d4b-b6b2-c89ae32db9a0/Penguin_Macaroni_KM.webp"
            link="/animals/birds/d8ec5262-4873-4d4b-b6b2-c89ae32db9a0"
          />
          <PenguinCard
            penguin="Rockhopper"
            description={t("identifyingPenguins.rockhopper")}
            src="https://mefhjfidygidhoynyufe.supabase.co/storage/v1/object/public/species/d9b7c1f0-3551-41e4-bcb1-86e0da8ab20b/rockhopper-penguin.webp"
            link="/animals/birds/d9b7c1f0-3551-41e4-bcb1-86e0da8ab20b"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default IdentifyPenguins;
