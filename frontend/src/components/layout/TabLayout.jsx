import React, { useState } from "react";
import UploadSection from "../upload/UploadSection";
import CreateQuestion from "../create/CreateQuestion";
import FlashcardList from "../flashcards/FlashcardList";
import "./layout.css";

const TabLayout = ({
  aiQuestions,
  manualQuestions,
  onAddQuestion,
  onFileUpload,
}) => {
  const [activeTab, setActiveTab] = useState("study");

  const tabs = [
    { id: "study", label: "Study Cards", icon: "📚" },
    { id: "create", label: "Create", icon: "✏️" },
    { id: "upload", label: "Upload PDF", icon: "📄" },
  ];

  return (
    <div className="layout-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="content-area">
          {activeTab === "study" && (
            <div className="card">
              <FlashcardList
                questions={aiQuestions}
                title="AI Generated Questions"
              />
              <FlashcardList
                questions={manualQuestions}
                title="Manual Questions"
              />
            </div>
          )}
          {activeTab === "create" && (
            <div className="card">
              <CreateQuestion onAddQuestion={onAddQuestion} />
            </div>
          )}
          {activeTab === "upload" && (
            <div className="card">
              <UploadSection onFileUpload={onFileUpload} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabLayout;
