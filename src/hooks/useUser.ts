import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { AuthResult } from "../types/auth";
import { User } from "../types/user";
import { User } from "@supabase/supabase-js";

export default function useUsers() {
  const [user, setUser] = useState<User | null>(null);

  async function checkUserProfile(user: User): Promise<AuthResult> {
    try {
      const { data: existingUser, error: selectError } = await supabase
        .from("Users")
        .select("id")
        .eq("id", user.id);

      if (selectError) {
        return { success: false, error: selectError.message };
      }

      if (existingUser) {
        return { success: true, data: existingUser };
      }

      const name =
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email ??
        "Unnamed user";

      const { data, error } = await supabase
        .from("Users")
        .insert({
          id: user.id,
          name,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  }

  async function updateUser(user: {
    email: string;
    password: string;
  }): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: user.email,
        password: user.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  }

  async function createUserSpeciesList(sighting): Promise<AuthResult> {
    try {
      console.log("sighting in createUserSpeciesList", sighting)
      const { data, error } = await supabase
        .from("UserSpeciesList")
        .insert(
          { user_id: sighting.userId, 
            note_text: sighting.noteText,
            species_id: sighting.speciesId,
            location: sighting.location,
            observation_date: sighting.date,
            observations: sighting.observations
         })
        .select()
        .single();

         console.log("data, error", data, error)

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  }

  return { checkUserProfile, updateUser, user, createUserSpeciesList };
}
