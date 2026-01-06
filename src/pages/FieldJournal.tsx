import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonRow,
  IonRefresher,
  IonRefresherContent,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import styles from "./styles/FieldJournal.module.css";
import useSpecies from "../hooks/useSpecies";
import Header from "../components/Header";
import AccordionGroupItem from "../components/AccordionGroupItem";
import NotAuthorized from "../components/auth/NotAuthorized";
import { filterSpeciesByClass } from "../utils/filterSpeciesByClass";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { useTranslation } from "react-i18next";
import { findImageByRole } from "../utils/getMediaTypes";

interface FieldJournalProps {
  onShowLoginModal: () => void;
}

const FieldJournal: React.FC<FieldJournalProps> = ({ onShowLoginModal }) => {
  const { session } = UserAuth();
  const { getUserSpeciesList, speciesWithSightings: species } = useSpecies();
  const { t } = useTranslation();

  const [selectedSegment, setSelectedSegment] = useState<string>("seen");

  const userId = session?.user.id;

  useIonViewDidEnter(() => {
    if (!session) {
      onShowLoginModal();
    }
  });

  const fetchSpeciesList = async () => {
    try {
      if (userId) {
        await getUserSpeciesList(userId);
      }
    } catch (error) {
      console.error("Could not fetch data", error);
    }
  };

  useEffect(() => {
    fetchSpeciesList();
  }, [userId]);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchSpeciesList();
    event.detail.complete(); // Stops the loading spinner
  };

  const speciesWithUrls = useMemo(() => {
    if (!species) return [];

    return species.map((s) => {
      const headerMedia = findImageByRole(s.SpeciesMedia, "header");

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

  const birdsSeen = filterSpeciesByClass({
    items: seenSpecies,
    classSlug: "birds",
  });
  const sealsSeen = filterSpeciesByClass({
    items: seenSpecies,
    classSlug: "seals",
  });
  const whalesSeen = filterSpeciesByClass({
    items: seenSpecies,
    classSlug: "whales-and-dolphins",
  });

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
      <IonContent fullscreen>
        {!session ? (
          <NotAuthorized
            title={t("notAuthorized.fieldNotes.title")}
            description={t("notAuthorized.fieldNotes.description")}
            buttonText={t("notAuthorized.buttonText")}
            onAction={onShowLoginModal}
          />
        ) : (
          <div>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
              <IonRefresherContent
                pullingText="Pull to update"
                refreshingSpinner="circles"
                refreshingText="Uppdating Field Journal..."
              />
            </IonRefresher>

            <div className={styles.header}>
              <IonGrid className={styles.summaryContainer}>
                <IonRow>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{totalSightings}</strong>
                      <small>{t("pages.fieldJournal.sigthingsLogged")}</small>
                    </IonLabel>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{birdsSeen?.length}</strong>
                      <small>{t("pages.fieldJournal.birdsSeen")}</small>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{sealsSeen?.length}</strong>
                      <small>{t("pages.fieldJournal.sealsSeen")}</small>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{whalesSeen?.length}</strong>
                      <small>{t("pages.fieldJournal.whalesSeen")}</small>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <div className="ion-padding">
              <IonSegment
                mode="ios"
                value={selectedSegment}
                onIonChange={(e) => setSelectedSegment(e.detail.value as any)}
              >
                <IonSegmentButton value="seen">
                  <IonLabel>{t("pages.fieldJournal.seen")}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="not-seen">
                  <IonLabel>{t("pages.fieldJournal.notSeen")}</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              <IonAccordionGroup expand="inset">
                <AccordionGroupItem
                  title={t("animalClasses.birds")}
                  items={birds ?? []}
                  isSeenMode={selectedSegment === "seen"}
                />

                <AccordionGroupItem
                  title={t("animalClasses.seals")}
                  items={seals ?? []}
                  isSeenMode={selectedSegment === "seen"}
                />

                <AccordionGroupItem
                  title={t("animalClasses.whalesAndDolphins")}
                  items={whales ?? []}
                  isSeenMode={selectedSegment === "seen"}
                />
              </IonAccordionGroup>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FieldJournal;
