import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';
import { getImageUrl } from '../services/movieApi';
import type { Movie } from '../services/movieApi';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  index: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
  const getRatingColor = (rating: string) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return '#10b981'; // green
    if (numRating >= 7) return '#f59e0b'; // amber
    if (numRating >= 6) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getGenreColor = (index: number) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      className="movie-card"
      onClick={() => onClick(movie)}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="movie-poster-container">
        <motion.img
          src={getImageUrl(movie.Poster)}
          alt={movie.Title}
          className="movie-poster"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <motion.div
          className="movie-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="overlay-content"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="overlay-title">{movie.Title}</h3>
            <p className="overlay-overview">Click to view details...</p>
            <motion.button
              className="view-details-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="movie-info"
        style={{ background: getGenreColor(movie.imdbID.length) }}
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        transition={{ delay: 0.3 + index * 0.1 }}
      >
        <h3 className="movie-title">{movie.Title}</h3>
        
        <div className="movie-meta">
          <div className="meta-item">
            <Calendar size={14} />
            <span>{parseInt(movie.Year)}</span>
          </div>
          
          <div className="meta-item rating" style={{ color: getRatingColor('7.5') }}>
            <Star size={14} fill={getRatingColor('7.5')} />
            <span>⭐</span>
          </div>
        </div>
        
        <motion.div
          className="rating-bar"
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
          style={{ backgroundColor: getRatingColor('7.5') }}
        />
      </motion.div>
    </motion.div>
  );
};
