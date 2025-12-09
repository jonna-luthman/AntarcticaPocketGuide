import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { AuthResult } from "../types/auth";
import { CreateUser, User } from "../types/user";

export default function useUsers() {
  const [user, setUser] = useState<User | null>(null);

  async function createNewUser(user: CreateUser): Promise<User | AuthResult> {
    try {
      const { data: newUser, error } = await supabase
        .from("Users")
        .insert(user);

        console.log("newUser, error", newUser, error)

      if (error) {
        console.error("Error signing up: ", error.message);
        return { success: false, error: error.message };
      }

      
        setUser(newUser);
        return newUser;
      
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  }

  return { createNewUser, user };
}
