import { IonContent, IonPage, IonTitle, useIonRouter } from "@ionic/react";
import { UserAuth } from "../context/AuthContext";
import useUser from "../hooks/useUser.ts"
import React, { useEffect } from "react";
import { useHistory } from "react-router"

const FieldJournal: React.FC<{ onShowLogin: () => void }> = ({ onShowLogin }) => {
  const { session } = UserAuth();

  useEffect(() => {
    if (!session) {
      onShowLogin();
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>Field Journal</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default FieldJournal;
