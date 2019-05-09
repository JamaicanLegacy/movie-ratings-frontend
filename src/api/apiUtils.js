export async function handleResponse(response) {
  if (response.ok) return response.json();
  // if (response.status === 204) return;
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok");
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

// Returns a URL friendly slug
export function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
