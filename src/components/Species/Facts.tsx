import styles from "./styles/SpeciesTabs.module.css";
import { SpecieDetail, SpecieWithMedia } from "../../types/species";
import Image from "../Image";
import imageStyles from "../styles/Image.module.css";
import { findImageByRole } from "../../utils/getMediaTypes";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useTranslation } from "react-i18next";
import useGetLang from "../../hooks/useGetlang";

interface FactsProps {
  specie: SpecieDetail;
}

interface FactsObject {
  description: string[];
}

const Facts = ({ specie }: FactsProps) => {
  const getLang = useGetLang();
  const { t } = useTranslation();

  const facts: FactsObject = getLang(specie, "facts");

  const factsList = facts.description;
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
            <i>
              {t("pages.animalsSpeciesPage.figure")} {getLang(factsImage, "attribute")}
            </i>
          </p>
        </div>
      )}
    </ul>
  );
};

export default Facts;
