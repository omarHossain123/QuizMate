import React, { useState } from "react";
import TabLayout from "../layout/TabLayout";

const QuizApp = () => {
  const [aiQuestions, setAiQuestions] = useState([]);
  const [manualQuestions, setManualQuestions] = useState([]);

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
      setAiQuestions(
        data.flashcards.map((card) => ({
          question: card.question,
          answer: card.answer,
        }))
      );
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleAddQuestion = (newQuestion) => {
    setManualQuestions([...manualQuestions, newQuestion]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <TabLayout
        aiQuestions={aiQuestions}
        manualQuestions={manualQuestions}
        onAddQuestion={handleAddQuestion}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default QuizApp;
