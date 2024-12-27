import React, { useState } from "react";
import IntroScreen from "./components/intro/IntroScreen";
import QuizApp from "./components/pages/QuizApp";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      {showIntro ? (
        <IntroScreen onGetStarted={() => setShowIntro(false)} />
      ) : (
        <QuizApp />
      )}
    </div>
  );
};

export default App;
