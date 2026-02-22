import React, { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import type { Note } from "../types/note";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    };
    fetchNotes();
  }, [refresh]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) return;
    try {
      if (editMode) {
        await updateNote(editId, msg);
        setEditMode(false);
      } else {
        await createNote(msg);
      }
      setMsg("");
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to create note.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to delete note.");
    }
  };

  const handleModeChange = (id: string, title: string) => {
    setEditMode(true);
    setMsg(title);
    setEditId(id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notes List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id} className="flex items-center gap-2 mb-2">
            <p className="font-semibold">{note.title}</p>
            <button
              className="text-red-600 underline font-medium"
              type="button"
              onClick={() => handleDeleteNote(note._id)}
            >
              Delete{" "}
            </button>{" "}
            <button
              className="underline font-medium"
              onClick={() => handleModeChange(note._id, note.title)}
              type="button"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={submitHandler} action="">
        <input
          type="text"
          name="title"
          id="title"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="border p-2 rounded-lg mr-2"
        />
        <button
          className=" text-white bg-black py-2 px-4 rounded-md border-2"
          type="submit"
        >
          {editMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NoteList;
