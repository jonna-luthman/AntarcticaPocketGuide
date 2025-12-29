import { useState } from "react";
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  SegmentValue,
} from "@ionic/react";
import BehaviourInfo from "./BehaviourInfo";
import Facts from "./Facts";
import DistributionInfo from "./DistributionInfo";
import styles from "./styles/SpeciesCard.module.css";
import { SpecieDetail } from "../../types/species";
import { useTranslation } from "react-i18next";

interface SpeciesTabsProps {
  specie: SpecieDetail | null;
}

export default function SpeciesTabs({ specie }: SpeciesTabsProps) {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState<SegmentValue>("distribution");

  return (
    <div>
      <IonSegment
        scrollable
        value={selectedTab}
        onIonChange={(e) => setSelectedTab(e.detail.value!)}
      >
        <IonSegmentButton value="distribution">
          <IonLabel>{t('components.speciesTabs.distribution')}</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="behaviour">
          <IonLabel className={styles.segmentLabel}>{t('components.speciesTabs.behaviour')}</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="facts">
          <IonLabel>{t('components.speciesTabs.facts')}</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <div className="ion-padding">
        {selectedTab === "distribution" && specie && (
          <DistributionInfo specie={specie} />
        )}
        {selectedTab === "behaviour" && specie && (
          <BehaviourInfo specie={specie} />
        )}
        {selectedTab === "facts" && specie && <Facts specie={specie} />}
      </div>
    </div>
  );
}
