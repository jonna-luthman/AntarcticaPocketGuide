import {
  IonContent,
  IonPage,
  IonText,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";

import { UserAuth } from "../context/AuthContext";
import styles from "./styles/FieldJournal.module.css";

import useSpecies from "../hooks/useSpecies";

import Header from "../components/Header";
import AccordionGroupItem from "../components/AccordionGroupItem";
import { filterSpeciesByClass } from "../utils/filterSpeciesByClass";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { waterOutline, boatOutline } from "ionicons/icons";
import { Bird } from "lucide-react";
import { count } from "console";

interface FieldJournalProps {
  onShowLoginModal: () => void;
}

const FieldJournal: React.FC<FieldJournalProps> = ({ onShowLoginModal }) => {
  const { session } = UserAuth();
  const { getUserSpeciesList, speciesWithSightings: species } = useSpecies();
  const [selectedSegment, setSelectedSegment] = useState<string>("seen");

  const userId = session?.user.id;

  useEffect(() => {
    if (!session) {
      onShowLoginModal();
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getUserSpeciesList(userId);
    }
  }, [userId]);

  const speciesWithUrls = useMemo(() => {
    if (!species) return [];

    return species.map((s) => {
      const headerMedia = s.SpeciesMedia?.[0];

      return {
        ...s,
        resolvedImageUrl: headerMedia
          ? resolveImageUrl(headerMedia.media_url, "species")
          : null,
      };
    });
  }, [species]);

  const seenSpecies = speciesWithUrls?.filter(
    (s) => s.UserSpeciesList?.length > 0
  );
  const notSeenSpecies = speciesWithUrls?.filter(
    (s) => s.UserSpeciesList?.length === 0
  );

  const totalSightings = useMemo(() => {
  return speciesWithUrls?.reduce((count, species) => {
    return count + (species.UserSpeciesList?.length || 0);
  }, 0);
}, [speciesWithUrls]);

  const currentDisplayList =
    selectedSegment === "seen" ? seenSpecies : notSeenSpecies;

  const birds = filterSpeciesByClass({
    items: currentDisplayList,
    classSlug: "birds",
  });
  const seals = filterSpeciesByClass({
    items: currentDisplayList,
    classSlug: "seals",
  });
  const whales = filterSpeciesByClass({
    items: currentDisplayList,
    classSlug: "whales-and-dolphins",
  });

  return (
    <IonPage>
      <Header showMenu={true} />
      <IonContent fullscreen className="ion-padding" >
        {!session ? (
          <div>
            <IonText>You need to log in to see your saved animals.</IonText>
            <IonButton>Log in</IonButton>
          </div>
        ) : (
          <div>
            <h1 className="ion-padding-horizontal">Field notes</h1>

            <div className={styles.header}>
              <IonGrid className={styles.summaryContainer}>
                <IonRow>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{totalSightings}</strong>
                      <small>Sightings logged</small>
                    </IonLabel>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{birds?.length}</strong>
                      <small>Birds seen</small>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{seals?.length}</strong>
                      <small>Seals seen</small>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{whales?.length}</strong>
                      <small>Whales seen</small>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <IonSegment
              value={selectedSegment}
              onIonChange={(e) => setSelectedSegment(e.detail.value as any)}
              className={styles.segment}
            >
              <IonSegmentButton value="seen">
                <IonLabel>Seen</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="not-seen">
                <IonLabel>Not seen</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <IonAccordionGroup expand="inset">
              <AccordionGroupItem
                title="Birds"
                items={birds ?? []}
                isSeenMode={selectedSegment === "seen"}
              />

              <AccordionGroupItem
                title="Seals"
                items={seals ?? []}
                isSeenMode={selectedSegment === "seen"}
              />

              <AccordionGroupItem
                title="Whales & Dolphins"
                items={whales ?? []}
                isSeenMode={selectedSegment === "seen"}
              />
            </IonAccordionGroup>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FieldJournal;
