import { supabase } from "../api/supabaseClient";

export async function getAllSpecies() {
  const { data, error } = await supabase
    .from("Species")
    .select("*");

  if (error) throw error;
  return data;
}