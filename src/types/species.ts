import { SpeciesMedia, SpeciesMediaSummary } from "./media";
import { Database } from "./supabase";
import { UserSpeciesList } from "./userSpeciesList";

export type Specie = {
  animal_class_id: string | null;
  behaviour: Behaviour | null;
  birthing_season: string | null;
  class_slug: string | null;
  conservation_status: Database["public"]["Enums"]["ConservationStatus"] | null;
  created_at: string;
  diet: string | null;
  distinguishable_features: DistinguishableFeatures | null;
  facts: Facts | null;
  human_interaction: string | null;
  id: string;
  identifying_features: string | null;
  lead_text: string | null;
  lifespan: string | null;
  mating_season: string | null;
  name_common: string | null;
  name_latin: string | null;
  population: string | null;
  distribution: Distribution | null;
  size: string | null;
  slug: string;
  weight: string | null;
};

export type SpecieSummary = Pick<
  Specie,
  "id" | "name_common" | "name_latin" | "class_slug" | "slug"
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
  SpeciesMedia?: SpeciesMediaSummary[];
};

export type SpecieSummaryWithMedia = SpecieSummary & {
  UserSpeciesList: UserSpeciesList[];
  SpeciesMedia: SpeciesMediaSummary[];
  resolvedImageUrl: string | null;
};

export type UISpecieSummaryWithMedia = SpecieSummary & {
  resolvedImageUrl: string;
  SpeciesMedia: SpeciesMediaSummary[];
};

export type SpecieDetail = Specie & {
  SpeciesMedia: SpeciesMedia[];
};

export interface BehaviourEntry {
  description: string;
}

export type Behaviour = Record<string, BehaviourEntry>;

export interface DistinguishableFeatures {
  features: string[];
}

export type Distribution = Record<string, string>;

export interface Facts {
  description: string[];
}
