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
import useGetLang from "../hooks/useGetlang";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

interface AddSightingProps {
  onShowLoginModal: () => void;
}

const AddSighting: React.FC<AddSightingProps> = ({ onShowLoginModal }) => {
  const { session } = UserAuth();
  const { getAllSpecies, speciesList: species } = useSpecies();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getLang = useGetLang();
  const { t } = useTranslation();
  const lang = i18n.language;

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
    const nameKey = `name_common_${lang}` as keyof (typeof speciesWithUrls)[0];

    return speciesWithUrls.filter((s) => {
      const name = (s[nameKey] || s.name_common_en || "")
        .toString()
        .toLowerCase();

      return name.includes(searchTerm.toLowerCase());
    });
  }, [speciesWithUrls, searchTerm, lang]);

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

  const SpeciesGroup = ({
    title,
    items,
  }: {
    title: string;
    items: UISpecieSummaryWithMedia[];
  }) => (
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
              <img
                alt={getLang(item, "name_common") ?? "undefined"}
                src={getLang(item, "resolvedImageUrl")}
              />
            </IonThumbnail>
          )}
          <div>
            <h4 className="font-average">{getLang(item, "name_common")}</h4>
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
          <div>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonSearchbar
                  value={searchTerm}
                  onIonInput={(e) => setSearchTerm(e.detail.value!)}
                  placeholder={t("searchBarDescription")}
                  debounce={300}
                />
              </IonToolbar>
            </IonHeader>

            <IonList className="ion-padding">
              {birds && birds.length > 0 && (
                <SpeciesGroup title={t("animalClasses.birds")} items={birds} />
              )}

              {seals && seals.length > 0 && (
                <SpeciesGroup title={t("animalClasses.seals")} items={seals} />
              )}

              {whales && whales.length > 0 && (
                <SpeciesGroup
                  title={t("animalClasses.whalesAndDolphins")}
                  items={whales}
                />
              )}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddSighting;
