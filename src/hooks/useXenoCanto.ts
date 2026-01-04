import { useLoading } from "../context/LoadingContext";
import { supabase } from "../api/supabaseClient";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { AnimalSound } from "../types/animalSounds";

/**
 * Custom hook fetching bird sounds with the Xeno-Canto sounds API.
 * Via Supabase Edge Functions.
 * The hook provides amethod to fetch birds recordings on their scietific name
 * i.e "Thalassarche melanophris" for "Black browed Albatross" (in database 'name_latin')
 *
 * @returns
 * Success: An array of objects, containing recordings and recordings data.
 * Error: A error object from Edge Functions.
 */

export default function useXenoCanto() {
  const [error, setError] = useState<PostgrestError | null>(null);

  async function fetchSounds(
    scientificName: string
  ): Promise<AnimalSound[] | undefined> {
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke(
        "xeno-canto-sounds",
        {
          body: {
            name: scientificName,
          },
        }
      );

      if (error) {
        setError(error);
        return error;
      }

      return data as AnimalSound[];
    } catch (error) {
      console.error("An error occured: ", error);
    }
  }

  return { fetchSounds, error };
}
