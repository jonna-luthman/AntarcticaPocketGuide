import {
  GetSpeciesByClassOptions,
  GetSpeciesByClassWithMediaOptions,
  SpecieDetail,
  SpecieListItemWithMedia,
  SpecieQueryResult,
  SpecieSummary,
  SpecieSummaryWithMedia,
} from "./../types/species";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { AuthResult } from "../types/auth";

export default function useSpecies() {
  const [speciesList, setSpeciesList] = useState<
    SpecieListItemWithMedia[] | null
  >(null);
  const [singleSpecies, setSingleSpecies] = useState<SpecieDetail | null>(null);
  const [speciesWithSightings, setSpeciesWithSightings] = useState<
    SpecieListItemWithMedia[] | null
  >(null);

  const [error, setError] = useState<PostgrestError | null>(null);

  async function getAllSpecies(): Promise<SpecieListItemWithMedia[] | null> {
    try {
      setError(null);

      const { data, error } = await supabase
        .from("Species")
        .select(
          `
        id,
        name_common,
        name_latin,
        class_slug,
        slug,
        SpeciesMedia!inner(*)
      `
        )
        .eq("SpeciesMedia.role", "header")
        .order("name_common", { ascending: false })
        .limit(1, { foreignTable: "SpeciesMedia" });

      if (error) {
        setError(error);
        return null;
      }
      setSpeciesList(data);

      return data;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  async function getSpeciesByClass(
    classId: string,
    options?: GetSpeciesByClassOptions | GetSpeciesByClassWithMediaOptions
  ): Promise<SpecieQueryResult[] | null> {
    setError(null);

    try {
      const selectQuery = options?.includeMedia
        ? `id, name_common, name_latin, slug, class_slug, SpeciesMedia (id, media_url, role, order_index)`
        : `id, name_common, name_latin, slug, class_slug`;

      const { data, error } = await supabase
        .from("Species")
        .select(selectQuery)
        .eq("animal_class_id", classId);

      if (error) {
        setError(error);
        return null;
      }

      return data as unknown as SpecieQueryResult[];
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  async function getSpeciesById(id: string): Promise<SpecieDetail | null> {
    setError(null);

    try {
      const { data, error } = await supabase
        .from("Species")
        .select(
          `*,
        SpeciesMedia (*)
      `
        )
        .eq("id", id)
        .order("order_index", { foreignTable: "SpeciesMedia" })
        .single();

      if (error) {
        setError(error);
        return null;
      }

      setSingleSpecies(data as SpecieDetail);
      return data as SpecieDetail;
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

      return data;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  async function getUserSpeciesList(
    currentUserId: string
  ): Promise<SpecieSummaryWithMedia[] | null> {
    try {
      const { data, error } = await supabase
        .from("Species")
        .select(
          `id, name_common, name_latin, slug, class_slug, SpeciesMedia!inner(*), UserSpeciesList(*)`
        )
        .eq("UserSpeciesList.user_id", currentUserId);

      if (error) {
        setError(error);
        return null;
      }

      setSpeciesWithSightings(data);
      return data;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  return {
    getAllSpecies,
    getSpeciesByClass,
    getSpeciesBySearchQuery,
    getSpeciesById,
    getUserSpeciesList,
    speciesList,
    singleSpecies,
    speciesWithSightings,
    error,
  };
}
