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
import styles from "./styles/Menu.module.css"

const Menu = () => {
  const { signOutUser, session } = UserAuth();
  const router = useIonRouter();
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const { t } = useTranslation();

  const handleClick = () => {
    showAlert({
      header: t("alerts.signOut.header"),
      message: t("alerts.signOut.message"),
      cssClass: "custom-alert",
      buttons: [
        { text: t("buttons.cancel"), role: "cancel", cssClass: 'alert-button-cancel' },
        {
          text: t("buttons.signOut"),
          cssClass: 'alert-button-confirm',
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
        message: t("toasts.signOut.message"),
        duration: 2000,
        color: "secondary",
        position: "top",
      });

      router.push("/", "none");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IonMenu contentId="main-content" side="start">
      <IonHeader className="ion-padding ion-no-border">
        <IonToolbar color="primary">
          <IonMenuToggle slot="start">
            <IonIcon icon={close} color="dark" size="large" aria-hidden="true"/>
          </IonMenuToggle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className={styles.MenuInnerContainer}>

        <IonList>
          <div className="ion-padding-start ion-margin-bottom">
            <LanguageSwitcher />
          </div>
          <IonMenuToggle>
            <IonItem routerLink="/field-journal" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">
                  {t("menu.page.fieldJournal")}
                </h2>
                <p className="font-display">
                  {t("menu.description.fieldJournal")}
                </p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle>
            <IonItem routerLink="/about-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">{t("menu.page.aboutUs")}</h2>
                <p className="font-display">{t("menu.description.aboutUs")}</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle>
            <IonItem routerLink="/contact-us" lines="none">
              <IonLabel>
                <h2 className="ion-text-uppercase">
                  {t("menu.page.contactUs")}
                </h2>
                <p className="font-display">
                  {t("menu.description.contactUs")}
                </p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>

          {session && (
            <div className={styles.logOutSection}>
            <IonMenuToggle className="ion-align-self-end">
              <IonButton
                color="medium"
                className="ion-margin-top"
                expand="block"
                shape="round"
                onClick={handleClick}
              >
                {t("auth.buttons.logout")}
              </IonButton>
            </IonMenuToggle>
            </div>
          )}
        </IonList>
                  
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
