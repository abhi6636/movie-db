import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { movieApi } from './services/movieApi';
import type { Movie, MovieDetails } from './services/movieApi';
import './App.scss';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<'trending' | 'popular' | 'top_rated' | 'upcoming'>('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'trending' as const, label: '🔥 Trending', color: '#ff6b6b' },
    { key: 'popular' as const, label: '🌟 Popular', color: '#4ecdc4' },
    { key: 'top_rated' as const, label: '⭐ Top Rated', color: '#45b7d1' },
    { key: 'upcoming' as const, label: '🚀 Upcoming', color: '#96ceb4' },
  ];

  const fetchMovies = async (category: typeof currentCategory, query?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (query) {
        response = await movieApi.searchMovies(query);
      } else {
        switch (category) {
          case 'trending':
            response = await movieApi.getTrendingMovies();
            break;
          case 'popular':
            response = await movieApi.getPopularMovies();
            break;
          case 'top_rated':
            response = await movieApi.getTopRatedMovies();
            break;
          case 'upcoming':
            response = await movieApi.getUpcomingMovies();
            break;
        }
      }
      
      setMovies(response.Search || []);
    } catch (err: any) {
      console.error('Error fetching movies:', err);
      if (err.message && err.message.includes('API key')) {
        setError('Invalid API key. Please check your OMDB API key configuration.');
      } else if (err.message && err.message.includes('Movie not found')) {
        setError('No movies found. Try a different search term.');
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError('Failed to fetch movies. Please check your internet connection and API key.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentCategory);
  }, [currentCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchMovies(currentCategory, query);
  };

  const handleMovieSelect = async (movie: Movie) => {
    try {
      const details = await movieApi.getMovieDetails(movie.imdbID);
      setSelectedMovie(details);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <ThemeProvider>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <motion.h1
              className="app-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              🎬 MovieDB
            </motion.h1>
            
            <div className="header-controls">
              <SearchBar onSearch={handleSearch} onMovieSelect={handleMovieSelect} />
              <ThemeToggle />
            </div>
          </div>
          
          <nav className="categories">
            {categories.map((category, index) => (
              <motion.button
                key={category.key}
                className={`category-btn ${currentCategory === category.key ? 'active' : ''}`}
                onClick={() => {
                  setCurrentCategory(category.key);
                  setSearchQuery('');
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: currentCategory === category.key ? category.color : 'transparent',
                  borderColor: category.color,
                }}
              >
                {category.label}
              </motion.button>
            ))}
          </nav>
        </header>

        <main className="main">
          {loading && (
            <motion.div
              className="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-spinner" />
              <p>Loading amazing movies...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              className="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>{error}</p>
              <button onClick={() => fetchMovies(currentCategory)}>Try Again</button>
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div
              className="movies-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {movies.map((movie, index) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={handleMovieSelect}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && !error && movies.length === 0 && (
            <motion.div
              className="no-results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2>No movies found</h2>
              <p>Try searching for something else or browse different categories.</p>
            </motion.div>
          )}
        </main>

        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-btn" onClick={closeModal}>×</button>
                
                <div className="modal-header">
                  <img
                    src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : '/placeholder-movie.jpg'}
                    alt={selectedMovie.Title}
                    className="modal-backdrop"
                  />
                  <div className="modal-header-content">
                    <h2>{selectedMovie.Title}</h2>
                    {selectedMovie.Plot && <p className="tagline">"{selectedMovie.Plot.substring(0, 100)}..."</p>}
                    <div className="modal-meta">
                      <span>⭐ {selectedMovie.imdbRating}</span>
                      <span>📅 {selectedMovie.Year}</span>
                      <span>⏱️ {selectedMovie.Runtime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="modal-body">
                  <div className="genres">
                    {selectedMovie.Genre.split(', ').map((genre, index) => (
                      <span key={index} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  <div className="overview">
                    <h3>Overview</h3>
                    <p>{selectedMovie.Plot}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
