import "i18next";
import { useTranslation } from "react-i18next";
// Function that gets the object, the key and and the chosen language.
// Deafault language set to en,
// How to use: getLang(specie, 'name_common'}

function useGetLang() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (object: any, key: string) => {
    if (!object) return "";
    const localizedKey = `${key}_${lang}`;
    return object[localizedKey] || object[`${key}_en`] || "";
  };
}

export default useGetLang;
