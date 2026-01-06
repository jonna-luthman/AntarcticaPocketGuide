import styles from "./styles/Image.module.css";
import { SpeciesMedia, SpeciesMediaSummary } from "../types/media";
import useGetLang from "../hooks/useGetLang";

type ImageProps = {
  image: SpeciesMedia | SpeciesMediaSummary | undefined;
  className?: keyof typeof styles;
  imageUrl?: string;
  priority?: string;
  aspectRatio?: string;
};

const Image = ({ image, className, imageUrl, priority, aspectRatio }: ImageProps) => {
  const getLang = useGetLang();
  if (!image || !imageUrl) return null;

  return (
    <div  
      style={{ aspectRatio: aspectRatio }}
    >
      <img
        src={imageUrl}
        alt={getLang(image, "attribute") || "Antarctica wildlife"}
        className={className ? styles[className] : undefined}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
      />
    </div>
  );
};

export default Image;
