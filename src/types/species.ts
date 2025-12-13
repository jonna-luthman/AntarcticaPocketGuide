import { Database } from "./supabase";

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

export interface BehaviourEntry {
  description: string;
}

export type Behaviour = Record<string, BehaviourEntry>;

export interface DistinguishableFeatures {
  features: string[];
}

export interface Facts {
  description: string[];
}

export type Distribution = Record<string, string>;

