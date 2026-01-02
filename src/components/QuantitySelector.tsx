import { IonButton, IonIcon, IonInput } from "@ionic/react";
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
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
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

      <IonInput
        value={count}
        type="number"
        className={styles.counterInput}
        onIonChange={(e) => {
          const val = parseInt(e.detail.value!, 10);
          if (!isNaN(val)) {
            setCount(val); 
          }
        }}
      />

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
