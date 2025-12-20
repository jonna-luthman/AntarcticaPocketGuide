import { IonContent, IonPage, IonTitle, useIonRouter, IonText, IonButton } from "@ionic/react";
import { UserAuth } from "../context/AuthContext";
import useUser from "../hooks/useUser.ts";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

interface FieldJournalProps {
  onShowLoginModal: () => void;
}

const FieldJournal: React.FC<FieldJournalProps> = ({ onShowLoginModal }) => {
  const { session } = UserAuth();

  useEffect(() => {
    if (!session) {
      onShowLoginModal();
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>Field Journal</IonTitle>
        {!session ? (
          <div>
            <IonText>You need to log in to see your saved animals.</IonText>
            <IonButton>Log in</IonButton>
          </div>
        ) : (
          <div>
            <IonText>List of animals</IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FieldJournal;
