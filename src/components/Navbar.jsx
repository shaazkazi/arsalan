import { SunIcon, MoonIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar({ theme, setTheme }) {
  return (
    <motion.nav 
      className="p-4 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpenIcon className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Arsalan
            </span>
          </motion.div>
        </Link>
        <motion.button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
        >
          {theme === "light" ? 
            <MoonIcon className="h-6 w-6 text-purple-600" /> : 
            <SunIcon className="h-6 w-6 text-yellow-500" />
          }
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
