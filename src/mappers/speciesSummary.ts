import { SpecieQueryResult, UISpecieSummaryWithMedia } from "../types/species";
import { findImageByRole } from "../utils/getMediaTypes";
import { resolveImageUrl } from "../utils/resolveImageUrl";

/**
 * Transforms Specie from database result into UI summary object.
 * 
 * Handles extraction of the primary header image from the media array and the full storage URL for the image.
 * 
 * @param specie - The raw species data result from the database query.
 * @returns A structured object containing localized names and the resolved header image URL.
 */
export function mapSpecieSummaryToUI(
  specie: SpecieQueryResult
): UISpecieSummaryWithMedia {

  const headerImage = specie.SpeciesMedia 
    ? findImageByRole(specie.SpeciesMedia, "header") 
    : null;

    const resolvedImageUrl = headerImage 
    ? resolveImageUrl(headerImage.media_url) 
    : "";

  return {
    id: specie.id,
    name_common_en: specie.name_common_en ?? "Unknown",
    name_common_es: specie.name_common_es ?? "Unknown",
    name_latin: specie.name_latin ?? "",
    slug: specie.slug,
    class_slug: specie.class_slug ?? "",
    SpeciesMedia: specie.SpeciesMedia ?? [],
    resolvedImageUrl: resolvedImageUrl
  };
}
