import { Circle, Clock, Ruler, Utensils, Weight } from "lucide-react";
import { Specie } from "../../types/species";
import styles from "./styles/SpeciesFeatures.module.css";

interface SpeciesInfoProps {
  specie: Specie | null;
}

const SpeciesFeatures = ({ specie }: SpeciesInfoProps) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={`${styles.contentBox} ${styles.boxSmall}`}>
        <Ruler className={styles.icon} />
        <div className={styles.textBlock}>
          <p>{specie?.size} mts</p>
          <p>15 kg</p>
        </div>
      </div>

      <div className={styles.contentBox}>
        <Circle className={styles.icon} />
        <div className={styles.textBlock}>
          <p>{specie?.conservation_status}</p>
          <p>{specie?.population} indiv.</p>
        </div>
      </div>

      <div className={styles.contentBox}>
        <Utensils className={styles.icon} />
        <p>{specie?.diet}</p>
      </div>

      <div className={`${styles.contentBox} ${styles.boxSmall}`}>
        <Clock className={styles.icon} />
        <p>Up to {specie?.lifespan} years</p>
      </div>
    </div>
  );
};

export default SpeciesFeatures;