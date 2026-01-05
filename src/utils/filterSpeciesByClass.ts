import {
  SpecieSummaryWithMediaAndUrl,
  UISpecieSummaryWithMedia,
} from "../types/species";

interface Props {
  items: UISpecieSummaryWithMedia[] | undefined;
  classSlug: string;
}

export const filterSpeciesByClass = ({ items, classSlug }: Props) => {
  const filteredSpecies = items?.filter((s) => s.class_slug === classSlug);
  return filteredSpecies as SpecieSummaryWithMediaAndUrl[];
};
