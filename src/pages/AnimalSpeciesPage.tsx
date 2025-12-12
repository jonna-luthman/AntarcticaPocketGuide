import { IonPage, IonContent, IonImg, IonItem, IonText } from "@ionic/react";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router";
import useSpecies from "../hooks/useSpecies";
import { SpeciesFeatures } from "../components/Species/SpeciesFeatures";
import styles from "./styles/AnimalSpeciesPage.module.css";
import { DistinguishableFeaturesCard } from "../components/Species/distinguishableFeatures";
import SpeciesTabs from "../components/Species/SpeciesTabs";

const AnimalSpeciesPage: React.FC = () => {
  const { speciesId } = useParams<{ speciesId: string }>();
  const { getSpeciesById, singleSpecies } = useSpecies();

  useEffect(() => {
    getSpeciesById(speciesId);
  }, [speciesId]);

  return (
    <IonPage className="">
      <Header showBackButton={true} />
      <IonContent color="primary">
        <div className={styles.backgroundColor}>
          <IonItem color="tertiary">
            <IonImg
              src="/emperor-1.svg"
              color="tertiary"
              alt="Emperor penguin"
              className="ion-margin-vertical"
            />
          </IonItem>

          <div className={styles.contentWrapper}>
            <IonText>
              <h1 className="font-average ion-text-uppercase ion-no-margin ion-padding-top">
                {singleSpecies?.name_common}
              </h1>
            </IonText>
            <IonText className="font-average">
              <h3 className="ion-no-margin">{singleSpecies?.name_latin}</h3>
            </IonText>

            <div>
              <h3>Look for:</h3>
              <p>{singleSpecies?.identifying_features}</p>
            </div>

            <div>
              <h3>Similar species:</h3>
              <p>TODO</p>
            </div>

            <SpeciesFeatures specie={singleSpecies} />
            {singleSpecies && (
              <DistinguishableFeaturesCard specie={singleSpecies} />
            )}

            <div>
              <h3>Behaviour around people:</h3>
              <p>{singleSpecies?.human_interaction}</p>
            </div>
          </div>
        </div>
        <SpeciesTabs specie={singleSpecies}/>
      </IonContent>
    </IonPage>
  );
};

export default AnimalSpeciesPage;
