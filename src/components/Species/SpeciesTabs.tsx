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
import { Specie } from "../../types/species";
import styles from "./styles/SpecieCard.module.css"

export interface Props {
  specie: Specie | null;
}

export default function SpeciesTabs({ specie }: Props) {
  const [selectedTab, setSelectedTab] = useState<SegmentValue>("distribution");

  return (
    <div className="ion-padding-horizontal">
      <IonSegment
      scrollable
        value={selectedTab}
        onIonChange={(e) => setSelectedTab(e.detail.value!)}
      >
        <IonSegmentButton value="distribution">
          <IonLabel>Distribution</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="behaviour">
          <IonLabel className={styles.segmentLabel}>Behaviour</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="facts">
          <IonLabel>Facts</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {/* Content controlled by state */}
      <div className="ion-padding">
        {selectedTab === "distribution" && <DistributionInfo specie={specie} />}
        {selectedTab === "behaviour" && <BehaviourInfo specie={specie} />}
        {selectedTab === "facts" && <Facts specie={specie} />}
      </div>
    </div>
  );
}
