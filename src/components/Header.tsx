import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";

interface HeaderProps {
  showMenu?: boolean;
  showBackButton?: boolean;
  showLogo?: boolean;
  showTitle?: boolean;
  title?: string;
}

const Header = ({
  showMenu = false,
  showBackButton = false,
  showLogo = true,
  showTitle = false,
  title = "",
}: HeaderProps) => {
  return (
    <IonHeader className="ion-padding-horizontal ion-no-border">
      <IonToolbar color="inherit">
        <IonButtons slot="start">
          {showBackButton && <IonBackButton text="" defaultHref="/" />}
          {showMenu && <IonMenuButton  autoHide={false} />}
        </IonButtons>

        {showTitle && (
          <IonTitle color="dark" slot="end" className="ion-text-center">
            <h4>{title}</h4>
          </IonTitle>
        )}

        {showLogo && (
          <IonButton
            slot="end"
            fill="clear"
            routerLink="/"
            routerDirection="root"
          >
            <img
              src="Logo.svg"
              alt="App Logo"
              style={{ height: "45px", width: "auto" }}
            />
          </IonButton>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
