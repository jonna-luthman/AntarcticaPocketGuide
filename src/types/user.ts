import { Database } from "./supabase";

export type CreateUser = Database["public"]["Tables"]["Users"]["Insert"];

export type AuthUser = Database["public"]["Tables"]["Users"]["Row"];

export type UpdateUserResponse = {
  user: AuthUser;
};
