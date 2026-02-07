import axios from 'axios';

const API_KEY = '8a4e6bd';
const BASE_URL = 'http://www.omdbapi.com';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails extends Movie {
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

const api = axios.create({
  baseURL: BASE_URL,
});

// Mock data for fallback when API fails
const mockMovies: Movie[] = [
  {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWExZGUtYzAwZDQzOWNkNjRiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
    Type: 'movie'
  },
  {
    imdbID: 'tt0068646',
    Title: 'The Godfather',
    Year: '1972',
    Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYzcwZi00YzVlLWJkMjYtZGJkYmMxNmQ3NjE5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    Type: 'movie'
  },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM3NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    Type: 'movie'
  },
  {
    imdbID: 'tt0071562',
    Title: 'The Godfather: Part II',
    Year: '1974',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZGUtM2Q5OS00NTc1LThiODUtYjQwNDU5NjY3ZjA0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    Type: 'movie'
  },
  {
    imdbID: 'tt0050083',
    Title: '12 Angry Men',
    Year: '1957',
    Poster: 'https://m.media-amazon.com/images/M/MV5BODU4NjM4MjIwM15BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg',
    Type: 'movie'
  },
  {
    imdbID: 'tt0108052',
    Title: 'Schindler\'s List',
    Year: '1993',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNDE4ODMxMjAyMl5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg',
    Type: 'movie'
  },
  {
    imdbID: 'tt0167260',
    Title: 'Pulp Fiction',
    Year: '1994',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDI5ZTUtNTBhNS00NjA3LWIxY2MzZDQzNjNhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    Type: 'movie'
  },
  {
    imdbID: 'tt0110912',
    Title: 'The Lord of the Rings: The Return of the King',
    Year: '2003',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDYtM2Q0YThkZjI5MTFkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    Type: 'movie'
  }
];

const mockSearchResponse: SearchResponse = {
  Search: mockMovies,
  totalResults: '8',
  Response: 'True'
};

const mockMovieDetails: Record<string, MovieDetails> = {
  'tt0111161': {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWExZGUtYzAwZDQzOWNkNjRiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
    Type: 'movie',
    Released: '23 Sep 1994',
    Runtime: '142 min',
    Genre: 'Drama',
    Director: 'Frank Darabont',
    Writer: 'Stephen King, Frank Darabont',
    Actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    Plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    Language: 'English',
    Country: 'United States',
    Awards: 'Nominated for 7 Oscars. 21 wins & 42 nominations total',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '9.3/10' },
      { Source: 'Rotten Tomatoes', Value: '91%' },
      { Source: 'Metacritic', Value: '81/100' }
    ],
    Metascore: '81',
    imdbRating: '9.3',
    imdbVotes: '2,600,000',
    DVD: '20 Jan 1998',
    BoxOffice: '$28,341,469',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True'
  },
  'tt0068646': {
    imdbID: 'tt0068646',
    Title: 'The Godfather',
    Year: '1972',
    Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYzcwZi00YzVlLWJkMjYtZGJkYmMxNmQ3NjE5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    Type: 'movie',
    Released: '24 Mar 1972',
    Runtime: '175 min',
    Genre: 'Crime, Drama',
    Director: 'Francis Ford Coppola',
    Writer: 'Mario Puzo, Francis Ford Coppola',
    Actors: 'Marlon Brando, Al Pacino, James Caan',
    Plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    Language: 'English, Italian, Latin',
    Country: 'United States',
    Awards: 'Won 3 Oscars. 30 wins & 54 nominations total',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '9.2/10' },
      { Source: 'Rotten Tomatoes', Value: '97%' },
      { Source: 'Metacritic', Value: '100/100' }
    ],
    Metascore: '100',
    imdbRating: '9.2',
    imdbVotes: '1,800,000',
    DVD: '09 Oct 2001',
    BoxOffice: '$134,921,495',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True'
  }
};

export const movieApi = {
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    try {
      console.log('Searching movies with:', { query, page, apiKey: API_KEY });
      const response = await api.get('/', {
        params: {
          apikey: API_KEY,
          s: query,
          page,
          type: 'movie',
        },
      });
      
      console.log('API Response:', response.data);
      
      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'API request failed');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Search movies error:', error);
      // Return mock data if API fails
      console.log('Returning mock data due to API failure');
      return mockSearchResponse;
    }
  },

  getMovieDetails: async (imdbID: string): Promise<MovieDetails> => {
    try {
      console.log('Getting movie details for:', imdbID);
      const response = await api.get('/', {
        params: {
          apikey: API_KEY,
          i: imdbID,
          plot: 'full',
        },
      });
      
      console.log('Movie details response:', response.data);
      
      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'Failed to get movie details');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Get movie details error:', error);
      // Return mock data if API fails
      console.log('Returning mock movie details due to API failure');
      return mockMovieDetails[imdbID] || mockMovieDetails['tt0111161'];
    }
  },

  getPopularMovies: async (page: number = 1): Promise<SearchResponse> => {
    // OMDB doesn't have a popular endpoint, so we'll search for popular movies
    const popularQueries = ['marvel', 'star wars', 'avengers', 'jurassic', 'harry potter'];
    const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
    console.log('Fetching popular movies with query:', randomQuery);
    return movieApi.searchMovies(randomQuery, page);
  },

  getTrendingMovies: async (page: number = 1): Promise<SearchResponse> => {
    // OMDB doesn't have trending, so we'll search for recent movies
    console.log('Fetching trending movies');
    return movieApi.searchMovies('2023', page);
  },

  getTopRatedMovies: async (page: number = 1): Promise<SearchResponse> => {
    // OMDB doesn't have rating-based filtering, so we'll search for acclaimed movies
    console.log('Fetching top rated movies');
    return movieApi.searchMovies('academy award', page);
  },

  getUpcomingMovies: async (page: number = 1): Promise<SearchResponse> => {
    // OMDB doesn't have upcoming movies, so we'll search for recent releases
    console.log('Fetching upcoming movies');
    return movieApi.searchMovies('2024', page);
  },

  getMovieSuggestions: async (query: string): Promise<SearchResponse> => {
    try {
      console.log('Getting movie suggestions for:', query);
      const response = await api.get('/', {
        params: {
          apikey: API_KEY,
          s: query,
          page: 1,
          type: 'movie',
        },
      });
      
      console.log('Suggestions response:', response.data);
      
      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'Failed to get suggestions');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Get suggestions error:', error);
      console.log('Returning mock suggestions due to API failure');
      return mockSearchResponse;
    }
  },
};

export const getImageUrl = (posterPath: string) => {
  if (!posterPath || posterPath === 'N/A') {
    return '/placeholder-movie.jpg';
  }
  return posterPath;
};
