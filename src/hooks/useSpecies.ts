import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useLoading } from "../context/LoadingContext";
import { Specie, SpecieSummary } from "../types/species";

export default function useSpecies() {
  const { showLoading, hideLoading } = useLoading();
  const [species, setSpecies] = useState<Specie[] | SpecieSummary[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  async function getAllSpecies() {
    showLoading();

    const { data, error } = await supabase.from("Species").select("*");

    console.log("GET ALL SPECIES", data, error);
    if (error) {
      setError(error);
      return null;
    } else {
      setSpecies(data);
    }

    hideLoading();
  }

  async function getSpeciesByClass(classId: string): Promise<SpecieSummary[] | null> {
    try {
      showLoading();
      setError(null);

      const { data, error } = await supabase
        .from('Species')
        .select('id, name_common, name_latin')
        .eq("animal_class_id", classId);

      if (error) {
        setError(error);
        return null;
      }

      setSpecies(data);
      hideLoading()
      return data;

    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;

    } finally {
      hideLoading(); // always runs, even if error occurs
    }
  }

  return { getAllSpecies, getSpeciesByClass, species, error };
}
