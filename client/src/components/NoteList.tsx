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
      <h2>Note List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {note.title}{" "}
            <button type="button" onClick={() => handleDeleteNote(note._id)}>
              Delete{" "}
            </button>{" "}
            <button
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
        />
        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default NoteList;
