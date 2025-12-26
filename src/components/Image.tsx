import { IonImg } from "@ionic/react";
import styles from "./styles/Image.module.css";
import { SpeciesMedia } from "../types/media";

type ImageProps = {
  image: SpeciesMedia;
  className?: keyof typeof styles;
  imageUrl?: string;
};

const Image = ({ image, className, imageUrl }: ImageProps) => {
  if (!image || !imageUrl) return null;

  return (
    <IonImg
      src={imageUrl ?? ""}
      alt={image.attribute ?? ""}
      className={className ? styles[className] : undefined}
    />
  );
};

export default Image;
