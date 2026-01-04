import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../api/supabaseClient";
import {
  AnimalClass,
  AnimalClassSummary,
  AnimalClassWithMedia,
} from "../types/animalClasses";
import { useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function useAnimals() {
  const [animalClasses, setAnimalClasses] = useState<
    AnimalClassWithMedia[] | null
  >(null);
  const [animalFamilies, setAnimalFamilies] = useState<AnimalClass[] | null>(
    null
  );
  const [animalClass, setAnimalClass] = useState<AnimalClassSummary | null>(
    null
  );
  const [error, setError] = useState<PostgrestError | null>(null);

  async function getAllAnimalClasses() {
    try {
      setError(null);
      const { data, error } = await supabase
        .from("AnimalClasses")
        .select(
          `
          id, 
          name_en,
          name_es,
          slug, 
          SpeciesMedia (
          id, 
          media_url,
          role,
          order_index,
          attribute_en, 
          attribute_es
        )`
        )
        .eq("SpeciesMedia.role", "cover")
        .order("name_en", { ascending: false });
      if (error) {
        setError(error);
        return;
      }
      setAnimalClasses(data);
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  async function getAnimalClass(slug: string) {
    try {
      setError(null);

      const { data: classData } = await supabase
        .from("AnimalClasses")
        .select("id, name_en, name_es")
        .eq("slug", slug)
        .single();

      if (error) {
        setError(error);
        return null;
      }

      setAnimalClass(classData);
      return classData;
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  async function getAllAnimalFamilies() {
    try {
      setError(null);
      const { data, error } = await supabase.from("AnimalFamilies").select("*");

      if (error) {
        setError(error);
        return;
      }
      setAnimalFamilies(data);
    } catch (error: any) {
      console.error(error);
      setError(error);
      return null;
    }
  }

  return {
    getAllAnimalClasses,
    animalClasses,
    getAnimalClass,
    animalClass,
    getAllAnimalFamilies,
    animalFamilies,
    error,
  };
}
