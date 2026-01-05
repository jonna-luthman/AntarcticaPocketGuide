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
        aria-label="Decrease value"
      >
        <IonIcon icon={removeOutline} slot="icon-only" aria-hidden="true"/>
      </IonButton>

      <IonInput
        value={count}
        type="number"
        className={styles.counterInput}
        aria-label="Number"
        onIonChange={(e) => {
          const val = parseInt(e.detail.value!, 10);
          if (!isNaN(val)) {
            setCount(val); 
          }
        }}
      />
      <div slot="helper-text" aria-live="polite" className="ion-hide">
           Current value is {count}
        </div>

      <IonButton
        fill="clear"
        color="dark"
        onClick={handleIncrement}
        className={styles.controlButton}
        aria-label="Increase value"
      >
        <IonIcon icon={addOutline} slot="icon-only" aria-hidden="true"/>
      </IonButton>
    </div>
  );
};

export default QuantitySelector;
