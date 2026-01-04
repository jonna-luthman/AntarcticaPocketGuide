import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";

import { UserAuth } from "../context/AuthContext";
import styles from "./styles/FieldJournal.module.css";

import useSpecies from "../hooks/useSpecies";

import Header from "../components/Header";
import AccordionGroupItem from "../components/AccordionGroupItem";
import NotAuthorized from "../components/auth/NotAuthorized"
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
      <IonContent fullscreen>
      <Header showMenu={true}/>
        {!session ? (
          <NotAuthorized
            title={t("notAuthorized.fieldNotes.title")}
            description={t("notAuthorized.fieldNotes.description")}
            buttonText={t("notAuthorized.buttonText")}
            onAction={onShowLoginModal}
          />
        ) : (
          <div>
  
              <div className={styles.header}>
                <IonGrid className={styles.summaryContainer}>
                  <IonRow>
                    <IonCol>
                      <IonText className={styles.statCard}>
                        <strong>{totalSightings}</strong>
                        <small>{t("pages.fieldJournal.sigthingsLogged")}</small>
                      </IonText>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonText className={styles.statCard}>
                        <strong>{birds?.length}</strong>
                        <small>{t("pages.fieldJournal.birdsSeen")}</small>
                      </IonText>
                    </IonCol>
                    <IonCol>
                      <IonText className={styles.statCard}>
                        <strong>{seals?.length}</strong>
                        <small>{t("pages.fieldJournal.sealsSeen")}</small>
                      </IonText>
                    </IonCol>
                    <IonCol>
                      <IonText className={styles.statCard}>
                        <strong>{whales?.length}</strong>
                        <small>{t("pages.fieldJournal.whalesSeen")}</small>
                      </IonText>
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

              <IonAccordionGroup>
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
