import {
  IonPage,
  IonContent,
  IonImg,
  IonText,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Blend, PersonStanding } from "lucide-react";

import useSpecies from "../hooks/useSpecies";
import useXenoCanto from "../hooks/useXenoCanto";

import styles from "./styles/AnimalSpeciesPage.module.css";

import SpeciesFeatures from "../components/Species/SpeciesFeatures";
import DistinguishableFeaturesCard from "../components/Species/distinguishableFeatures";
import SpeciesTabs from "../components/Species/SpeciesTabs";
import AnimalSounds from "../components/Species/AnimalSounds";
import Image from "../components/Image";

import { findImageByRole } from "../utils/getMediaTypes.ts";

const AnimalSpeciesPage: React.FC = () => {
  const { speciesId } = useParams<{ speciesId: string }>();
  const { getSpeciesById, singleSpecies: species } = useSpecies();
  const { fetchSounds } = useXenoCanto();

  const [sounds, setSounds] = useState<Sound[] | []>([]);

  useEffect(() => {
    getSpeciesById(speciesId)
  }, [speciesId]);

  useEffect(() => {
    //TODO: Only for testing => delete before release.
    // fetchSounds("Sterna paradisaea").then(setSounds);
    fetchSounds(species?.name_latin).then(setSounds);
  }, [species]);

  const headerImage = findImageByRole(species?.SpeciesMedia, "header");

  return (
    <IonPage>
      <IonContent color="tertiary" className="ion-no-border">
        <IonHeader className={`ion-padding`}>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {headerImage && <Image image={headerImage} class="header"/>}

        <div className={styles.contentWrapper}>
          <IonText>
            <h1 className="font-average ion-text-uppercase ion-no-margin ion-padding-top">
              {species?.name_common}
            </h1>
          </IonText>
          <IonText className="font-average">
            <h3 className="ion-no-margin">{species?.name_latin}</h3>
          </IonText>

          <div className="ion-padding-top">
            <h3>Look for:</h3>
            <p>{species?.identifying_features}</p>
          </div>

          {sounds?.length > 0 && <AnimalSounds sounds={sounds} />}

          <div className="ion-padding-top">
            <h3 className="ion-text-justify">
              <Blend size={20} /> Similar species:
            </h3>
            <p>TODO</p>
          </div>

          <SpeciesFeatures specie={species} />

          <DistinguishableFeaturesCard specie={species} />

          <div className="ion-padding-top">
            <h3>
              <PersonStanding size={20} />
              Behaviour around people:
            </h3>
            <p>{species?.human_interaction}</p>
          </div>

          <SpeciesTabs specie={species} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AnimalSpeciesPage;
