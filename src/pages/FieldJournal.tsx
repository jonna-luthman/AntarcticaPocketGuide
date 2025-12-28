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
} from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";

import { UserAuth } from "../context/AuthContext";
import styles from "./styles/FieldJournal.module.css";

import useSpecies from "../hooks/useSpecies";

import Header from "../components/Header";
import AccordionGroupItem from "../components/AccordionGroupItem";
import NotAuthorized from "../components/NotAuthorized";
import { filterSpeciesByClass } from "../utils/filterSpeciesByClass";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { useTranslation } from "react-i18next";

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
      <IonContent fullscreen>
        {!session ? (
          <NotAuthorized onAction={onShowLoginModal} />
        ) : (
          <div>
            <h1 className="ion-padding-horizontal"></h1>

            <div className={styles.header}>
              <IonGrid className={styles.summaryContainer}>
                <IonRow>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{totalSightings}</strong>
                      <small>{t('pages.fieldJournal.sigthingsLogged')}</small>
                    </IonLabel>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{birds?.length}</strong>
                      <small>{t('pages.fieldJournal.birdsSeen')}</small>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{seals?.length}</strong>
                      <small>{t('pages.fieldJournal.sealsSeen')}</small>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className={styles.statCard}>
                      <strong>{whales?.length}</strong>
                      <small>{t('pages.fieldJournal.whalesSeen')}</small>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <div className="ion-padding">
              <IonSegment
                value={selectedSegment}
                onIonChange={(e) => setSelectedSegment(e.detail.value as any)}
              >
                <IonSegmentButton value="seen">
                  <IonLabel>{t('pages.fieldJournal.seen')}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="not-seen">
                  <IonLabel>{t('pages.fieldJournal.notSeen')}</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              <IonAccordionGroup expand="inset">
                <AccordionGroupItem
                  title={t('animalClasses.birds')}
                  items={birds ?? []}
                  isSeenMode={selectedSegment === "seen"}
                />

                <AccordionGroupItem
                  title={t('animalClasses.seals')}
                  items={seals ?? []}
                  isSeenMode={selectedSegment === "seen"}
                />

                <AccordionGroupItem
                  title={t('animalClasses.whalesAndDolphins')}
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
