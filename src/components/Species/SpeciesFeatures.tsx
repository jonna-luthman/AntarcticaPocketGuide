import { Clock, Ruler, Utensils } from "lucide-react";
import { Specie } from "../../types/species";
import styles from "./styles/SpeciesFeatures.module.css";
import useGetLang from "../../hooks/useGetLang";
import { Trans, useTranslation } from "react-i18next";
import { conservationStatusMap } from "../../constants/ConservationStatus";

interface SpeciesInfoProps {
  specie: Specie | null;
}

const SpeciesFeatures = ({ specie }: SpeciesInfoProps) => {
  const getLang = useGetLang();
  const { t } = useTranslation();
  const status = specie?.conservation_status;

  return (
    <div className={styles.contentWrapper}>
      <div className={`${styles.contentBox} ${styles.boxSmall}`}>
        <Ruler className={styles.icon} />
        <div className={styles.textBlock}>
          <p>{specie?.size} mts</p>
          <p>{specie?.weight}</p>
        </div>
      </div>

      <div className={styles.contentBox}>
        {status && conservationStatusMap[status]}
        <div className={styles.textBlock}>
          {status && <p><i>{t(`conservationStatus.${status}` as any)} </i></p>}
           <p>{specie?.population} indiv.</p>
        </div>
      </div>

      <div className={styles.contentBox}>
        <Utensils className={styles.icon} />
        <p>{getLang(specie, "diet")}</p>
      </div>

      <div className={`${styles.contentBox} ${styles.boxSmall}`}>
        <Clock className={styles.icon} />
        <p>
          <Trans
            i18nKey="components.speciesFeatures.lifespan"
            values={{ lifespan: specie?.lifespan }}
          />
        </p>
      </div>
    </div>
  );
};

export default SpeciesFeatures;
