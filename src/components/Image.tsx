import { IonImg } from "@ionic/react";
import useMedia from "../hooks/useMedia";
import styles from "./styles/Image.module.css";

type ImageProps = {
  image: SpeciesMedia;
  className?: keyof typeof styles;
};

const Image = ({ image, className }: ImageProps) => {
  const { getSpeciesImageUrl } = useMedia();

  if (!image || !image.media_url) return null;

  const imageUrl = getSpeciesImageUrl(image.media_url);

  return (
    <IonImg
      src={imageUrl}
      alt={image.attribute ?? ""}
      className={className ? styles[className] : undefined}
    />
  );
};

export default Image;
