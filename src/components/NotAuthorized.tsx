import { IonIcon, IonText, IonButton } from "@ionic/react";
import styles from "./styles/NotAuthorized.module.css"
import { personCircleOutline } from "ionicons/icons";
import React from "react";

interface NotAuthorizedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
}

const NotAuthorized: React.FC<NotAuthorizedProps> = ({ 
  title = "Field Notes", 
  description = "Log in to view your saved animals, track your progress, and build your personal field journal.",
  buttonText = "Sign in or create account",
  onAction 
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
          <p className={styles.loginPromptDescription}>
            {description}
          </p>
        </IonText>

        <IonButton
          expand="block"
          fill="solid"
          className="ion-margin-horizontal"
          onClick={onAction}
          shape="round"
        >
          {buttonText}
        </IonButton>
      </div>
    </div>
  );
};

export default NotAuthorized;