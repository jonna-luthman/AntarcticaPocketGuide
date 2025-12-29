import { IonPage, IonContent, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Blend, Eye, PersonStanding } from "lucide-react";

import useSpecies from "../hooks/useSpecies";
import useXenoCanto from "../hooks/useXenoCanto";

import styles from "./styles/AnimalSpeciesPage.module.css";

import SpeciesFeatures from "../components/Species/SpeciesFeatures";
import DistinguishableFeaturesCard from "../components/Species/DistinguishableFeatures";
import SpeciesTabs from "../components/Species/SpeciesTabs";
import AnimalSounds from "../components/Species/AnimalSounds";
import ImageModal from "../components/Species/ImageModal";
import Image from "../components/Image";
import Header from "../components/Header";

import { findImageByRole } from "../utils/getMediaTypes";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import useGetLang from "../hooks/useGetlang";
import { useTranslation } from "react-i18next";
import { AnimalSound } from "../types/animalSounds";

const AnimalSpeciesPage: React.FC = () => {
  const { speciesId } = useParams<{ speciesId: string }>();
  const { getSpeciesById, singleSpecies: species } = useSpecies();
  const { fetchSounds } = useXenoCanto();
  const getLang = useGetLang();
  const { t } = useTranslation();

  const [sounds, setSounds] = useState<AnimalSound[] | undefined>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getSpeciesById(speciesId);
  }, [speciesId]);

  useEffect(() => {
    if (species?.name_latin) fetchSounds(species.name_latin).then(setSounds);
  }, [species]);

  const headerImage = findImageByRole(species?.SpeciesMedia ?? null, "header");
  const imageUrl = headerImage?.media_url
    ? resolveImageUrl(headerImage.media_url)
    : "";

  return (
    <IonPage>
      {headerImage && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          image={headerImage}
        />
      )}

      <IonContent color="tertiary" className="ion-no-border">
        <Header showBackButton={true} showLogo={false} />

        {headerImage && (
          <div
            onClick={() => setIsImageModalOpen(true)}
            className={styles.headerImageContainer}
          >
            <Image image={headerImage} className="header" imageUrl={imageUrl} />
          </div>
        )}

        <div className={styles.contentWrapper}>
          <IonText>
            <h1 className="font-average ion-text-uppercase ion-no-margin ion-padding-top">
              {getLang(species, "name_common")}
            </h1>
          </IonText>
          <IonText className="font-average">
            <h3 className="ion-no-margin">{species?.name_latin}</h3>
          </IonText>

          <div className="ion-padding-top">
            <h3 className="ion-text-justify">
              <Eye size={20} />
              {t("pages.animalsSpeciesPage.lookFor")}
            </h3>
            <p> {getLang(species, "identifying_features")}</p>
          </div>

          {sounds && sounds.length > 0 && <AnimalSounds sounds={sounds} />}

          <div className="ion-padding-top">
            <h3 className="ion-text-justify">
              <Blend size={20} />{" "}
              {t("pages.animalsSpeciesPage.similiarSpecies")}
            </h3>
            <p>TBA</p>
          </div>

          <SpeciesFeatures specie={species} />
          <DistinguishableFeaturesCard specie={species} />

          <div className="ion-padding-top">
            <h3 className="ion-text-justify">
              <PersonStanding size={20} />
              {t("pages.animalsSpeciesPage.behaviourAroundPeople")}
            </h3>
            <p>{getLang(species, "human_interaction")}</p>
          </div>

          {<SpeciesTabs specie={species} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AnimalSpeciesPage;
