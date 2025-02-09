import { motion } from "framer-motion";
import { useState } from 'react';

export function WordGame({ words = ["star", "twinkle", "night", "sky", "diamond"] }) {
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [scrambledWord, setScrambledWord] = useState('');

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const startNewRound = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
  };

  return (
    <motion.div className="p-8 text-center">
      <h3 className="text-2xl font-bold mb-6">Unscramble the Word! 🎯</h3>
      {scrambledWord ? (
        <>
          <p className="text-3xl font-bold mb-4 text-purple-600">{scrambledWord}</p>
          <input 
            type="text" 
            className="px-4 py-2 rounded-full border-2 border-purple-300 focus:border-purple-500 outline-none text-gray-900 dark:text-white dark:bg-gray-700"
            onChange={(e) => {
              if (e.target.value.toLowerCase() === currentWord) {
                setScore(score + 1);
                startNewRound();
                e.target.value = '';
              }
            }}
          />
          <p className="mt-4">Score: {score} ⭐</p>
        </>
      ) : (
        <button 
          onClick={startNewRound}
          className="px-6 py-3 bg-purple-600 text-white rounded-full hover:scale-105 transition"
        >
          Start Game! 🎮
        </button>
      )}
    </motion.div>
  );
}
