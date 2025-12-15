import {
  IonPage,
  IonContent,
  IonImg,
  IonItem,
  IonText,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSpecies from "../hooks/useSpecies";
import { SpeciesFeatures } from "../components/Species/SpeciesFeatures";
import styles from "./styles/AnimalSpeciesPage.module.css";
import { DistinguishableFeaturesCard } from "../components/Species/distinguishableFeatures";
import SpeciesTabs from "../components/Species/SpeciesTabs";
import { Blend, PersonStanding } from "lucide-react";
import useXenoCanto from "../hooks/useXenoCanto";
import AnimalSounds from "../components/Species/AnimalSounds";

const AnimalSpeciesPage: React.FC = () => {
  const { speciesId } = useParams<{ speciesId: string }>();
  const { getSpeciesById, singleSpecies } = useSpecies();
  const { fetchSounds } = useXenoCanto();

  const [sounds, setSounds] = useState<Sound[]>([]);

  useEffect(() => {
    getSpeciesById(speciesId);
  }, [speciesId]);


  useEffect(() => {
    fetchSounds(singleSpecies?.name_latin).then(setSounds);
  }, [singleSpecies]);

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
        <div>
          {/* TODO: Add responsive picture */}
          <IonImg
            src="/aa.webp"
            color="tertiary"
            alt="Emperor penguin"
            class={styles.heroImage}
          />
        </div>

        <div className={styles.contentWrapper}>
          <IonText>
            <h1 className="font-average ion-text-uppercase ion-no-margin ion-padding-top">
              {singleSpecies?.name_common}
            </h1>
          </IonText>
          <IonText className="font-average">
            <h3 className="ion-no-margin">{singleSpecies?.name_latin}</h3>
          </IonText>

          <div className="ion-padding-top">
            <h3>Look for:</h3>
            <p>{singleSpecies?.identifying_features}</p>
          </div>

          {sounds > 0 && <AnimalSounds sounds={sounds} />}

          <div className="ion-padding-top">
            <h3 className="ion-text-justify">
              <Blend size={20} /> Similar species:
            </h3>
            <p>TODO</p>
          </div>

          <SpeciesFeatures specie={singleSpecies} />

          <DistinguishableFeaturesCard specie={singleSpecies} />

          <div className="ion-padding-top">
            <h3>
              <PersonStanding size={20} />
              Behaviour around people:
            </h3>
            <p>{singleSpecies?.human_interaction}</p>
          </div>

          <SpeciesTabs specie={singleSpecies} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AnimalSpeciesPage;
