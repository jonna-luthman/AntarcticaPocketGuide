import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useLoading } from "../context/LoadingContext";
import { Specie, SpecieSummary } from "../types/species";

export default function useSpecies<T>() {
  const [species, setSpecies] = useState<T[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  async function getAllSpecies(): Promise<Specie[] | null> {
    try {
      setError(null);

      const { data, error } = await supabase.from("Species").select("*");

      if (error) {
        setError(error);
        return null;
      }
      setSpecies(data as Specie[]);

      return data;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  async function getSpeciesByClass(
    classId: string
  ): Promise<SpecieSummary[] | null> {
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Species")
        .select("id, name_common, name_latin, slug")
        .eq("animal_class_id", classId);

      if (error) {
        setError(error);
        return null;
      }

      setSpecies(data as Specie[]);
      return data;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  async function getSpeciesBySearchQuery(
    query: string
  ): Promise<SpecieSummary[] | null> {
    setError(null);

    try {
      const { data, error } = await supabase
        .from("Species")
        .select("id, name_common, name_latin, slug, class_slug")
        .ilike("name_common", `%${query}%`);

      if (error) {
        setError(error);
        return null;
      }

      setSpecies(data as SpecieSummary[]);
      return data;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  return { getAllSpecies, getSpeciesByClass, getSpeciesBySearchQuery, species, error };
}
