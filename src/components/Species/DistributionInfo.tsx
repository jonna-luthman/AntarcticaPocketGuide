import { Specie } from "../../types/species";
import { MapPinned } from "lucide-react";
import styles from "./styles/SpeciesTabs.module.css";
import imageStyles from "../styles/Image.module.css";
import { findImageByRole } from "../../utils/getMediaTypes.ts"
import Image from "../Image"

interface Props {
  specie: Specie;
}

const DistributionInfo = ({ specie }: Props) => {
  const distribution = specie?.distribution;

  const distributionImage = findImageByRole(specie?.SpeciesMedia, "distribution");
  if (!distribution) return null;

  return (
    <div>
      <h3><MapPinned className={styles.icon}/>Where to look for them:</h3>
      {Object.entries(distribution).map(([region, description]) => (
        <div key={region} >
          {specie && distributionImage &&
          <div className={imageStyles.distributionImageContainer}>
           <Image image={distributionImage} class="distribution"/>
           </div>
          }
          <p className={styles.distributionText}>
            <span className={styles.fontBold}>{region}:</span> {description}
          </p>

        </div>
      ))}
    </div>
  );
};

export default DistributionInfo;
