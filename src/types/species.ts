import { SpeciesMedia } from "./media";
import { Database } from "./supabase";
import { UserSpeciesList } from "./userSpeciesList";

export type Specie = {
  animal_class_id: string | null;
  behaviour_en: Behaviour | null;
  behaviour_es: Behaviour | null;
  birthing_season_en: string | null;
  birthing_season_es: string | null;
  class_slug: string | null;
  conservation_status: Database["public"]["Enums"]["ConservationStatus"] | null;
  created_at: string;
  diet_en: string | null;
  diet_es: string | null;
  distinguishable_features_en: DistinguishableFeatures | null;
  distinguishable_features_es: DistinguishableFeatures | null;
  distribution_en: Distribution | null;
  distribution_es: Distribution | null;
  facts_en: Facts | null;
  facts_es: Facts | null;
  human_interaction_en: string | null;
  human_interaction_es: string | null;
  id: string;
  identifying_features_en: string | null;
  identifying_features_es: string | null;
  lead_text_en: string | null;
  lead_text_es: string | null;
  lifespan: string | null;
  mating_season_en: string | null;
  mating_season_es: string | null;
  name_common_en: string | null;
  name_common_es: string | null;
  name_latin: string | null;
  population: string | null;
  size: string | null;
  slug: string;
  weight: string | null;
  [key: string]: any;
};

export type SpecieSummary = Pick<
  Specie,
  | "id"
  | "name_common_en"
  | "name_common_es"
  | "name_latin"
  | "class_slug"
  | "slug"
>;

export type SpecieWithMedia = Specie & {
  SpeciesMedia: SpeciesMedia[];
};

export type SpecieListItemWithMedia = SpecieSummary & {
  SpeciesMedia: SpeciesMedia[];
};

export type GetSpeciesByClassOptions = {
  includeMedia?: false;
};

export type GetSpeciesByClassWithMediaOptions = {
  includeMedia: true;
};

export type SpecieQueryResult = SpecieSummary & {
  SpeciesMedia?: SpeciesMedia[];
};

export type SpecieSummaryWithMediaAndUrl = SpecieSummary & {
  UserSpeciesList: UserSpeciesList[];
  SpeciesMedia: SpeciesMedia[];
  resolvedImageUrl: string | null;
};

export type SpecieSummaryWithMedia = SpecieSummary & {
  UserSpeciesList: UserSpeciesList[];
  SpeciesMedia: SpeciesMedia[];
};

export type UISpecieSummaryWithMedia = SpecieSummary & {
  resolvedImageUrl: string | null;
  SpeciesMedia: SpeciesMedia[];
};

export type SpecieDetail = Specie & {
  SpeciesMedia: SpeciesMedia[];
};

export interface BehaviourEntry {
  description: string;
}

export type Behaviour = Record<string, BehaviourEntry | undefined>;

export interface DistinguishableFeatures {
  features: string[];
}

export type Distribution = Record<string, string>;

export interface Facts {
  description: string[];
}
