import { Circle, Clock, Ruler, Utensils, Weight } from "lucide-react";
import { Specie } from "../../types/species";
import styles from "./styles/SpeciesFeatures.module.css";

interface SpeciesInfoProps {
  specie: Specie | null;
}

export const SpeciesFeatures = ({ specie }: SpeciesInfoProps) => {
  return (
    <div className={`${styles.contentWrapper}`}>

      <div className={`${styles.contentBox} ${styles.box1}`}>
        <div>
          <Ruler className={styles.icon} />
          <Weight className={styles.icon} />
        </div>
        <div>
          <p>{specie?.size} mts</p>
        {/* Needs to be added in the database */}
          <p>15 kg</p>
        </div>
      </div>

      <div className={`${styles.contentBox} ${styles.box2}`}>
        <Clock className={styles.icon} />
        <p>Up to {specie?.lifespan} years</p>
      </div>

      <div className={`${styles.contentBox} ${styles.box3}`}>
        <Utensils className={styles.icon} />
        <div>
          <p className={styles.bold}>Diet</p>
          <p>{specie?.diet}</p>
        </div>
      </div>

      <div className={`${styles.contentBox} ${styles.box4}`}>
        <Circle className={styles.icon}/>
        <div>
          <p className={styles.bold}>{specie?.conservation_status}</p>
          <p className={styles.bold}>{specie?.population}</p>
        </div>
      </div>
    </div>
  );
};
