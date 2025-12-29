import {
  IonLabel,
  IonItem,
  IonThumbnail,
  IonAccordion,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import { useState } from "react";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import {
  SpecieSummaryWithMediaAndUrl,
} from "../types/species";
import { useTranslation } from "react-i18next";
import useGetLang from "../hooks/useGetlang";

interface AccordionGroupProps {
  title: string;
  items: SpecieSummaryWithMediaAndUrl[];
  isSeenMode: boolean;
}

const AccordionGroupItem = ({
  title,
  items,
  isSeenMode,
}: AccordionGroupProps) => {
  const getLang = useGetLang();
  const { t } = useTranslation();
  const router = useIonRouter();
  const [expandedId, setExpandedId] = useState<string>("");

  const navigateToSpecies = (id: string, classSlug: string) => {
    router.push(`/animals/${classSlug}/${id}`);
  };

  return (
    <IonAccordion value={title}>
      <IonItem slot="header" color="inherit" className="ion-margin-vertical">
        <IonLabel>
          <h1>
            {title} ({items?.length})
          </h1>
        </IonLabel>
      </IonItem>
      <div slot="content">
        {items?.map((item) => (
          <div key={item.id}>
            <IonItem
              button
              detail={isSeenMode ? false : true}
              onClick={() =>
                isSeenMode
                  ? setExpandedId(expandedId === item.id ? "" : item.id)
                  : navigateToSpecies(item.id, item.class_slug ?? "undefined")
              }
            >
              {item.resolvedImageUrl && (
                <IonThumbnail slot="start">
                  <img
                    alt={getLang(item, 'name_common')}
                    src={item.resolvedImageUrl}
                  />
                </IonThumbnail>
              )}
              <IonLabel>
                <h2 className="font-average">{getLang(item, 'name_common')}</h2>
                {isSeenMode && (
                  <p>{item.UserSpeciesList.length} {t('components.accordionGroupItem.observations')}</p>
                )}
              </IonLabel>
              {isSeenMode && (
                <IonIcon
                  icon={
                    expandedId === item.id
                      ? chevronUpOutline
                      : chevronDownOutline
                  }
                  slot="end"
                />
              )}
            </IonItem>

            {isSeenMode && expandedId === item.id && (
              <div className="ion-margin-start ion-margin-bottom">
                {item.UserSpeciesList.map((o: any) => (
                  <IonItem key={o.id} lines="none">
                    <IonLabel>
                      <p>
                        {t('components.accordionGroupItem.date')}
                        {new Date(o.observation_date).toLocaleDateString()} -{" "}
                      </p>
                      <p>{t('components.accordionGroupItem.location')} {getLang(o, 'location')}</p>
                      {o.note_text && <p>{t('components.accordionGroupItem.notes')} {o.note_text} </p>}
                    </IonLabel>
                  </IonItem>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </IonAccordion>
  );
};

export default AccordionGroupItem;
