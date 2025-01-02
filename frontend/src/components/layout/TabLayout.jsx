import React, { useState } from "react";
import { Book, PlusCircle, Upload, FileText, ArrowLeft } from "lucide-react";
import "./layout.css";
import UploadSection from "../upload/UploadSection";
import CreateQuestion from "../create/CreateQuestion";
import FlashcardList from "../flashcards/FlashcardList";
import NoteEditor from "../notes/NoteEditor";

const TabLayout = ({ folder, onBack, onUpdateFolder }) => {
  const [activeTab, setActiveTab] = useState("study");

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to process PDF");

      const newFlashcards = data.flashcards.map((card) => ({
        question: card.question,
        answer: card.answer,
      }));

      onUpdateFolder({
        ...folder,
        flashcards: [...folder.flashcards, ...newFlashcards],
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleAddQuestion = (newQuestion) => {
    onUpdateFolder({
      ...folder,
      flashcards: [...folder.flashcards, newQuestion],
    });
  };

  const handleAddNote = (note) => {
    const updatedFolder = {
      ...folder,
      notes: [...folder.notes, { ...note, id: Date.now() }],
    };
    onUpdateFolder(updatedFolder);
  };

  const handleDeleteNote = (noteId) => {
    const updatedFolder = {
      ...folder,
      notes: folder.notes.filter((note) => note.id !== noteId),
    };
    onUpdateFolder(updatedFolder);
  };

  const tabs = [
    { id: "study", label: "Study Cards", icon: <Book /> },
    { id: "create", label: "Create Card", icon: <PlusCircle /> },
    { id: "upload", label: "Upload PDF", icon: <Upload /> },
    { id: "notes", label: "Notes", icon: <FileText /> },
  ];

  return (
    <div className="folder-study-container">
      <div className="study-content">
        <div className="header-section">
          <div className="navigation-row">
            <button onClick={onBack} className="back-button">
              <ArrowLeft className="w-4 h-4" />
              Back to Folders
            </button>
          </div>
          <div className="folder-title-container">
            <h2 className="folder-title">{folder.name}</h2>
            <div className="folder-subtitle">
              {folder.flashcards.length} flashcards • {folder.notes.length}{" "}
              notes
            </div>
          </div>
        </div>
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="content-panel">
          {activeTab === "study" && (
            <FlashcardList
              questions={folder.flashcards}
              title="Study Flashcards"
            />
          )}
          {activeTab === "create" && (
            <CreateQuestion onAddQuestion={handleAddQuestion} />
          )}
          {activeTab === "upload" && (
            <UploadSection onFileUpload={handleFileUpload} />
          )}
          {activeTab === "notes" && (
            <div className="notes-section">
              <NoteEditor onSave={handleAddNote} />
              <div className="notes-grid">
                {folder.notes.map((note) => (
                  <div key={note.id} className="note-card">
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="delete-note"
                    >
                      ✕
                    </button>
                    <h3 className="note-title">{note.title}</h3>
                    <p className="note-content">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabLayout;
