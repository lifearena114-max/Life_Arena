// Hand-written to mirror supabase/migrations/20260926130000_create_profiles_and_onboarding.sql
// and supabase/migrations/20260928120000_create_goals_journeys_milestones_quests.sql.
// If the schema changes, prefer regenerating this with the Supabase CLI:
//   supabase gen types typescript --linked > src/lib/database.types.ts

export type GoalStatus = "active" | "completed" | "paused" | "archived";
export type JourneyStatus = "active" | "completed" | "paused" | "archived";
export type MilestoneStatus = "locked" | "upcoming" | "active" | "completed";
export type QuestStatus = "pending" | "completed" | "skipped";

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
        Relationships: [];
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
        Relationships: [];
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: string | null;
          target_date: string | null;
          status: GoalStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category?: string | null;
          target_date?: string | null;
          status?: GoalStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: string | null;
          target_date?: string | null;
          status?: GoalStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      journeys: {
        Row: {
          id: string;
          goal_id: string;
          user_id: string;
          title: string;
          description: string | null;
          status: JourneyStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          goal_id: string;
          user_id: string;
          title: string;
          description?: string | null;
          status?: JourneyStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          goal_id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          status?: JourneyStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "journeys_goal_owner_fkey";
            columns: ["goal_id", "user_id"];
            isOneToOne: false;
            referencedRelation: "goals";
            referencedColumns: ["id", "user_id"];
          },
        ];
      };
      journey_milestones: {
        Row: {
          id: string;
          journey_id: string;
          user_id: string;
          title: string;
          description: string | null;
          position: number;
          status: MilestoneStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          journey_id: string;
          user_id: string;
          title: string;
          description?: string | null;
          position: number;
          status?: MilestoneStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          journey_id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          position?: number;
          status?: MilestoneStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "journey_milestones_journey_owner_fkey";
            columns: ["journey_id", "user_id"];
            isOneToOne: false;
            referencedRelation: "journeys";
            referencedColumns: ["id", "user_id"];
          },
        ];
      };
      quests: {
        Row: {
          id: string;
          journey_id: string;
          milestone_id: string;
          user_id: string;
          title: string;
          description: string | null;
          xp: number;
          due_date: string | null;
          status: QuestStatus;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          journey_id: string;
          milestone_id: string;
          user_id: string;
          title: string;
          description?: string | null;
          xp?: number;
          due_date?: string | null;
          status?: QuestStatus;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          journey_id?: string;
          milestone_id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          xp?: number;
          due_date?: string | null;
          status?: QuestStatus;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quests_journey_owner_fkey";
            columns: ["journey_id", "user_id"];
            isOneToOne: false;
            referencedRelation: "journeys";
            referencedColumns: ["id", "user_id"];
          },
          {
            foreignKeyName: "quests_milestone_journey_fkey";
            columns: ["milestone_id", "journey_id"];
            isOneToOne: false;
            referencedRelation: "journey_milestones";
            referencedColumns: ["id", "journey_id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
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

export type Goal = Database["public"]["Tables"]["goals"]["Row"];
export type GoalInsert = Database["public"]["Tables"]["goals"]["Insert"];
export type GoalUpdate = Database["public"]["Tables"]["goals"]["Update"];

export type Journey = Database["public"]["Tables"]["journeys"]["Row"];
export type JourneyInsert = Database["public"]["Tables"]["journeys"]["Insert"];
export type JourneyUpdate = Database["public"]["Tables"]["journeys"]["Update"];

export type JourneyMilestone = Database["public"]["Tables"]["journey_milestones"]["Row"];
export type JourneyMilestoneInsert = Database["public"]["Tables"]["journey_milestones"]["Insert"];
export type JourneyMilestoneUpdate = Database["public"]["Tables"]["journey_milestones"]["Update"];

export type Quest = Database["public"]["Tables"]["quests"]["Row"];
export type QuestInsert = Database["public"]["Tables"]["quests"]["Insert"];
export type QuestUpdate = Database["public"]["Tables"]["quests"]["Update"];
