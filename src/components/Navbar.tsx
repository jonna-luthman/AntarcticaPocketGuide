import { IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { search, homeOutline, personOutline } from "ionicons/icons";

const Navbar: React.FC = () => {
  return (
    <>
      <IonTabBar slot="bottom" color="primary">
        <IonTabButton tab="Home" href="/">
          <IonIcon icon={homeOutline} color="dark" />
        </IonTabButton>
        <IonTabButton tab="Add" href="/search">
          <IonIcon icon={search}></IonIcon>
        </IonTabButton>
        <IonTabButton
          tab="Profile"
          href="/field-journal"
        >
          <IonIcon icon={personOutline} color="dark" />
        </IonTabButton>
      </IonTabBar>
    </>
  );
};

export default Navbar;
