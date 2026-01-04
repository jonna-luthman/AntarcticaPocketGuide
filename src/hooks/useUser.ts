import { User } from "@supabase/supabase-js";
import { supabase } from "../api/supabaseClient";
import { AuthResultUpdateUser } from "../types/auth";
import {
  CreateUserSpeciesList,
  CreateUserSpeciesListResult,
} from "../types/userSpeciesList";
import { useLoading } from "../context/LoadingContext";

/**
 * Hook that handles user related logic;
 *  checkUserProfile: Check if a user exists in 'public.Users' table after session has been initialized.
 *  updateUser: Update user password.
 *  createUserSpeciesList: Creates a row in 'public.userSpeciesList'
 */

export default function useUsers() {
  const { showLoading, hideLoading } = useLoading();

  /**
   * Function that syncronizes Supabase 'Authentication.Users' table with 'public.Users' table.
   * Using upsert logic (Insert and Update);
   *    If the user does not exist in 'public.Users', a new row is created with name and id (using 'Authentication.Users.UID')
   *    If the user already exists the row either is updated or remains the same.
   * @param user - User object coming from the current session in AuthContext.
   * @returns object with {data, success/error}
   */
  async function checkUserProfile(user: User) {
    try {
      const name =
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email ??
        "Unnamed user";

      const { data, error } = await supabase
        .from("Users")
        .upsert(
          {
            id: user.id,
            name: name,
          },
          { onConflict: "id" }
        )
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: { message: error.message, code: error.code },
        };
      }

      return { success: true, data: { user: data } };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  }

  async function updateUser(user: {
    email: string;
    password: string;
  }): Promise<AuthResultUpdateUser> {
    showLoading();
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: user.email,
        password: user.password,
      });

      if (error) {
        return {
          success: false,
          error: { message: error.message, code: error.code },
        };
      }

      return { success: true, user: data.user };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    } finally {
      hideLoading();
    }
  }

  async function createUserSpeciesList(
    sighting: CreateUserSpeciesList
  ): Promise<CreateUserSpeciesListResult> {
    showLoading()
    try {
      const { data, error } = await supabase
        .from("UserSpeciesList")
        .insert({
          user_id: sighting.user_id,
          note_text: sighting.note_text,
          species_id: sighting.species_id,
          location: sighting.location,
          observation_date: sighting.observation_date,
          observations: sighting.observations,
        })
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: { message: error.message, code: error.code },
        };
      }

      return { success: true, data: data };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    } finally {
      hideLoading()
    }
  }

  return {
    checkUserProfile,
    updateUser,
    createUserSpeciesList,
  };
}
