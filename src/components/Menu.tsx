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
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { signOutUser, session } = UserAuth();
  const router = useIonRouter();
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const { t } = useTranslation();

  const handleClick = () => {
    showAlert({
      header: t('alerts.signOut.header'),
      message: t('alerts.signOut.message'),
      cssClass: "custom-alert",
      buttons: [
        { text: t('buttons.cancel'), role: "cancel" },
        {
          text: t('buttons.signOut'),
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
        message: t('toasts.signOut.message'),
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
                <h2 className="ion-text-uppercase tex">{t('menu.page.fieldJournal')}</h2>
                <p className="font-display">{t('menu.description.fieldJournal')}</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/about-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">{t('menu.page.aboutUs')}</h2>
                <p className="font-display">{t('menu.description.aboutUs')}</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/contact-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">{t('menu.page.contactUs')}</h2>
                <p className="font-display">{t('menu.description.contactUs')}</p>
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
               {t('auth.buttons.logout')}
              </IonButton>
            </IonMenuToggle>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
