import {
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import { addOutline, removeOutline } from "ionicons/icons";
import styles from "./styles/QuantitySelector.module.css";

interface QuantitySelectorProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  count,
  setCount,
}) => {

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div slot="end" className={styles.controls}>
      <IonButton
        fill="clear"
        color="dark"
        onClick={handleDecrement}
        className={styles.controlButton}
        disabled={count <= 1}
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
