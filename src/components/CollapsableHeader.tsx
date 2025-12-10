import {
  IonHeader,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";

const CollapsableHeader = () => {
  return (
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonSearchbar/>
      </IonToolbar>
    </IonHeader>
  );
};

export default CollapsableHeader;
