import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StoryCard from "../components/StoryCard";
import { stories } from '../data/stories';

function Home() {
  const navigate = useNavigate();

  return (
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
              onClick={() => navigate(`/story/${story.id}`)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Home;
