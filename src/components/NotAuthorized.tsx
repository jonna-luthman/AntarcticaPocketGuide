import { IonIcon, IonText, IonButton } from "@ionic/react";
import styles from "./styles/NotAuthorized.module.css";
import { personCircleOutline } from "ionicons/icons";
import React from "react";

interface NotAuthorizedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
}

const NotAuthorized: React.FC<NotAuthorizedProps> = ({
  title,
  description,
  buttonText,
  onAction,
}) => {

  return (
    <div className={styles.loginPromptContainer}>
      <div className={styles.loginPromptContent}>
        <IonIcon
          icon={personCircleOutline}
          className={styles.loginPromptIcon}
        />

        <IonText color="dark">
          <h2 className={styles.loginPromptTitle}>{title}</h2>
        </IonText>

        <IonText color="medium">
          <p className={styles.loginPromptDescription}>{description}</p>
        </IonText>

        <IonText
          className="ion-margin-horizontal"
          onClick={onAction}
        >
          {buttonText}
        </IonText>
      </div>
    </div>
  );
};

export default NotAuthorized;
