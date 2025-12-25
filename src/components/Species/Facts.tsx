import styles from "./styles/SpeciesTabs.module.css";
import { SpecieWithMedia } from "../../types/species";
import Image from "../Image";
import imageStyles from "../styles/Image.module.css";
import { findImageByRole } from "../../utils/getMediaTypes";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

interface Props {
  specie: SpecieWithMedia;
}

const Facts = ({ specie }: Props) => {
  const factsList = specie?.facts?.description;
  const factsImage = findImageByRole(specie?.SpeciesMedia, "facts");

  const image = findImageByRole(specie?.SpeciesMedia ?? null, "facts");
  const imageUrl = image?.media_url ? resolveImageUrl(image.media_url) : "";

  return (
    <ul className={styles.list}>
      {factsList?.map((value, key) => (
        <li key={key} className={styles.listItem}>
          {value}
        </li>
      ))}
      {specie && factsImage && (
        <div className={imageStyles.factsImageContainer}>
          <Image image={factsImage} imageUrl={imageUrl} />
          <p>
            <i>Figure: {factsImage?.attribute}</i>
          </p>
        </div>
      )}
    </ul>
  );
};

export default Facts;
