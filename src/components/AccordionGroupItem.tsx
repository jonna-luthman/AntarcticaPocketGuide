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
import { SpecieSummaryWithMedia } from "../types/species";

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
  const router = useIonRouter();
  const [expandedId, setExpandedId] = useState<string>("");

  const navigateToSpecies = (id: string, classSlug: string) => {
    router.push(`/animals/${classSlug}/${id}`);
  };

  return (
    <IonAccordion value={title}>
      <IonItem slot="header" color="inherit" className="ion-margin-vertical">
        <IonLabel>
          <h1>{title} ({items?.length})</h1>
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
                    alt={item.name_common ?? ""}
                    src={item.resolvedImageUrl}
                  />
                </IonThumbnail>
              )}
              <IonLabel>
                <h2 className="font-average">{item.name_common}</h2>
                {isSeenMode && (
                  <p>{item.UserSpeciesList.length} observations</p>
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
                        Date:{" "}
                        {new Date(o.observation_date).toLocaleDateString()} -{" "}
                      </p>
                      <p>Location: {o.location}</p>
                      {o.note_text && <p>Notes: {o.note_text} </p>}
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
