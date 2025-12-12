import { Specie } from "../../types/species";
import styles from "./styles/DistinguishableFeaturesCard.module.css";

export interface Props {
  specie: Specie;
}

export const DistinguishableFeaturesCard = ({ specie }: Props) => {
  const featureList = specie?.distinguishable_features?.features;

  // if (!featureList || featureList.length === 0) {
  //   return <p>No features available.</p>;
  // }

  return (
    <div>
      <h3>Distinguishable features</h3>
      {featureList?.map((f, index) => (
        <div className={styles.card} key={index}>
          <p className={styles.text}>
            {f}
          </p>
        </div>
      ))}
    </div>
  );
};
