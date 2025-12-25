import {
  IonPage,
  IonButton,
  IonContent,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonIcon,
  IonInput,
  IonDatetime,
  IonModal,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import useSpecies from "../hooks/useSpecies";
import useUser from "../hooks/useUser";

import { useLoading } from "../context/LoadingContext";
import { UserAuth } from "../context/AuthContext";

import Header from "../components/Header";
import Image from "../components/Image";
import QuantitySelector from "../components/QuantitySelector";

import styles from "./styles/ConfirmSighting.module.css";

import { formatDate } from "../utils/formatDate";
import { CreateUserSpeciesList } from "../types/userSpeciesList";

import {
  calendarNumberOutline,
  eyeOutline,
  locationOutline,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import { resolveImageUrl } from "../utils/resolveImageUrl";

const ConfirmSighting: React.FC = () => {
  const { getSpeciesById, singleSpecies: species } = useSpecies();
  const { speciesId } = useParams<{ speciesId: string }>();
  const { session } = UserAuth();
  const { createUserSpeciesList } = useUser();
  const { showLoading, hideLoading } = useLoading();

  const router = useIonRouter();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [notes, setNotes] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    getSpeciesById(speciesId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user.id) {
      console.error("No user session found");
      return;
    }

    const sightingData: CreateUserSpeciesList = {
      species_id: speciesId,
      user_id: session?.user.id,
      note_text: notes,
      location: location,
      observation_date: selectedDate,
      observations: count,
    };

    showLoading();
    try {
      const result = await createUserSpeciesList(sightingData);

      if (!result.success) {
        setErrorMessage(result.error.message);
        return;
      }

      router.push("/field-journal", "root");
    } catch (error) {
      console.error("Error saving sighting:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header
          showBackButton={true}
          showLogo={false}
          showTitle={true}
          title="Confirm Sighting"
        />
        <div>
          <Image
            image={species?.SpeciesMedia}
            className="sightingHeaderImage"
            imageUrl={resolveImageUrl(species?.SpeciesMedia[0].media_url)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <IonItemGroup>
            <IonItem
              button
              lines="full"
              className="ion-margin-vertical ion-padding-bottom"
              routerLink="/add-sighting"
            >
              <h3 className="ion-margin">{species?.name_common}</h3>
            </IonItem>

            <IonItem
              button
              lines="full"
              className="ion-margin ion-padding-bottom"
              id="open-date-modal"
            >
              <IonIcon
                aria-hidden="true"
                icon={calendarNumberOutline}
                slot="start"
              />

              <p>{formatDate(selectedDate)}</p>
            </IonItem>

            <IonItem lines="full" className="ion-margin ion-padding-bottom">
              <IonIcon aria-hidden="true" icon={eyeOutline} slot="start" />
              <p>How many did you see?</p>
              <QuantitySelector count={count} setCount={setCount} />
            </IonItem>

            <IonItem
              lines="full"
              className="ion-margin ion-padding-bottom"
              id="open-date-modal"
            >
              <IonIcon
                aria-hidden="true"
                icon={locationOutline}
                slot="start"
              ></IonIcon>
              <IonLabel position="stacked">Location</IonLabel>
              <IonInput
                type="text"
                value={location}
                placeholder="Where did you see it?"
                onIonInput={(e) => setLocation(e.detail.value!)}
              />
            </IonItem>

            <IonItem lines="full" className="ion-margin ion-padding-bottom">
              <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
              <IonLabel position="stacked">Notes</IonLabel>
              <IonTextarea
                value={notes}
                placeholder="Add a note..."
                autoGrow={true}
                rows={3}
                onIonInput={(e) => setNotes(e.detail.value!)}
              />
            </IonItem>
          </IonItemGroup>

          <IonModal
            trigger="open-date-modal"
            keepContentsMounted={true}
            className={styles.DateTimeModal}
            showBackdrop={true}
            backdropDismiss={true}
          >
            <div className={styles.DatePicker}>
              <IonDatetime
                value={selectedDate}
                onIonChange={(e) => setSelectedDate(e.detail.value as string)}
                showDefaultButtons={true}
                doneText="Done"
                presentation="date"
                cancelText="Cancel"
                color="dark"
                hourCycle="h12"
              />
            </div>
          </IonModal>
          <div className="ion-padding">
            <IonButton expand="block" color="tertiary" type="submit">
              Save
            </IonButton>

            <IonButton
              expand="block"
              fill="clear"
              color="dark"
              onClick={() => router.back()}
            >
              Cancel
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmSighting;
