import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function AudioPlayer({ audioUrl, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-4 text-white"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <span className="font-bold">{title}</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={togglePlay}
            className="bg-white text-purple-600 p-2 rounded-full hover:scale-110 transition"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <audio 
            ref={audioRef} 
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default AudioPlayer;
