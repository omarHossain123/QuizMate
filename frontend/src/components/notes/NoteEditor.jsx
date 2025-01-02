import React, { useState } from "react";
import { Save } from "lucide-react";
import "./NoteEditor.css";

const NoteEditor = ({ note, onSave }) => {
  const [content, setContent] = useState(note?.content || "");
  const [title, setTitle] = useState(note?.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ title, content });
      if (!note) {
        setTitle("");
        setContent("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-editor">
      <div className="note-editor-header">
        <h3>Create New Note</h3>
      </div>
      <div className="note-editor-fields">
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="note-input"
            required
          />
        </div>
        <div className="input-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes here..."
            className="note-textarea"
            required
          />
        </div>
        <button type="submit" className="save-button">
          <Save size={20} />
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
