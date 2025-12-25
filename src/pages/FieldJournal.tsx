import {
  IonContent,
  IonPage,
  IonText,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonAccordionGroup,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

import { UserAuth } from "../context/AuthContext";

import useSpecies from "../hooks/useSpecies";
import useMedia from "../hooks/useMedia";

import Header from "../components/Header";
import AccordionGroupItem from "../components/AccordionGroupItem";
import { filterSpeciesByClass } from "../utils/filterSpeciesByClass";

interface FieldJournalProps {
  onShowLoginModal: () => void;
}

const FieldJournal: React.FC<FieldJournalProps> = ({ onShowLoginModal }) => {
  const { session } = UserAuth();
  const { getUserSpeciesList, speciesWithSightings: species } = useSpecies();
  const { getImageUrl } = useMedia();

  const userId = session?.user.id;

  const [selectedSegment, setSelectedSegment] = useState<string>("seen");
  const [listItems, setListItems] = useState(null);

  console.log(session);
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

  useEffect(() => {
    const fetchUrls = async () => {
      if (species && species.length > 0) {
        try {
          const speciesWithUrls = await Promise.all(
            species.map(async (s) => {
              const headerMedia = s.SpeciesMedia[0];

              if (!headerMedia) return { ...s, resolvedImageUrl: null };

              const publicUrl = await getImageUrl({
                path: headerMedia.media_url,
                bucket: "species",
              });

              return { ...s, resolvedImageUrl: publicUrl };
            })
          );
          setListItems(speciesWithUrls);
        } catch (error) {
          console.error("Error fetching image urls: "), error;
        }
      }
    };

    fetchUrls();
  }, [species]);

  console.log(listItems);

  const seenSpecies = listItems?.filter((s) => s.UserSpeciesList?.length > 0);
  const notSeenSpecies = listItems?.filter(
    (s) => s.UserSpeciesList?.length === 0
  );

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
      <IonContent fullscreen className="ion-padding">
        {!session ? (
          <div>
            <IonText>You need to log in to see your saved animals.</IonText>
            <IonButton>Log in</IonButton>
          </div>
        ) : (
          <div>
            <IonSegment
              value={selectedSegment}
              onIonChange={(e) => setSelectedSegment(e.detail.value as any)}
            >
              <IonSegmentButton value="seen">
                <IonLabel>Seen</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="not-seen">
                <IonLabel>Not seen</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <IonAccordionGroup expand="inset">
              {birds && birds.length > 0 && (
                <AccordionGroupItem
                  title="Birds"
                  items={birds}
                  isSeenMode={selectedSegment === "seen"}
                />
              )}
              {seals && seals.length > 0 && (
                <AccordionGroupItem
                  title="Seals"
                  items={seals}
                  isSeenMode={selectedSegment === "seen"}
                />
              )}
              {whales && whales.length > 0 && (
                <AccordionGroupItem
                  title="Whales & Dolphins"
                  items={whales}
                  isSeenMode={selectedSegment === "seen"}
                />
              )}
            </IonAccordionGroup>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FieldJournal;
