import { Database } from "./supabase";

export type Specie = Database['public']['Tables']['Species']['Row'];

