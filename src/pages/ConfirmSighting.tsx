import {
  IonPage,
  IonButton,
  IonContent,
  IonTitle,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonIcon,
  IonInput,
  IonDatetime,
  IonModal,
  IonBackdrop,
  IonTextarea,
  IonText,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import useSpecies from "../hooks/useSpecies.ts";
import useUser from "../hooks/useUser.ts";

import { useLoading } from "../context/LoadingContext";
import { UserAuth } from "../context/AuthContext";

import Header from "../components/Header";
import Image from "../components/Image";
import QuantitySelector from "../components/QuantitySelector";

import styles from "./styles/ConfirmSighting.module.css";

import { formatDate } from "../utils/formatDate.ts";
import { CreateUserSpeciesList } from "../types/userSpeciesList.ts";

import {
  calendarNumberOutline,
  clipboardOutline,
  eyeOutline,
  locationOutline,
  chatbubbleEllipsesOutline,
  removeOutline,
  addOutline,
} from "ionicons/icons";

const ConfirmSighting: React.FC = () => {
  const { getSpeciesById, singleSpecies: species } = useSpecies();
  const { speciesId } = useParams<{ speciesId: string }>();
  const { session } = UserAuth();
  const { createUserSpeciesList, error } = useUser();
  const { showLoading, hideLoading } = useLoading();

  const router = useIonRouter();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [notes, setNotes] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [count, setCount] = useState<number>(1);

  const sightingData: CreateUserSpeciesList = {
    speciesId: speciesId,
    userId: session?.user.id,
    noteText: notes,
    location: location,
    observationDate: selectedDate,
    observations: count,
  };

  console.log("sightingData", sightingData);

  useEffect(() => {
    getSpeciesById(speciesId);
  }, [speciesId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user.id) {
      console.error("No user session found");
      return;
    }
    showLoading();
    try {
      const result = await createUserSpeciesList(sightingData)
        console.log("result in ConfirmSighting", result)
      if (!result.success) {
        setErrorMessage(result.error)
        throw error
    };

      router.push("/field-journal", "root");
    } catch (error) {
      console.error("Error saving sighting:", error);
    } finally {
      hideLoading(false);
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
            image={species?.SpeciesMedia[0]}
            className="sightingHeaderImage"
            bucket="species"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <IonItemGroup>
            <IonItemDivider color="inherit" className="ion-margin ">
              <h3>Sighting</h3>
            </IonItemDivider>

            <IonItem
              button
              lines="full"
              className="ion-margin"
              routerLink="/add-sighting"
            >
              <IonIcon aria-hidden="true" icon={eyeOutline} slot="start" />
              <div className={styles.quantityWrapper}>
                <IonLabel className="ion-padding-vertical">
                  <h2>{species?.name_common}</h2>
                </IonLabel>
                <QuantitySelector count={count} setCount={setCount} />
              </div>
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
              ></IonIcon>
              <IonLabel>
                <p className="ion-padding-bottom">Date</p>
                <h2>{formatDate(selectedDate)}</h2>
              </IonLabel>
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
              <IonLabel position="stacked">
                <p>Location</p>
              </IonLabel>
              <IonInput
                type="text"
                value={location}
                placeholder="Where did you see it?"
                onIonInput={(e) => setLocation(e.detail.value!)}
              />
            </IonItem>

            <IonItem lines="full" className="ion-margin ion-padding-bottom">
              <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
              <IonLabel position="stacked">
                <p>Notes</p>
              </IonLabel>
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
            backDropDismiss={true}
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
