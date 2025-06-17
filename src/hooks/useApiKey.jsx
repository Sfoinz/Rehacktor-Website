export default function useApiKey() {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ Nessuna API key trovata in VITE_RAWG_API_KEY");
  }

  return apiKey;
}
