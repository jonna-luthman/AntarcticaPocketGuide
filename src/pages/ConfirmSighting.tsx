import {
  IonPage,
  IonButton,
  IonContent,
  IonItemGroup,
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
import { useTranslation } from "react-i18next";
import useGetLang from "../hooks/useGetLang";
import { findImageByRole } from "../utils/getMediaTypes";
import NotAuthorized from "../components/NotAuthorized";

interface ConfirmSightingProps {
  onShowLoginModal: () => void;
}

const ConfirmSighting: React.FC<ConfirmSightingProps> = ({ onShowLoginModal }) => {
  const { getSpeciesById, singleSpecies: species } = useSpecies();
  const { speciesId } = useParams<{ speciesId: string }>();
  const { session } = UserAuth();
  const { createUserSpeciesList } = useUser();
  const { showLoading, hideLoading } = useLoading();
  const getLang = useGetLang();
  const { t } = useTranslation();

  const router = useIonRouter();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [notes, setNotes] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    getSpeciesById(speciesId);
  }, []);

  const headerImage = findImageByRole(species?.SpeciesMedia ?? null, "header");

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
        <Header
          showBackButton={true}
          showLogo={false}
          showTitle={true}
          title={t("pages.header.addSighting")}
        />
      <IonContent fullscreen>
        {!session ? (
          <NotAuthorized
            title={t("notAuthorized.addSighting.title")}
            description={t("notAuthorized.addSighting.description")}
            buttonText={t("notAuthorized.buttonText")}
            onAction={onShowLoginModal}
          />
        ) : (
          <>
            <div>
              <Image
                image={species?.SpeciesMedia[0]}
                className="sightingHeaderImage"
                imageUrl={resolveImageUrl(headerImage?.media_url)}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <IonItemGroup>
                <IonItem
                  button
                  lines="full"
                  className="ion-margin-vertical ion-padding-bottom"
                  routerLink="/search"
                >
                  <h3 className="ion-margin">
                    {getLang(species, "name_common")}
                  </h3>
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
                  <p>{t("pages.confirmSighting.howMany")}</p>
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
                  <IonLabel position="stacked">
                    {t("pages.confirmSighting.location")}
                  </IonLabel>
                  <IonInput
                    type="text"
                    value={location}
                    placeholder={t("pages.confirmSighting.locationPlaceholder")}
                    onIonInput={(e) => setLocation(e.detail.value!)}
                  />
                </IonItem>

                <IonItem lines="full" className="ion-margin ion-padding-bottom">
                  <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
                  <IonLabel position="stacked">
                    {t("pages.confirmSighting.notes")}
                  </IonLabel>
                  <IonTextarea
                    value={notes}
                    placeholder={t("pages.confirmSighting.notesPlaceholder")}
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
                    onIonChange={(e) =>
                      setSelectedDate(e.detail.value as string)
                    }
                    showDefaultButtons={true}
                    doneText={t("buttons.save")}
                    presentation="date"
                    cancelText={t("buttons.cancel")}
                    color="dark"
                    hourCycle="h12"
                  />
                </div>
              </IonModal>
              <div className="ion-padding">
                <IonButton expand="block" color="tertiary" type="submit">
                  {t("buttons.save")}
                </IonButton>

                <IonButton
                  expand="block"
                  fill="clear"
                  color="dark"
                  onClick={() => router.back()}
                >
                  {t("buttons.cancel")}
                </IonButton>
              </div>
            </form>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ConfirmSighting;
