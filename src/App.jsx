import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import StoryDetail from "./pages/StoryDetail";
import Navbar from "./components/Navbar";
import "./styles/global.css";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <Router>
      <div className={`${theme} min-h-screen transition-colors duration-300`}>
        {isLoading ? (
          <motion.div
            className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              className="text-4xl font-bold text-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Arsalan's Stories
            </motion.h1>
          </motion.div>
        ) : (
          <>
            <Navbar theme={theme} setTheme={setTheme} />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/story/:id" element={<StoryDetail />} />
              </Routes>
            </AnimatePresence>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
