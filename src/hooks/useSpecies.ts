import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { Specie, SpecieSummary, SpecieWithMedia } from "../types/species";

export default function useSpecies() {
  const [species, setSpecies] = useState<Specie[] | null>(null);
  const [singleSpecies, setSingleSpecies] = useState<Specie | null>(null);
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


  type GetSpeciesByClassOptions = {
    includeMedia?: boolean;
  };

  async function getSpeciesByClass(
    classId: string,
    options?: GetSpeciesByClassOptions
  ): Promise<SpecieSummary[] | SpecieWithMedia[] | null> {
    setError(null);

    try {
      let query = supabase
        .from("Species")
        .select(
          options?.includeMedia
            ? `
            id,
            name_common,
            name_latin,
            slug,
            class_slug,
            SpeciesMedia (
              id,
              media_url,
              role,
              order_index
            )
          `
            : `
            id,
            name_common,
            name_latin,
            slug,
            class_slug
          `
        )
        .eq("animal_class_id", classId);

      if (options?.includeMedia) {
        query = query
          .eq("SpeciesMedia.role", "header")
          .order("order_index", { foreignTable: "SpeciesMedia" });
      }

      const { data, error } = await query;

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (err: any) {
      console.error(err);
      setError(err);
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

      return data;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

async function getSpeciesById(
  id: string
): Promise<SpecieWithMedia | null> {
  setError(null);

  try {
    const { data, error } = await supabase
      .from("Species")
      .select(`*,
        SpeciesMedia (
          id,
          media_url,
          role,
          order_index,
          photographer,
          attribute
        )
      `)
      .eq("id", id)
      .order("order_index", { foreignTable: "SpeciesMedia" })
      .single();

    if (error) {
      setError(error);
      return null;
    }

    setSingleSpecies(data);
    return data;
  } catch (error: any) {
    console.error(error);
    setError(error);
    return null;
  }
}


  const getSpeciesSummariesByClass = (classId: string) =>
    getSpeciesByClass(classId);

  const getSpeciesWithHeaderMediaByClass = (classId: string) =>
    getSpeciesByClass(classId, { includeMedia: true });

  return {
    getAllSpecies,
    getSpeciesSummariesByClass,
    getSpeciesWithHeaderMediaByClass,
    getSpeciesBySearchQuery,
    getSpeciesById,
    singleSpecies,
    species,
    error,
  };
}
