import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="toggle-track">
        <motion.div
          className="toggle-thumb"
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {isDark ? (
            <Moon size={16} className="icon" />
          ) : (
            <Sun size={16} className="icon" />
          )}
        </motion.div>
      </div>
    </motion.button>
  );
};
