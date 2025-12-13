import { DistinguishableFeatures } from "./species"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      AnimalClasses: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      AnimalFamilies: {
        Row: {
          class_id: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          class_id?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          class_id?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      Regions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Species: {
        Row: {
          animal_class_id: string | null
          behaviour: Json | null
          birthing_season: string | null
          class_slug: string | null
          conservation_status:
            | Database["public"]["Enums"]["ConservationStatus"]
            | null
          created_at: string
          diet: string | null
          distinguishable_features: DistinguishableFeatures | null
          facts: Json | null
          human_interaction: string | null
          id: string
          identifying_features: string | null
          lead_text: string | null
          lifespan: string | null
          mating_season: string | null
          name_common: string | null
          name_latin: string | null
          population: string | null
          distribution: Json | null
          size: string | null
          slug: string
          weight: string | null
          wildlife_interactions: Json | null
        }
        Insert: {
          animal_class_id?: string | null
          behaviour?: Json | null
          birthing_season?: string | null
          class_slug?: string | null
          conservation_status?:
            | Database["public"]["Enums"]["ConservationStatus"]
            | null
          created_at?: string
          diet?: string | null
          distinguishable_features?: Json | null
          facts?: Json | null
          human_interaction?: string | null
          id?: string
          identifying_features?: string | null
          lead_text?: string | null
          lifespan?: string | null
          mating_season?: string | null
          name_common?: string | null
          name_latin?: string | null
          population?: string | null
          regions?: string[] | null
          size?: string | null
          slug: string
          weight?: string | null
          wildlife_interactions?: Json | null
        }
        Update: {
          animal_class_id?: string | null
          behaviour?: Json | null
          birthing_season?: string | null
          class_slug?: string | null
          conservation_status?:
            | Database["public"]["Enums"]["ConservationStatus"]
            | null
          created_at?: string
          diet?: string | null
          distinguishable_features?: Json | null
          facts?: Json | null
          human_interaction?: string | null
          id?: string
          identifying_features?: string | null
          lead_text?: string | null
          lifespan?: string | null
          mating_season?: string | null
          name_common?: string | null
          name_latin?: string | null
          population?: string | null
          regions?: string[] | null
          size?: string | null
          slug?: string
          weight?: string | null
          wildlife_interactions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "Species_animal_class_id_fkey"
            columns: ["animal_class_id"]
            isOneToOne: false
            referencedRelation: "AnimalClasses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Species_class_slug_fkey"
            columns: ["class_slug"]
            isOneToOne: false
            referencedRelation: "AnimalClasses"
            referencedColumns: ["slug"]
          },
        ]
      }
      SpeciesMedia: {
        Row: {
          attribute: string | null
          created_at: string
          id: string
          media_url: string | null
          order_index: number | null
          photographer: string | null
          region: number[] | null
          species_id: string | null
        }
        Insert: {
          attribute?: string | null
          created_at?: string
          id?: string
          media_url?: string | null
          order_index?: number | null
          photographer?: string | null
          region?: number[] | null
          species_id?: string | null
        }
        Update: {
          attribute?: string | null
          created_at?: string
          id?: string
          media_url?: string | null
          order_index?: number | null
          photographer?: string | null
          region?: number[] | null
          species_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SpeciesMedia_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "Species"
            referencedColumns: ["id"]
          },
        ]
      }
      SpeciesRegion: {
        Row: {
          id: string
          regions_id: string
          species_id: string
        }
        Insert: {
          id?: string
          regions_id: string
          species_id: string
        }
        Update: {
          id?: string
          regions_id?: string
          species_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "SpeciesRegion_regions_id_fkey"
            columns: ["regions_id"]
            isOneToOne: false
            referencedRelation: "Regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SpeciesRegion_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "Species"
            referencedColumns: ["id"]
          },
        ]
      }
      SpeciesSimilarity: {
        Row: {
          id: string
          similar_species_id: string[]
          species_id: string
        }
        Insert: {
          id?: string
          similar_species_id: string[]
          species_id: string
        }
        Update: {
          id?: string
          similar_species_id?: string[]
          species_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "SpeciesSimilarity_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "Species"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id: string
          name?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      UserSpeciesList: {
        Row: {
          created_at: string
          id: number
          note_text: string | null
          species_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          note_text?: string | null
          species_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          note_text?: string | null
          species_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SpeciesList_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserSpeciesList_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "Species"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ConservationStatus:
        | "Least concern"
        | "Near threathened"
        | "Vulnerable"
        | "Endangered"
        | "Critically endangered"
        | "Extinct in the wild"
        | "Extinct"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ConservationStatus: [
        "Least concern",
        "Near threathened",
        "Vulnerable",
        "Endangered",
        "Critically endangered",
        "Extinct in the wild",
        "Extinct",
      ],
    },
  },
} as const
