import { Specie } from "../../types/species";
import { MapPinned } from "lucide-react";
import styles from "./styles/SpeciesTabs.module.css";

interface Props {
  specie: Specie;
}

const DistributionInfo = ({ specie }: Props) => {
  const distribution = specie?.distribution;

  if (!distribution) return null;

  return (
    <div>
      <h3><MapPinned className={styles.icon}/>Where to look for them:</h3>
      {Object.entries(distribution).map(([region, description]) => (
        <div key={region} >
          <p className={styles.distributionText}>
            <span className={styles.fontBold}>{region}:</span> {description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DistributionInfo;
