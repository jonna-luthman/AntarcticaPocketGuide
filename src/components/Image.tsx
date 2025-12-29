import { IonImg } from "@ionic/react";
import styles from "./styles/Image.module.css";
import { SpeciesMedia, SpeciesMediaSummary } from "../types/media";
import useGetLang from "../hooks/useGetLang";

type ImageProps = {
  image: SpeciesMedia | SpeciesMediaSummary | undefined;
  className?: keyof typeof styles;
  imageUrl?: string;
};

const Image = ({ image, className, imageUrl }: ImageProps) => {
  const getLang = useGetLang();
  if (!image || !imageUrl) return null;

  return (
    <IonImg
      src={imageUrl ?? ""}
      alt={getLang(image, "attribute") ?? ""}
      className={className ? styles[className] : undefined}
    />
  );
};

export default Image;
