import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

const Header = ({ showMenu = false, showBackButton = false }) => {
  return (
    <IonHeader translucent={true} className="ion-padding">
      <IonToolbar>
        {showBackButton && (
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" color="dark" />
          </IonButtons>
        )}

        {showMenu && (
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} color="dark" />
          </IonButtons>
        )}

        <div slot="end">
          <img src="Logo.svg" alt="App Logo" />
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
