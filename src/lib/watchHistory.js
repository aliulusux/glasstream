import { supabase } from "./supabaseClient";

// 🧠 Save watch progress
export async function saveWatchProgress({ mal_id, episode, progress }) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const user_id = session.user.id;

    const { error } = await supabase.from("watch_history").upsert(
      {
        user_id,
        mal_id,
        episode,
        progress,
        last_watched_at: new Date().toISOString(),
      },
      { onConflict: "user_id,mal_id,episode" }
    );

    if (error) console.error("Watch progress save error:", error);
    return !error;
  } catch (e) {
    console.error("Watch progress failed:", e);
    return false;
  }
}

// 📚 Get all watch history for current user
export async function getUserWatchHistory() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];
    const user_id = session.user.id;

    const { data, error } = await supabase
      .from("watch_history")
      .select("mal_id, episode, progress, last_watched_at")
      .eq("user_id", user_id)
      .order("last_watched_at", { ascending: false })
      .limit(30);

    if (error) {
      console.error("Fetch watch history error:", error);
      return [];
    }
