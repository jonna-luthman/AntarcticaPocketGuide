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

interface SpeciesCardProps {
  title: string | null;
  subtitle: string | null;
  species: Specie | null;
  headerImage: SpeciesMedia;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({
  title,
  subtitle,
  species,
  headerImage,
}) => {

  return (
    <IonRouterLink
      routerLink={`/animals/${species.classSlug}/${species.id}`}
      routerDirection="forward"
    >
      <IonCard className={styles.specieCard} color="tertiary">
        <div className={styles.contentWrapper}>
          {headerImage && (
            <Image image={headerImage} className="cornerImage"/>
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
