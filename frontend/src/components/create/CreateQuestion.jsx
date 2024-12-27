import React, { useState } from "react";
import "./createQuestion.css";

const CreateQuestion = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && answer) {
      onAddQuestion({ question, answer });
      setQuestion("");
      setAnswer("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="create-question-container">
        <h2>Create New Question</h2>
        <form onSubmit={handleSubmit} className="create-question-form">
          <div>
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />
          </div>
          <div>
            <label>Answer</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
