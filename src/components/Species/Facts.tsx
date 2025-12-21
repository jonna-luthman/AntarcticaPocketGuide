import styles from "./styles/SpeciesTabs.module.css";
import { Specie } from "../../types/species";
import Image from "../Image";
import imageStyles from "../styles/Image.module.css";
import { findImageByRole } from "../../utils/getMediaTypes.ts";

interface Props {
  specie: Specie;
}

const Facts = ({ specie }: Props) => {
  const factsList = specie?.facts?.description;
  const factsImage = findImageByRole(specie?.SpeciesMedia, "facts");

  return (
    <ul className={styles.list}>
      {factsList?.map((value, key) => (
        <li key={key} className={styles.listItem}>
          {value}
        </li>
      ))}
        {specie && factsImage && 
        <div className={imageStyles.factsImageContainer}>
           <Image image={factsImage} class="facts"/>
           <p><i>Figure: {factsImage?.attribute}</i></p>
        </div>}
    </ul>
  );
};

export default Facts;
