import type { Note } from "../types/note";

let API_URL = "";
if (import.meta.env.VITE_MODE === "development") {
  API_URL = import.meta.env.VITE_LOCAL_API_URL;
}

if (import.meta.env.VITE_MODE === "production") {
  API_URL = import.meta.env.VITE_API_URL;
}

console.log("api url", API_URL);

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${API_URL}/todos`);
  const data = await response.json();
  return data.todos;
};

export const createNote = async (title: string) => {
  await fetch(`${API_URL}/create`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const data = await response.json();
  // return data.todo;
};
