import { IonPage, IonContent, IonTitle } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>About us</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;
