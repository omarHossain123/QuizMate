import React, { useState } from "react";
import "./FolderList.css";

const FolderList = ({ folders, onFolderSelect, onCreateFolder }) => {
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName);
      setNewFolderName("");
    }
  };

  return (
    <div className="folder-container">
      <div className="folder-content">
        <div className="create-folder">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New folder name"
          />
          <button onClick={handleCreateFolder}>Create Folder</button>
        </div>
        <div className="folders-grid">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => onFolderSelect(folder)}
              className="folder"
            >
              <h3>{folder.name}</h3>
              <p>
                {folder.flashcards.length} cards • {folder.notes.length} notes
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderList;
