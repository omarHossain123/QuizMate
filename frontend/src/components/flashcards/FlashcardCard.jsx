import React, { useState } from "react";
import "./flashcard.css";

const FlashcardCard = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  return (
    <div>
      <div
        className="flashcard-container"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          <div className="front">
            <p>{questions[currentIndex].question}</p>
            <p className="text-sm text-gray-400 mt-4">Click to reveal answer</p>
          </div>
          <div className="back">
            <p>{questions[currentIndex].answer}</p>
            <p className="text-sm text-gray-400 mt-4">Click to see question</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-400">
          {currentIndex + 1} of {questions.length}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardCard;
