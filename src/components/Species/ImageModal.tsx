import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonText,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import "swiper/swiper.css";
import Image from "../Image";
import { SpeciesMedia } from "../../types/media";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useTranslation } from "react-i18next";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: SpeciesMedia;
  className?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  image,
  className,
}) => {
  const { t } = useTranslation();
  const imageUrl = image?.media_url ? resolveImageUrl(image.media_url) : "";

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader className="ion-no-border">
        <IonToolbar color="tertiary">
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="tertiary">
        <Swiper
          modules={[Zoom]}
          zoom={true}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SwiperSlide>
            <IonText color="light" className="ion-padding ion-text-center">
              <h3>{image.attribute}</h3>
            </IonText>
            <div className="swiper-zoom-container">
              <Image image={image} imageUrl={imageUrl} className={className} />
            </div>
            {image?.photographer && (
              <IonText color="light" className="ion-padding">
                <i>{t('pages.animalsSpeciesPage.photographer')} {image.photographer}</i>
              </IonText>
            )}
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonModal>
  );
};

export default ImageModal;
