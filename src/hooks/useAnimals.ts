import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../api/supabaseClient";
import { AnimalClass } from "../types/animalClasses";
import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function useAnimals() {
  const { showLoading, hideLoading } = useLoading();
  const [animalClasses, setAnimalClasses] = useState<AnimalClass[] | null>(
    null
  );
  const [animalFamilies, setAnimalFamilies] = useState<AnimalClass[] | null>(
    null
  );
  const [error, setError] = useState<PostgrestError | null>(null);

  console.log("animalClasses", animalClasses);
  useEffect(() => {
    getAllAnimalClasses();
  }, []);

  async function getAllAnimalClasses() {
    showLoading();

    const { data, error } = await supabase.from("AnimalClasses").select("*");

    console.log(data, error);
    if (error) {
      setError(error);
      return;
    } else {
      setAnimalClasses(data);
    }

    hideLoading();
  }

  async function getAllAnimalFamilies() {
    showLoading();

    const { data, error } = await supabase.from("AnimalFamilies").select("*");

    console.log(data, error);
    if (error) {
      setError(error);
      return;
    } else {
      setAnimalFamilies(data);
    }

    hideLoading();
  }

  return { getAllAnimalClasses, animalClasses, getAllAnimalFamilies, animalFamilies, error };
}
