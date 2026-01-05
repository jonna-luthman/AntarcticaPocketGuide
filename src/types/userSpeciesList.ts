import { SpeciesMedia } from "./media";
import { SpecieSummary } from "./species";
import { Database } from "./supabase";

export type CreateUserSpeciesList = Pick<
  UserSpeciesList,
  | "species_id"
  | "user_id"
  | "note_text"
  | "location"
  | "observation_date"
  | "observations"
>;

export type UserSpeciesList =
  Database["public"]["Tables"]["UserSpeciesList"]["Row"];

export type UserSpeciesListItem = SpecieSummary & {
  SpeciesMedia: SpeciesMedia[];
  UserSpeciesList: UserSpeciesList[];
};

type ResponseSuccess = {
  success: true;
  data: UserSpeciesList
  }

type ResponseFailure = {
  success: false;
  error: {
    message: string;
    code?: string;
  };
};
export type CreateUserSpeciesListResult = ResponseSuccess | ResponseFailure;