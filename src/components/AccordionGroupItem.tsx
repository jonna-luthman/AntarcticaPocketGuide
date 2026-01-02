import {
  IonItem,
  IonThumbnail,
  IonAccordion,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import { useState } from "react";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import { SpecieSummaryWithMediaAndUrl } from "../types/species";
import { useTranslation } from "react-i18next";
import useGetLang from "../hooks/useGetLang";

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
      <IonItem
        lines="full"
        slot="header"
        color="inherit"
        className="ion-margin"
      >
        <h3>{title}</h3>
        <h3 slot="start"> ({items?.length})</h3>
      </IonItem>
      <div slot="content">
        {items?.map((item) => (
          <div key={item.id}>
            <IonItem
              slot="header"
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
                    alt={getLang(item, "name_common")}
                    src={item.resolvedImageUrl}
                  />
                </IonThumbnail>
              )}
              <div>
                <p>{getLang(item, "name_common")}</p>
                {isSeenMode && (
                  <p>
                    {item.UserSpeciesList.length}{" "}
                    {t("components.accordionGroupItem.observations")}
                  </p>
                )}
              </div>
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
              <div className="ion-margin-bottom">
                {item.UserSpeciesList.map((o: any) => (
                  <IonItem key={o.id}>
                    <div>
                      <p>
                        <b>{t("components.accordionGroupItem.date")} </b>
                        {new Date(o.observation_date).toLocaleDateString()}
                      </p>
                      <p>
                        <b>{t("components.accordionGroupItem.location")} </b>
                        {getLang(o, "location")}
                      </p>
                      {o.note_text && (
                        <p>
                          <b>{t("components.accordionGroupItem.notes")} </b>
                          {o.note_text}{" "}
                        </p>
                      )}
                    </div>
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
