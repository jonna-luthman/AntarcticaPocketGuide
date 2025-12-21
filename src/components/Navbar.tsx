import { IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import {useState} from "react"
import { addCircleOutline, homeOutline, personOutline } from "ionicons/icons";
import { UserAuth } from "../context/AuthContext";
import LoginModal from "../pages/Authentication/LoginModal"

const Navbar: React.FC<NavBarProps> = () => {
  const { session } = UserAuth();

  return (
    <>
      <IonTabBar slot="bottom" color="primary">
        <IonTabButton tab="Home" href="/">
          <IonIcon icon={homeOutline} color="dark" />
        </IonTabButton>
        {/* TODO: Add drawer to add to list */}
        <IonTabButton tab="Add" href="/">
          <IonIcon icon={addCircleOutline}></IonIcon>
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
