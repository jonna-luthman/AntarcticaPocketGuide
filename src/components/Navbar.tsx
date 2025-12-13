import { IonTabBar, IonTabButton, IonIcon, IonTabs } from "@ionic/react";
import { addCircleOutline, homeOutline, personOutline } from "ionicons/icons";

const Navbar = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="Home" href="/">
        <IonIcon icon={homeOutline} color="dark" />
      </IonTabButton>
      {/* TODO: Add drawer to add to list */}
      <IonTabButton tab="Add" href="/">
        <IonIcon icon={addCircleOutline}></IonIcon>
      </IonTabButton>
      <IonTabButton tab="Profile" href="/field-journal">
        <IonIcon icon={personOutline} color="dark" />
      </IonTabButton>
    </IonTabBar>
  );
};

export default Navbar;
