import { IonItem, IonLabel } from "@ionic/react";
import { animalSound } from "../../types/animalSounds";
import { AudioLines } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

export default function AnimalSounds({ sounds }: { sounds: animalSound[] }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="ion-padding-top">
        <h3 className="ion-text-justify">
          <AudioLines size={20} /> {t("pages.animalsSpeciesPage.listen")}
        </h3>
        {sounds?.map((sound) => (
          <IonItem key={sound.id}>
            <IonLabel>
              <audio
                controls
                src={sound.file}
                className="ion-padding-bottom"
                muted
              />
              <p>
                <Trans
                  i18nKey="pages.animalsSpeciesPage.recordedIn"
                  values={{ country: sound.country, recorder: sound.recorder }}
                  components={{ italic: <i /> }}
                />
              </p>
              <p>
                <i>
                  {t("pages.animalsSpeciesPage.licence")}: {sound.license}
                </i>
              </p>
            </IonLabel>
          </IonItem>
        ))}
      </div>
    </>
  );
}
