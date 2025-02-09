import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import StoryCard from "../components/StoryCard";
import { stories } from '../data/stories';
import { WordGame } from '../components/WordGame';
import { StoryQuiz } from '../components/StoryQuiz';


function Home() {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showWordGame, setShowWordGame] = useState(false);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <>
      <motion.div 
        className="p-6 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-transparent bg-clip-text"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Welcome to Arsalan's Magical Stories
        </motion.h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button 
            onClick={() => setShowWordGame(true)}
            className="px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-200 rounded-full hover:scale-105 transition"
          >
            🎮 Word Game
          </button>
          <button 
            onClick={() => setShowQuiz(true)}
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-200 rounded-full hover:scale-105 transition"
          >
            📝 Quiz
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(stories).map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <StoryCard
                {...story}
                isFavorite={favorites.includes(story.id)}
                onFavorite={() => toggleFavorite(story.id)}
                onClick={() => navigate(`/story/${story.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showQuiz && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <StoryQuiz />
              <button
                onClick={() => setShowQuiz(false)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {showWordGame && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <WordGame words={["star", "twinkle", "night", "sky", "diamond"]} />
              <button
                onClick={() => setShowWordGame(false)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Home;
