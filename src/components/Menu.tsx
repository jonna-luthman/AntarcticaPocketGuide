import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonMenuToggle,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";

import { closeOutline, homeOutline, settingsOutline } from "ionicons/icons";

const Menu = () => {
  return (
    <IonMenu contentId="main-content" side="start">
      <IonHeader className="ion-padding">
        <IonToolbar>
          <IonMenuToggle>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={closeOutline} color="dark" />
            </IonButton>
          </IonMenuToggle>

          <div className="menu-logo" slot="end">
            <img
              src="Logo.svg"
              alt="App Logo"
              style={{ height: 40, marginLeft: 10 }}
            />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/" lines="none">
              <IonIcon icon={homeOutline} slot="start" />
              <IonLabel>My list</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/settings" lines="none">
              <IonIcon icon={settingsOutline} slot="start" />
              <IonLabel>About us</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/settings" lines="none">
              <IonIcon icon={settingsOutline} slot="start" />
              <IonLabel>Contact us</IonLabel>
            </IonItem>
          </IonMenuToggle>

        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
