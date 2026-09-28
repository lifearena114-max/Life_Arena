// Hand-written to mirror supabase/migrations/20260926130000_create_profiles_and_onboarding.sql.
// If the schema changes, prefer regenerating this with the Supabase CLI:
//   supabase gen types typescript --linked > src/lib/database.types.ts

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          username: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          username: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          username?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      onboarding_responses: {
        Row: {
          id: string;
          user_id: string;
          goal: string;
          domain: string | null;
          duration: string | null;
          motivation: string | null;
          experience_level: string | null;
          weekly_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal: string;
          domain?: string | null;
          duration?: string | null;
          motivation?: string | null;
          experience_level?: string | null;
          weekly_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal?: string;
          domain?: string | null;
          duration?: string | null;
          motivation?: string | null;
          experience_level?: string | null;
          weekly_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type OnboardingResponse = Database["public"]["Tables"]["onboarding_responses"]["Row"];
export type OnboardingResponseInsert =
  Database["public"]["Tables"]["onboarding_responses"]["Insert"];
export type OnboardingResponseUpdate =
  Database["public"]["Tables"]["onboarding_responses"]["Update"];
