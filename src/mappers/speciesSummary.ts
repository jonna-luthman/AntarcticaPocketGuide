import {
  SpecieQueryResult,
  UISpecieSummaryWithMedia,
} from "../types/species";
import { resolveImageUrl } from "../utils/resolveImageUrl";

export function mapSpecieSummaryToUI(
  specie: SpecieQueryResult
): UISpecieSummaryWithMedia {
  return {
    id: specie.id,
    name_common_en: specie.name_common_en ?? "Unknown",
    name_common_es: specie.name_common_es ?? "Unknown",
    name_latin: specie.name_latin ?? "",
    slug: specie.slug,
    class_slug: specie.class_slug ?? "",
    SpeciesMedia: specie.SpeciesMedia ?? [],
    resolvedImageUrl: specie.SpeciesMedia?.[0]?.media_url
      ? resolveImageUrl(specie.SpeciesMedia[0].media_url)
      : "",
  };
}
