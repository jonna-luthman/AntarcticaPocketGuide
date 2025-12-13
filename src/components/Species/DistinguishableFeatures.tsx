import { FingerprintPattern } from "lucide-react";
import { Specie } from "../../types/species";
import styles from "./styles/SpeciesTabs.module.css";

export interface Props {
  specie: Specie | null;
}

export const DistinguishableFeaturesCard = ({ specie }: Props) => {
  const featureList = specie?.distinguishable_features?.features;

  if (!featureList || featureList.length === 0) {
    return <p>No features available.</p>;
  }

  return (
    <div className="ion-padding-top">
      <h3><FingerprintPattern size={20}/> Distinguishable features</h3>
      {featureList?.map((f, index) => (
        <div className={styles.card} key={index}>
          <p className={`${styles.text} ${styles.fontBold}`}>
            {f}
          </p>
        </div>
      ))}
    </div>
  );
};
