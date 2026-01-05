export type SpeciesMedia = {
  id: string;
  attribute_en: string | null;
  attribute_es: string | null;
  created_at: string;
  media_url: string | null;
  order_index: number | null;
  photographer: string | null;
  region: number[] | null;
  species_id: string | null;
  class_id: string | null;
  role: string | null;
};

export type SpeciesMediaSummary = Pick<SpeciesMedia, "id" | "role" | "media_url" | "order_index" | "attribute_en" | "attribute_es">
