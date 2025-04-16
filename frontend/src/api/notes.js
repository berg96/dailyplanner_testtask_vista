const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Ошибка при выполнении запроса");
  }

  return response.status !== 204 ? await response.json() : true;
}

export function fetchNotes() {
  return apiRequest("/note/");
}

export function completeNote(noteId) {
  return apiRequest(`/note/${noteId}/done`, "PATCH");
}

export function uncompletedNote(noteId) {
  return apiRequest(`/note/${noteId}`, "PATCH", { is_done: false });
}

export function createNote(note) {
  return apiRequest("/note/", "POST", note);
}

export function deleteNote(noteId) {
  return apiRequest(`/note/${noteId}/`, "DELETE");
}

export function updateNote(note) {
  return apiRequest(`/note/${note.id}/`, "PATCH", note);
}
