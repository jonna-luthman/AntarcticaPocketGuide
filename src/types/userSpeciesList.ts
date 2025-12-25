import { SpeciesMedia } from "./media";
import { SpecieSummary } from "./species";
import { Database } from "./supabase";

export type CreateUserSpeciesList =
  Database["public"]["Tables"]["UserSpeciesList"]["Insert"];

export type UserSpeciesList = Database["public"]["Tables"]["UserSpeciesList"]["Row"];

export type UserSpeciesListItem =
  SpecieSummary & {
    SpeciesMedia: SpeciesMedia[];
    UserSpeciesList: UserSpeciesList[];
  };
