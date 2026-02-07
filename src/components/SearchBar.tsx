import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { movieApi, getImageUrl } from '../services/movieApi';
import type { Movie } from '../services/movieApi';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onMovieSelect: (movie: Movie) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onMovieSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length > 2) {
      setIsLoading(true);
      debounceRef.current = window.setTimeout(async () => {
        try {
          const response = await movieApi.getMovieSuggestions(query);
          setSuggestions(response.Search?.slice(0, 8) || []);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }

      return () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setSuggestions([]);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    onMovieSelect(movie);
    setQuery('');
    setSuggestions([]);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="search-container">
      <motion.form
        onSubmit={handleSubmit}
        className="search-form"
        animate={{ 
          width: isFocused ? '400px' : '300px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search movies..."
            className="search-input"
          />
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="clear-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
        
        {isLoading && (
          <motion.div
            className="search-loading"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <div className="loading-spinner" />
          </motion.div>
        )}
      </motion.form>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            className="suggestions-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(movie)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'var(--hover-bg)' }}
              >
                <img
                  src={getImageUrl(movie.Poster)}
                  alt={movie.Title}
                  className="suggestion-poster"
                />
                <div className="suggestion-info">
                  <h4 className="suggestion-title">{movie.Title}</h4>
                  <p className="suggestion-meta">
                    {movie.Year} • 
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
