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
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { UserAuth } from "../context/AuthContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Menu = () => {
  const { signOutUser, session } = UserAuth();
  const router = useIonRouter();
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();

  const handleClick = () => {
    showAlert({
      header: "Sign out",
      message: "Are you sure you want to sign out?",
      cssClass: "custom-alert",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Sign out",
          role: "confirm",
          handler: async () => {
            await handleSignOut();
          },
        },
      ],
    });
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();

      showToast({
        message: "You have been logged out.",
        duration: 2000,
        color: "dark",
        position: "bottom",
      });

      router.push("/", "none");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IonMenu contentId="main-content" side="start">
      <IonHeader className="ion-padding">
        <IonToolbar color="primary">
          <IonMenuToggle slot="start">
            <IonIcon icon={close} color="dark" size="large" />
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

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/field-journal" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase tex">Field Journal</h2>
                <p className="font-display">All my logs</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/about-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">About us</h2>
                <p className="font-display">Who are we</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/contact-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">Contact us</h2>
                <p className="font-display">Any questions</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <LanguageSwitcher />

          {session && (
            <IonMenuToggle>
              <IonButton
                color="tertiary"
                className="ion-margin-top"
                expand="block"
                onClick={handleClick}
              >
                Sign out
              </IonButton>
            </IonMenuToggle>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
