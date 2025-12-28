import { IonPage, IonContent, IonTitle } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>{t("welcomeMessage")}</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;
