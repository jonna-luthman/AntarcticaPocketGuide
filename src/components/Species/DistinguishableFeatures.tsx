import { FingerprintPattern } from "lucide-react";
import { Specie } from "../../types/species";
import styles from "./styles/SpeciesTabs.module.css";
import useGetLang from "../../hooks/useGetLang";
import { useTranslation } from "react-i18next";

interface DistinguishableFeaturesCardProps {
  specie: Specie | null;
}

interface FeaturesObject {
  features: string[];
}

const DistinguishableFeaturesCard = ({
  specie,
}: DistinguishableFeaturesCardProps) => {
  const getLang = useGetLang();
  const { t } = useTranslation();

  const distinguishableFeatures: FeaturesObject = getLang(
    specie,
    "distinguishable_features"
  );
  const featureList = distinguishableFeatures?.features;

  if (!featureList || featureList.length === 0) {
    return <p>{t("components.distinguishableFeatures.nonAvailable")}</p>;
  }

  return (
    <div className="ion-padding-top">
      <h3>
        <FingerprintPattern size={20} />{" "}
        {t("components.distinguishableFeatures.title")}
      </h3>
      {featureList?.map((f, index) => (
        <div className={styles.card} key={index}>
          <p className={`${styles.text} ${styles.fontBold}`}>{f}</p>
        </div>
      ))}
    </div>
  );
};

export default DistinguishableFeaturesCard;
