import { useLoading } from "../context/LoadingContext";
import { supabase } from "../api/supabaseClient";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";

export default function useXenoCanto() {
  const { showLoading, hideLoading } = useLoading();
  const [error, setError] = useState<PostgrestError | null>(null);

  async function fetchSounds(scientificName: string) {
    showLoading();
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
        return null;
      }

      return data;
    } catch (error) {
      console.error("An error occured: ", error);
    } finally {
      hideLoading();
    }
  }
  return { fetchSounds, error };
}
