import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { stories } from '../data/stories';
import AudioPlayer from '../components/AudioPlayer';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories[id];

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

  return (
    <>
      <motion.div 
  className="max-w-4xl mx-auto pb-24" // Added pb-24 for footer space
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
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
              key={index}
              className="mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <p className="text-2xl leading-relaxed font-bold text-center">
                {paragraph.split('\n').map((line, i) => (
                  <motion.span 
                    key={i}
                    className={`block mb-4 ${
                      index % 2 ? 'text-purple-600' : 'text-pink-600'
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <AudioPlayer audioUrl={story.audioUrl} title={story.title} />
    </>
  );
}

export default StoryDetail;