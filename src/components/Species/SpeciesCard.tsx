import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonRouterLink,
} from "@ionic/react";
import styles from "./styles/SpeciesCard.module.css";
import Image from "../Image"
import { UISpecieSummaryWithMedia } from "../../types/species";
import { SpeciesMedia } from "../../types/media";

interface SpeciesCardProps {
  title: string | null;
  subtitle: string | null;
  species: UISpecieSummaryWithMedia | null;
  headerImage: SpeciesMedia;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({
  title,
  subtitle,
  species,
  headerImage,
}) => {

  console.log(species)

  return (
    <IonRouterLink
      routerLink={`/animals/${species?.class_slug}/${species?.id}`}
      routerDirection="forward"
    >
      <IonCard className={styles.specieCard} color="tertiary">
        <div className={styles.contentWrapper}>
          {headerImage && (
            <Image image={headerImage} className="cornerImage" imageUrl={species?.resolvedImageUrl ?? ""}/>
          )}

          <IonCardHeader className={styles.cardHeader}>
            <IonCardSubtitle className={styles.cardFont}>
              {subtitle}
            </IonCardSubtitle>
            <IonCardTitle className={styles.cardFont}>{title}</IonCardTitle>
          </IonCardHeader>
        </div>
      </IonCard>
    </IonRouterLink>
  );
};

export default SpeciesCard;
