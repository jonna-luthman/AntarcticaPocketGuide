import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import styles from "./styles/SpecieCard.module.css";

interface SpecieCardProps {
  title: string | null;
  subtitle: string | null;
  src: string | undefined;
}

const SpecieCard: React.FC<SpecieCardProps> = ({ title, subtitle, src }) => {
  return (
    <IonCard className={styles.specieCard} color="tertiary">
      <div className={styles.contentWrapper}>
        <img
          src={src}
          alt={`Bild för ${title}`}
          className={styles.cornerImage}
        />

        <IonCardHeader className={styles.cardHeader}>
          <IonCardSubtitle className={styles.cardFont}>
            {subtitle}
          </IonCardSubtitle>
          <IonCardTitle className={styles.cardFont}>{title}</IonCardTitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
};

export default SpecieCard;
