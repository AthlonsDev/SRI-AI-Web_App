const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getSpeech(features) {
  const response = await fetch(`${API_URL}/speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  return await response.json();
}

export async function getSearch(features) {
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  return await response.json();
}


