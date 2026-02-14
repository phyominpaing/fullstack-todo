import React, { useEffect, useState } from "react";
import { createNote, getNotes } from "../services/note";
import type { Note } from "../types/note";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const makeRefresh = () => {
    setRefresh(!refresh);
  }

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

  const addNewNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) return;
    try {
      await createNote(msg);
      setMsg("");
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to create note.");
    }
  };

  return (
    <div>
      <h2>Note List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.title}</li>
        ))}
      </ul>
      <form onSubmit={addNewNote} action="">
        <input
          type="text"
          name="title"
          id="title"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default NoteList;
