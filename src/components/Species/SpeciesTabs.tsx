import { useState } from "react";
import { IonSegment, IonSegmentButton, IonLabel, IonContent, SegmentValue } from "@ionic/react";
import BehaviourInfo from "./BehaviourInfo";
import { DidYouKnowInfo } from "./DidYouKnowInfo";
import DistributionInfo from "./DistributionInfo";
import { Specie } from "../../types/species";

export interface Props {
  specie: Specie;
}

export default function SpeciesTabs({specie}: Props) {
  const [selectedTab, setSelectedTab] = useState<SegmentValue>("distribution");

  console.log(specie)

  return (
    <div className="ion-padding">
      <IonSegment
        value={selectedTab}
        onIonChange={(e) => setSelectedTab(e.detail.value!)}
      >
        <IonSegmentButton value="distribution">
          <IonLabel>Distribution</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="behaviour">
          <IonLabel>Behaviour</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="did-you-know">
          <IonLabel>Facts</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {/* Content controlled by state */}
      <div className="ion-padding">
        {selectedTab === "distribution" && <DistributionInfo specie={specie} />}
        {selectedTab === "behaviour" && <BehaviourInfo specie={specie}/>}
        {selectedTab === "did-you-know" && <DidYouKnowInfo specie={specie} />}
      </div>
    </div>
  );
}
