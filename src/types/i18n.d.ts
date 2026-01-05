import 'i18next'
import en from '../utils/i18n/locales/en/translation.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}