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
  items: SpecieSummaryWithMedia[]; //TODO
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
      <IonItem slot="header" color="inherit">
        <IonLabel>
          {title} ({items?.length})
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
                  ? setExpandedId(expandedId === item.id ? null : item.id)
                  : navigateToSpecies(item.id, item.class_slug)
              }
            >
              {item.resolvedImageUrl && (
                <IonThumbnail slot="start">
                  <img alt={item.name_common} src={item.resolvedImageUrl} />
                </IonThumbnail>
              )}
              <IonLabel>
                <h4 className="font-average">{item.name_common}</h4>
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
              <div
                className="ion-padding-start ion-padding-bottom"
              >
                {item.UserSpeciesList.map((o: any) => (
                  <IonItem
                    key={o.id}
                    lines="none"
                  >
                    <IonLabel>
                      <p>
                        {new Date(o.observation_date).toLocaleDateString()} -{" "}
                        {o.location}
                      </p>
                      <p>
                        o
                      </p>
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
