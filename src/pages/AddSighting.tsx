import {
  IonPage,
  IonContent,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonHeader,
  IonItem,
  IonThumbnail,
  IonItemDivider,
  IonItemGroup,
} from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import useSpecies from "../hooks/useSpecies";

import Header from "../components/Header";
import NotAuthorized from "../components/NotAuthorized";

import { filterSpeciesByClass } from "../utils/filterSpeciesByClass";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { UserAuth } from "../context/AuthContext";
import { UISpecieSummaryWithMedia } from "../types/species";

interface AddSightingProps {
  onShowLoginModal: () => void;
}

const AddSighting: React.FC<AddSightingProps> = ({ onShowLoginModal }) => {
  const { session } = UserAuth();
  const { getAllSpecies, speciesList: species } = useSpecies();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getAllSpecies();
  }, []);

  useEffect(() => {
    if (!session) {
      onShowLoginModal();
    }
  }, []);

  const speciesWithUrls = useMemo(() => {
    if (!species) return [];

    return species.map((s) => {
      const headerMedia = s.SpeciesMedia?.[0];

      return {
        ...s,
        resolvedImageUrl: headerMedia
          ? resolveImageUrl(headerMedia.media_url, "species")
          : null,
      };
    });
  }, [species]);

  const filteredList = useMemo(() => {
    if (!searchTerm) return speciesWithUrls;

    return speciesWithUrls.filter((s) =>
      s.name_common?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [speciesWithUrls, searchTerm]);

  const birds = filterSpeciesByClass({
    items: filteredList,
    classSlug: "birds",
  });
  const seals = filterSpeciesByClass({
    items: filteredList,
    classSlug: "seals",
  });
  const whales = filterSpeciesByClass({
    items: filteredList,
    classSlug: "whales-and-dolphins",
  });

  const SpeciesGroup = ({ title, items }: { title: string; items: UISpecieSummaryWithMedia[] }) => (
    <IonItemGroup className="ion-margin-bottom">
      <IonItemDivider color="inherit">
        <h3 className="font-average ion-text-uppercase">{title}</h3>
      </IonItemDivider>
      {items.map((item) => (
        <IonItem
          key={item.id}
          button
          lines="full"
          className="ion-padding-bottom"
          routerLink={`/add-sighting/${item.id}`}
        >
          {item.resolvedImageUrl && (
            <IonThumbnail slot="start">
              <img alt={item.name_common ?? "undefined"} src={item.resolvedImageUrl} />
            </IonThumbnail>
          )}
          <div>
            <h4 className="font-average">{item.name_common}</h4>
            <p>{item.name_latin}</p>
          </div>
        </IonItem>
      ))}
    </IonItemGroup>
  );

  return (
    <IonPage>
      <Header
        showBackButton={true}
        showLogo={false}
        showTitle={true}
        title="Add a Sighting"
      />
      <IonContent fullscreen>
        {!session ? (
          <NotAuthorized title="Add sighting" description="Log in to add a sighting, track your progress, and build your personal field journal." onAction={onShowLoginModal} />
        ) : (
          <div>
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
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddSighting;
