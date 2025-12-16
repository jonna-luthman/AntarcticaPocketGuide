import { useLoading } from "../context/LoadingContext";
import { supabase } from "../api/supabaseClient";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { SpeciesMedia } from "../types/media";

export default function useMedia() {
  const [media, setMedia] = useState<SpeciesMedia[] | null>(null);
  const { showLoading, hideLoading } = useLoading();
  const [error, setError] = useState<PostgrestError | null>(null);

  async function getSpeciesMedia(
    speciesId: string
  ): Promise<SpeciesMedia[] | null> {
    showLoading();
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
      setMedia(data);

      return data;
    } catch (error) {
      console.error("An error occured: ", error);
    } finally {
      hideLoading();
    }
  }

  async function getClassMedia(
    classId: string
  ): Promise<SpeciesMedia[] | null> {
    showLoading();
    try {
      const { data, error } = await supabase
        .from("SpeciesMedia")
        .select("*")
        .eq("class_id", classId)

      if (error) {
        setError(error);
        return null;
      }
      setMedia(data);

      return data;
    } catch (error) {
      console.error("An error occured: ", error);
    } finally {
      hideLoading();
    }
  }

  function getSpeciesImageUrl(path: string): Promise<string | null> {
    const { data } = supabase.storage.from("species").getPublicUrl(path);

    return data.publicUrl;
  }

  return { getSpeciesMedia, getClassMedia, getSpeciesImageUrl, media, error };
}
