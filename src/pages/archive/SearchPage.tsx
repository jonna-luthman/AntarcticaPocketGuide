import {
  IonPage,
  IonContent,
  IonToolbar,
  IonSearchbar,
  IonTitle,
  IonList,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonItem,
  IonThumbnail,
  IonItemDivider,
  IonItemGroup,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import useMedia from "../hooks/useMedia.ts";
import useSpecies from "../hooks/useSpecies.ts";

import { SpecieSummary } from "../types/species";

import Header from "../components/Header";
import SpeciesCard from "../components/Species/SpeciesCard";
import Image from "../components/Image";

interface SpeciesWithUrl extends SpecieSummary {
  resolvedImageUrl: string | null;
  SpeciesMedia: SpeciesMedia[];
}

// Make in to a modal ????

const SearchPage: React.FC = () => {
  const { getAllSpecies, species } = useSpecies();
  const { getImageUrl } = useMedia();

  const [listItems, setListItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>("")

  console.log(listItems);

  useEffect(() => {
    getAllSpecies();
  }, []);

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

  const filteredItems = listItems?.filter((s) =>
    s.name_common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const birds = filteredItems?.filter((s) => s.class_slug === "birds");
  const seals = filteredItems?.filter((s) => s.class_slug === "seals");
  const whales = filteredItems?.filter(
    (s) => s.class_slug === "whales-and-dolphins"
  );

  const SpeciesGroup = ({ title, items }: { title: string; items: any[] }) => (
    <IonItemGroup className="ion-margin-bottom">
      <IonItemDivider color="inherit">
        <IonLabel>{title}</IonLabel>
      </IonItemDivider>
      {items.map((item) => (
        <IonItem
          key={item.id}
          button
          lines="full"
          className="ion-padding-bottom"
        >
          {item.resolvedImageUrl && (
            <IonThumbnail slot="start">
              <img alt={item.name_common} src={item.resolvedImageUrl} />
            </IonThumbnail>
          )}
          <IonLabel>{item.name_common}</IonLabel>
        </IonItem>
      ))}
    </IonItemGroup>
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header
          showBackButton={true}
          showLogo={false}
          showTitle={true}
          title="Add a Sighting"
        />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonSearchbar
              value={searchTerm}
              onIonInput={(e) => setSearchTerm(e.detail.value!)}
              placeholder="Search for species..."
              debounce={300}
            />
          </IonToolbar>
        </IonHeader>

        <IonList className="ion-padding">
          {birds && birds.length > 0 && (
            <SpeciesGroup title="Birds" items={birds} />
          )}

          {seals && seals.length > 0 && (
            <SpeciesGroup title="Seals" items={seals} />
          )}

          {whales && whales.length > 0 && (
            <SpeciesGroup title="Whales and Dolphins" items={whales} />
          )}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
