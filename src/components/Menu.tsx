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
  useIonRouter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { UserAuth } from "../context/AuthContext";

const Menu = () => {
  const { signOutUser } = UserAuth();
  const router = useIonRouter();

  const handleSignOut = async (e: Event) => {
    e.preventDefault();
    try {
      await signOutUser();
      router.push("/login", "none");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IonMenu contentId="main-content" side="start">
      <IonHeader className="ion-padding">
        <IonToolbar>
          <IonMenuToggle slot="start">
            <IonIcon icon={close} color="dark" size="large"/>
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
            <IonItem routerLink="/field-journal" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase tex">Field Journal</h2>
                <p  className="font-display">All my logs</p></IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/about-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">About us</h2>
                <p  className="font-display">Who are we</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/contact-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">Contact us</h2>
                <p  className="font-display">Any questions</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonButton
            color="light"
            className="ion-margin-top"
            expand="block"
            onClick={handleSignOut}
          >
            Sign out
          </IonButton>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
