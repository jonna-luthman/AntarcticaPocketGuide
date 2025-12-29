import { SpeciesMedia } from "../types/media";

/**
 * Retrieves the primary image for a specific role from a media array.
 * Filters by role and returns the first item based on the ascending order index.
 * * @param mediaArray - An array of species media objects.
 * @param role - The specific role to look for (e.g., 'header', 'facts').
 * @returns The first matching SpeciesMedia object, or undefined if no match is found.
 */
export const findImageByRole = (
  mediaArray: SpeciesMedia[] | null,
  role: SpeciesMedia["role"]
): SpeciesMedia | undefined => {
  if (!mediaArray) return undefined;

  return mediaArray
    .filter((m) => m.role === role)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))[0];
};

/**
 * Retrieves all media items associated with a specific role, sorted by their order index.
 * * @param mediaArray - An array of media objects or null.
 * @param role - The specific role to filter by (e.g., 'header', 'facts').
 * @returns An array of SpeciesMedia objects sorted by order_index, or an empty array if none found.
 */
export const getImagesByRole = (
  mediaArray: any[] | null,
  role: SpeciesMedia["role"]
): SpeciesMedia[] => {
  if (!mediaArray) return [];

  return mediaArray
    .filter((m) => m.role === role)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
};
