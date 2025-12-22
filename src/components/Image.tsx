import { useEffect, useState } from "react";
import { IonImg } from "@ionic/react";
import useMedia from "../hooks/useMedia";
import styles from "./styles/Image.module.css";

type ImageProps = {
  image: SpeciesMedia;
  className?: keyof typeof styles;
  bucket: "Species" | "AnimalClasses";
};

const Image = ({ image, className, bucket }: ImageProps) => {
  const { getImageUrl } = useMedia();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      if (image?.media_url) {
        const resolvedUrl = await getImageUrl({
          path: image.media_url,
          bucket: bucket,
        });

        setUrl(resolvedUrl);
      }
    };

    fetchUrl();
  }, [image?.media_url, bucket, getImageUrl]);

  if (!image || !url) return null;

  return (
    <IonImg
      src={url ?? ""}
      alt={image.attribute ?? ""}
      className={className ? styles[className] : undefined}
    />
  );
};

export default Image;
