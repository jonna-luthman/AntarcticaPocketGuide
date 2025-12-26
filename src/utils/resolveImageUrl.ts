import { supabase } from "../api/supabaseClient";

export function resolveImageUrl(path: string | null | undefined, bucket = "species"): string {
  if (!path) return "";
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
