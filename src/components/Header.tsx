import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonMenuButton,
  IonTitle
} from "@ionic/react";

interface HeaderProps {
  showmMenu?: booelan;
  showBackButton?: booelan;
  showLogo?: booelean;
  showTitle?: booelan;
  title?: string;
}

const Header = ({
  showMenu = false,
  showBackButton = false,
  showLogo = true,
  showTitle = false,
  title,
}) : HeaderProps => {
  return (
    <IonHeader className="ion-padding ion-no-border">
      <IonToolbar color="inherit">
        <IonButtons slot="start">
          {showBackButton && <IonBackButton text={undefined} defaultHref="/" />}
          {showMenu && <IonMenuButton autoHide={false} />}
        </IonButtons>

        {showTitle && (
          <IonTitle color="dark" slot="end" className="ion-text-center">
            <h4>{title}</h4>
          </IonTitle>
        )}

        {showLogo && (
          <IonButtons slot="end">
            <img src="Logo.svg" alt="App Logo" defaultHref="/"/>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
