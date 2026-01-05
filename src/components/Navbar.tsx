import { IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { search, homeOutline, bookOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <IonTabBar slot="bottom" color="primary">
        <IonTabButton tab="Home" href="/">
          <IonIcon icon={homeOutline} color="dark" />{t('menu.page.home')}
        </IonTabButton>
        <IonTabButton tab="Add" href="/search">
          <IonIcon icon={search}></IonIcon>{t('menu.page.search')}
        </IonTabButton>
        <IonTabButton
          tab="Profile"
          href="/field-journal"
        >{t('menu.page.fieldJournal')}
          <IonIcon icon={bookOutline} color="dark" />
        </IonTabButton>
      </IonTabBar>
    </>
  );
};

export default Navbar;
