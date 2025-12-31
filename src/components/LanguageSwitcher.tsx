import { useTranslation } from 'react-i18next';
import { IonSelect, IonSelectOption } from '@ionic/react';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  /**
   * Updates the UI and automatically saves the choice to Local Storage
   * */
  const changeLanguage = (event: CustomEvent) => {
    const lang = event.detail.value;
    i18n.changeLanguage(lang);
  };

  const selectOptions = {
    header: t('buttons.selectLanguage'),
    cssClass: 'language-action-sheet'
  };

  return (
    <IonSelect 
      value={i18n.language} 
      placeholder="Language" 
      onIonChange={changeLanguage}
      interface="action-sheet"
      interfaceOptions={selectOptions}
    >
      <IonSelectOption value="en">English</IonSelectOption>
      <IonSelectOption value="es">Español</IonSelectOption>
    </IonSelect>
  );
};