import React, { useState } from "react";
import IntroScreen from "./components/intro/IntroScreen";
import FolderList from "./components/folders/FolderList";
import FolderView from "./components/folders/FolderView";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleCreateFolder = (name) => {
    setFolders([
      ...folders,
      {
        id: Date.now(),
        name,
        flashcards: [],
        notes: [],
      },
    ]);
  };

  const handleUpdateFolder = (updatedFolder) => {
    setFolders(
      folders.map((f) => (f.id === updatedFolder.id ? updatedFolder : f))
    );
    setSelectedFolder(updatedFolder);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-8">
      {showIntro ? (
        <IntroScreen onGetStarted={() => setShowIntro(false)} />
      ) : selectedFolder ? (
        <FolderView
          folder={selectedFolder}
          onBack={() => setSelectedFolder(null)}
          onUpdateFolder={handleUpdateFolder}
        />
      ) : (
        <FolderList
          folders={folders}
          onFolderSelect={setSelectedFolder}
          onCreateFolder={handleCreateFolder}
        />
      )}
    </div>
  );
};

export default App;
