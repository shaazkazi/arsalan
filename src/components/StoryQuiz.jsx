import { motion } from "framer-motion";
import { useState } from 'react';

export function StoryQuiz({ questions = [
  {
    question: "What did the star do in the night sky?",
    options: ["Twinkle", "Dance", "Sleep", "Run"],
    correct: 0
  },
  {
    question: "What was the star compared to?",
    options: ["Sun", "Moon", "Diamond", "Cloud"],
    correct: 2
  }
]}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <motion.div className="p-8 text-center">
      {!showResult ? (
        <>
          <h3 className="text-2xl font-bold mb-6">Question {currentQuestion + 1} of {questions.length}</h3>
          <p className="text-xl mb-6">{questions[currentQuestion].question}</p>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className="w-full px-6 py-3 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <h3 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h3>
          <p className="text-xl">Your Score: {score} out of {questions.length} ⭐</p>
          <button 
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
            }}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full hover:scale-105 transition"
          >
            Play Again! 🎮
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
