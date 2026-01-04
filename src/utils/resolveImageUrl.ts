import { supabase } from "../api/supabaseClient";

/**
 * Resolves a storage path into a publicly accessible URL from Supabase Storage.
 * @param path - The file path stored in the database.
 * @param bucket - The Supabase storage bucket name. Defaults to "species".
 * @returns The full public URL string, or an empty string if no path is provided.
 * @example
 * const imageUrl = resolveImageUrl(species.image_path);
 * // returns: https://[project].supabase.co/storage/v1/object/public/species/penguin.jpg
 */

export function resolveImageUrl(path: string | null | undefined, bucket = "species"): string {
  if (!path) return "";
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
