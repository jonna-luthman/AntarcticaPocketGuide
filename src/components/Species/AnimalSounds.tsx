import { IonItem, IonLabel } from "@ionic/react";
import { animalSound } from "../../types/animalSounds";
import { AudioLines } from "lucide-react";

export default function AnimalSounds({ sounds }: { sounds: animalSound[] }) {
  return (
    <>
      <div className="ion-padding-top">
        <h3 className="ion-text-justify">
          <AudioLines size={20} /> Listen
        </h3>
        {sounds?.map((sound) => (
          <IonItem key={sound.id}>
            <IonLabel>
              <audio controls src={sound.file} className="ion-padding-bottom" muted/>
              <p>Recorded in <i>{sound.country}</i> by <i>{sound.recorder}</i>
              </p>
              <p>
                <i>License: {sound.license}</i>
              </p>
            </IonLabel>
          </IonItem>
        ))}
      </div>
    </>
  );
}
