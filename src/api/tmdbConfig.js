import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2ZmNzczY2NlZWRjMDcyM2Y5MmY5MGM5MDE0NDM2NyIsIm5iZiI6MTc2OTcxNDY0NC4xMTksInN1YiI6IjY5N2JiM2Q0NjQ0YjA2ZThlZjdmNzhjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3YcEzWf6bSbUOkzyHFAQ43ey_NFVyk3Wg8miFDSi8-w`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});


const filterQualityMovies = (data) => {
  if (data && data.results) {
    return {
      ...data,
      results: data.results.filter(movie => 
        movie.poster_path !== null &&        
        movie.backdrop_path !== null &&      
        movie.overview && movie.overview.length > 15 && 
        movie.vote_count > 0                
      )
    };
  }
  return data;
};

export const tmdb = {
  // Obtener tendencias (con filtro)
  getTrending: async (page = 1) => {
    const response = await api.get(`/trending/movie/day?language=es-ES&page=${page}`);
    return { ...response, data: filterQualityMovies(response.data) };
  },

  // Obtener detalles 
  getDetails: (id) => 
    api.get(`/movie/${id}?append_to_response=videos,credits&language=es-ES`),

  // Buscador 
  search: async (query, page = 1) => {
    const response = await api.get(`/search/movie?query=${query}&language=es-ES&page=${page}&include_adult=false`);
    return { ...response, data: filterQualityMovies(response.data) };
  },

  // Lista de géneros
  getGenres: () => 
    api.get('/genre/movie/list?language=es-ES'),

  // Filtro por género 
  getMoviesByGenre: async (genreId, page = 1) => {
    const response = await api.get(`/discover/movie?with_genres=${genreId}&language=es-ES&sort_by=popularity.desc&page=${page}`);
    return { ...response, data: filterQualityMovies(response.data) };
  },

  // --- FAVORITOS ---
  
  // Agregar o quitar de favoritos
  toggleFavorite: (movieId, isFavorite) => 
    api.post(`/account/account_id/favorite`, {
      media_type: "movie",
      media_id: movieId,
      favorite: isFavorite
    }),

  getFavorites: (page = 1) => 
    api.get(`/account/account_id/favorite/movies?language=es-ES&page=${page}&sort_by=created_at.desc`)
};

export default api;