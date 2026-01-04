import { supabase } from "../api/supabaseClient";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";

export default function useMedia() {
  const [error, setError] = useState<PostgrestError | null>(null);

  async function getSpeciesMedia(
    speciesId: string
  ) {
    try {
      const { data, error } = await supabase
        .from("SpeciesMedia")
        .select("*")
        .eq("species_id", speciesId)
        .order("order_index");

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("An error occured: ", error);
    }
  }

  async function getClassMedia(
    classId: string
  ){
    try {
      const { data, error } = await supabase
        .from("SpeciesMedia")
        .select("*")
        .eq("class_id", classId)

      if (error) {
        setError(error);
        return null;
      };

      return data;
    } catch (error) {
      console.error("An error occured: ", error);
    }
  }

  return { getSpeciesMedia, getClassMedia, error };
}
