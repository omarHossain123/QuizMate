import React from "react";
import FlashcardCard from "./FlashcardCard";

const FlashcardList = ({ questions, title }) => {
  if (questions.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-400">No questions available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <FlashcardCard questions={questions} />
    </div>
  );
};

export default FlashcardList;
