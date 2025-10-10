const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getPrediction(features) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  return await response.json();
}
