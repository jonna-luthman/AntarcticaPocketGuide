import { SpeciesMedia } from "../types/media";

export const findImageByRole = (
  mediaArray: SpeciesMedia[] | null,
  role: SpeciesMedia["role"]
): SpeciesMedia | undefined => {
  if (!mediaArray) return undefined;

  return mediaArray
    .filter((m) => m.role === role)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))[0];
};

export const getImagesByRole = (
  mediaArray: any[] | null,
  role: SpeciesMedia['role']
): SpeciesMedia[] => {
  if (!mediaArray) return [];

  return mediaArray
    .filter((m) => m.role === role)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}