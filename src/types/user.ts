import { Database } from "./supabase";

export type CreateUser = Database['public']['Tables']['Users']['Insert'];

export type User = Database['public']['Tables']['Users']['Row'];

export type UpdateUserResponse = {
  user: User;
}