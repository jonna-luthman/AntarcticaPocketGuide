import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { homeOutline, personOutline, add } from "ionicons/icons";

const Navbar = () => {
  return (
    <>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/">
          <IonIcon icon={homeOutline} color="dark" />
        </IonTabButton>
        <IonTabButton tab="profile" href="/field-journal">
          <IonIcon icon={personOutline} color="dark" />
        </IonTabButton>
      </IonTabBar>

      <IonFab vertical="bottom" horizontal="center" edge={true}>
        <IonFabButton>
          <IonIcon icon={add} color="dark" />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default Navbar;
