import axios from "axios";
import type { Note } from "../types/note";

let API_URL = "";
if (import.meta.env.VITE_MODE === "development") {
  API_URL = import.meta.env.VITE_LOCAL_API_URL;
}

if (import.meta.env.VITE_MODE === "production") {
  API_URL = import.meta.env.VITE_API_URL;
}

console.log("api url", API_URL);

// export const getNotes = async (): Promise<Note[]> => {
//   const response = await fetch(`${API_URL}/todos`);
//   const data = await response.json();
//   return data.todos;
// };

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await axios.get(`${API_URL}/todos`);
  return data.todos;
};

// export const createNote = async (title: string) => {
//   await fetch(`${API_URL}/create`, {
//     method: "POST",
//     body: JSON.stringify({ title }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   // const data = await response.json();
//   // return data.todo;
// };

export const createNote = async (title: string) => {
  const { data } = await axios.post(`${API_URL}/create`, { title });
  return data.todo;
};

// export const updateNote = async (id: string, title: string) => {
//   await fetch(`${API_URL}/todos/${id}`, {
//     method: "PUT",
//     body: JSON.stringify({ title }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

export const updateNote = async (id: string, title: string) => {
  const { data } = await axios.put(`${API_URL}/todos/${id}`, { title });
  return data.todo;
};

// export const deleteNote = async (id: string) => {
//   await fetch(`${API_URL}/todos/${id}`, {
//     method: "DELETE",
//     body: JSON.stringify({ id }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

export const deleteNote = async (id: string) => {
  await axios.delete(`${API_URL}/todos/${id}`);
};
