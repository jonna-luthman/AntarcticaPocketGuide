import { SpecieDetail, SpecieWithMedia } from "../../types/species";
import { MapPinned } from "lucide-react";
import styles from "./styles/SpeciesTabs.module.css";
import imageStyles from "../styles/Image.module.css";
import { findImageByRole } from "../../utils/getMediaTypes";
import Image from "../Image";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const DistributionInfo = (specie: SpecieDetail) => {
  const distribution = specie?.distribution;

  const image = findImageByRole(specie?.SpeciesMedia, "distribution");
  const imageUrl = image?.media_url ? resolveImageUrl(image.media_url) : "";

  if (!distribution) return null;

  return (
    <div>
      <h3>
        <MapPinned className={styles.icon} />
        Where to look for them:
      </h3>
      {Object.entries(distribution).map(([region, description]) => (
        <div key={region}>
          {specie && image && (
            <div className={imageStyles.distributionImageContainer}>
              <Image image={image} imageUrl={imageUrl} />
            </div>
          )}
          <p className={styles.distributionText}>
            <span className={styles.fontBold}>{region}:</span> {description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DistributionInfo;
