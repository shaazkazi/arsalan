import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { stories } from '../data/stories';
import AudioPlayer from '../components/AudioPlayer';
import ParticleBackground from '../components/ParticleBackground';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories[id];
  const [sparkleLines, setSparkleLines] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const readingTime = Math.ceil(story?.content.join(' ').split(' ').length / 200);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / height) * 100);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
    const pageVariants = {
      initial: { opacity: 0, x: -200 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 200 }
    };

    const Sparkles = ({ lineId }) => (
      sparkleLines.has(lineId) && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.5, 0],
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </motion.div>
      )
    );

    if (!story) {
      return (
        <motion.div 
          className="p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Oops! Story not found! 🔍</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:scale-105 transform transition shadow-lg"
          >
            Let's Go Home! 🏠
          </button>
        </motion.div>
      );
    }

    const getRecommendedStories = () => {
      return Object.values(stories)
        .filter(s => s.id !== parseInt(id))
        .slice(0, 3);
    };

    const handleStoryClick = (storyId) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(`/story/${storyId}`);
    };

    return (
      <>
        <ParticleBackground />
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">📚 {readingTime} min read</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Progress: {Math.round(progress)}%</span>
            </div>
          </div>
          <motion.div className="h-1 bg-gray-200 dark:bg-gray-700">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto pb-24"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative h-[400px] mb-8 rounded-b-3xl overflow-hidden md:h-[400px] sm:h-auto"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            <img
              src={story.featuredImage}
              alt={story.title}
              className="w-full h-full object-contain md:object-cover sm:max-h-[300px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-6 left-6 right-6 text-4xl font-bold text-white text-center">
              {story.title}
            </h2>
          </motion.div>
        
          <div className="p-6">
            {story.content.map((paragraph, index) => (
              <motion.div
                key={`paragraph-${index}`}
                className="mb-8 relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-2xl leading-relaxed font-bold text-center">
                  {paragraph.split('\n').map((line, i) => {
                    const lineId = `line-${index}-${i}`;
                    return (
                      <motion.span
                        key={lineId}
                        className={`block mb-4 relative cursor-pointer ${
                          index % 2 ? 'text-purple-600 dark:text-purple-400' : 'text-pink-600 dark:text-pink-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        onHoverStart={() => setSparkleLines(prev => new Set(prev).add(lineId))}
                        onHoverEnd={() => setSparkleLines(prev => {
                          const next = new Set(prev);
                          next.delete(lineId);
                          return next;
                        })}
                      >
                        <Sparkles lineId={lineId} />
                        {line}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="mt-12 p-6">
          <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">More Magical Stories ✨</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getRecommendedStories().map(rec => (
              <motion.div
                key={rec.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleStoryClick(rec.id)}
              >
                <img src={rec.featuredImage} alt={rec.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-purple-600 dark:text-purple-400">{rec.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <AudioPlayer audioUrl={story.audioUrl} title={story.title} />
      </>
    );
  }

  export default StoryDetail;
