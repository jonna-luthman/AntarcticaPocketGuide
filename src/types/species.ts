import { Database } from "./supabase";

export type Specie = Database['public']['Tables']['Species']['Row'];

export type SpecieSummary = Pick<Specie, 
  "id" | "name_common" | "name_latin"
>;

