import { Database } from "./supabase";

export type AnimalClass = Database["public"]["Tables"]["AnimalClasses"]["Row"];
export type AnimalClassSummary = Pick<AnimalClass, "id" | "name">;

export type AnimalFamily =
  Database["public"]["Tables"]["AnimalFamilies"]["Row"];
