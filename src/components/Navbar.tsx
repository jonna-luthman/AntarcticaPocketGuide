import { IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import {useState} from "react"
import { addCircleOutline, homeOutline, personOutline } from "ionicons/icons";
import { UserAuth } from "../context/AuthContext";
import LoginModal from "../pages/Authentication/LoginModal"

interface NavbarProps {
  onOpenLogin: () => void;
}

const Navbar: React.FC<NavBarProps> = ({onOpenLogin}) => {
  const { session } = UserAuth();

const handleTabClick = (e: React.MouseEvent, tab: string) => {
    if (!session && tab === "Profile") {
      e.preventDefault(); 
      onOpenLogin();
    }
  };

  return (
    <>
      <IonTabBar slot="bottom">
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
          onClick={(e) => handleTabClick(e, "Profile")}
        >
          <IonIcon icon={personOutline} color="dark" />
        </IonTabButton>
      </IonTabBar>
    </>
  );
};

export default Navbar;
