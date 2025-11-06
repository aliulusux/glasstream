export default function TestEnv() {
  console.log("🔍 VITE_SUPABASE_URL =", import.meta.env.VITE_SUPABASE_URL);
  console.log("🔍 VITE_SUPABASE_ANON_KEY =", import.meta.env.VITE_SUPABASE_ANON_KEY);
  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h2>Env Test</h2>
      <p>Check your browser console for the logs ↑</p>
    </div>
  );
}