import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { addOutline, removeOutline } from "ionicons/icons";
import { useState } from "react";
import styles from "./styles/QuantitySelector.module.css";

interface QuantitySelectorProps {
  count: number;
  setCount: (count: number) => void;
}

const QuantitySelector: React.FC = ({
  setCount,
  count,
}): QuantitySelectorProps => {

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (count > 1) setCount(count - 1);
  };

  return (
    <div slot="end" className={styles.controls}>
      <IonButton
        fill="clear"
        color="dark"
        onClick={handleDecrement}
        className={styles.controlButton}
      >
        <IonIcon icon={removeOutline} slot="icon-only" />
      </IonButton>

      <IonText className={styles.counter}>{count}</IonText>

      <IonButton
        fill="clear"
        color="dark"
        onClick={handleIncrement}
        className={styles.controlButton}
      >
        <IonIcon icon={addOutline} slot="icon-only" />
      </IonButton>
    </div>
  );
};

export default QuantitySelector;
