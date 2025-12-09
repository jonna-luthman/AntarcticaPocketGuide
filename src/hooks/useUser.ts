import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { AuthResult } from "../types/auth";
import { CreateUser, User } from "../types/user";

export default function useUsers() {
  const [user, setUser] = useState<User | null>(null);

  async function createNewUser(user: {
    id: string;
    name: string;
  }): Promise<AuthResult> {
    try {
      const { data, error } = await supabase
        .from("Users")
        .insert({
          id: user.id,
          name: user.name,
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

  return { createNewUser, updateUser, user };
}
