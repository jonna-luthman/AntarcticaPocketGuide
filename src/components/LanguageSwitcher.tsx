import { useTranslation } from 'react-i18next';
import { IonSelect, IonSelectOption } from '@ionic/react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: CustomEvent) => {
    const lang = event.detail.value;
    i18n.changeLanguage(lang);
  };

  return (
    <IonSelect 
      value={i18n.language} 
      placeholder="Language" 
      onIonChange={changeLanguage}
      interface="popover"
    >
      <IonSelectOption value="en">English</IonSelectOption>
      <IonSelectOption value="es">Español</IonSelectOption>
    </IonSelect>
  );
};