import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { AuthResult } from "../types/auth";
import { CreateUser, User } from "../types/user";

export default function useUsers() {
  const [user, setUser] = useState<User | null>(null);

  async function createNewUser(user: {
    id: string;
    name: string;
  }): Promise<User | AuthResult> {
    try {
      const { data, error } = await supabase
        .from("Users")
        .insert({
          id: user.id, // FK till auth.users
          name: user.name,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      setUser(data);
      return data;
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  }

  return { createNewUser, user };
}
