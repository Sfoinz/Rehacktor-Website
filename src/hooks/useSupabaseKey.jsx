
export default function useSupabaseKey() {
  const supabaseKey = import.meta.env.VITE_RAWG_SUPABASE_KEY;

  if (!supabaseKey) {
    console.warn(" Nessuna Supabase API key trovata in VITE_RAWG_SUPABASE_KEY");
  }

  return supabaseKey;
}
