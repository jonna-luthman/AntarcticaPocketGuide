import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

const Header = ({ showMenu = false, showBackButton = false }) => {
  return (
    <IonHeader className="ion-padding">
      <IonToolbar color="primary">
        <IonButtons slot="start">
          {showBackButton && <IonBackButton defaultHref="/" />}
          {showMenu && <IonMenuButton autoHide={false} />}
        </IonButtons>

        <IonButtons slot="end">
          <img src="Logo.svg" alt="App Logo" />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
