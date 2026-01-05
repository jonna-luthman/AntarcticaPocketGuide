import "i18next";
import { useTranslation } from "react-i18next";
/**
 * Custom hook for retrieving localized values from database objects.
 * It dynamically selects the object property based on the current active language
 * Default language set to English ('en')
 * @param object The data object containing localized keys (e.g., from Supabase).
 * @param key The base name of the key (e.g., 'description').
 *
 * @returns A function that takes an object and a base key string to find the translated value.
 *
 * @example const { getLang } = useGetLang();
 *    <p>getLang(specie, 'name_common'}</p>
 *     Returns - 'specie.name_common_es' if chosen language is Spanish ('es')
 */

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
