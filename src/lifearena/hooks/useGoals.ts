import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Goal } from "@/lib/database.types";
import { useAuth } from "@/hooks/use-auth";

const TITLE_MAX_LENGTH = 120;
const DESCRIPTION_MAX_LENGTH = 2000;

export interface NewGoalInput {
  title: string;
  description?: string;
  category?: string;
  targetDate?: string;
}

interface UseGoalsResult {
  goals: Goal[];
  /** True only while the initial fetch for the current user is in flight. */
  loading: boolean;
  /** Error from the most recent fetch or create, if any. Creation errors are
   * surfaced via the rejected promise from `createGoal` too, so the caller
   * can keep a create-form open; this mirrors the same message for a
   * dashboard-level banner if desired. */
  error: string | null;
  /** True while a create is in flight. */
  creating: boolean;
  refresh: () => Promise<void>;
  createGoal: (input: NewGoalInput) => Promise<Goal>;
}

function normalizeGoalInput(input: NewGoalInput): {
  title: string;
  description: string | null;
  category: string | null;
  target_date: string | null;
} {
  const title = input.title.trim();
  if (!title) {
    throw new Error("Give your goal a title.");
  }
  if (title.length > TITLE_MAX_LENGTH) {
    throw new Error(`Title must be ${TITLE_MAX_LENGTH} characters or fewer.`);
  }

  const description = input.description?.trim() ?? "";
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    throw new Error(`Description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer.`);
  }

  const category = input.category?.trim() ?? "";
  const targetDate = input.targetDate?.trim() ?? "";

  return {
    title,
    description: description || null,
    category: category || null,
    target_date: targetDate || null,
  };
}

/**
 * Loads the signed-in user's goals and lets the UI create new ones. The
 * user id always comes from the authenticated Supabase session — never from
 * caller input — and Postgres RLS (see
 * `20260928120000_create_goals_journeys_milestones_quests.sql`) is the real
 * access boundary; this hook just avoids sending requests that RLS would
 * reject anyway.
 */
export function useGoals(): UseGoalsResult {
  const { user, loading: authLoading } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchGoals = useCallback(async () => {
    if (!user) {
      setGoals([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("goals")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setGoals(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void fetchGoals();
  }, [authLoading, fetchGoals]);

  const createGoal = useCallback(
    async (input: NewGoalInput): Promise<Goal> => {
      if (!user) {
        throw new Error("You need to be signed in to create a goal.");
      }

      const normalized = normalizeGoalInput(input);

      setCreating(true);
      setError(null);

      const { data, error: insertError } = await supabase
        .from("goals")
        .insert({
          user_id: user.id,
          title: normalized.title,
          description: normalized.description,
          category: normalized.category,
          target_date: normalized.target_date,
          status: "active",
        })
        .select("*")
        .single();

      setCreating(false);

      if (insertError || !data) {
        const message = insertError?.message ?? "Couldn't save that goal. Try again.";
        setError(message);
        throw new Error(message);
      }

      setGoals((prev) => [data, ...prev]);
      return data;
    },
    [user],
  );

  return { goals, loading, error, creating, refresh: fetchGoals, createGoal };
}
