import { IonContent, IonPage, IonTitle, useIonRouter } from "@ionic/react";
import { UserAuth } from "../context/AuthContext";
import useUser from "../hooks/useUser.ts"
import React, {useEffect} from "react";

const FieldJournal: React.FC = () => {
const { session } = UserAuth()
const router = useIonRouter();



  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>Field Journal</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default FieldJournal;
