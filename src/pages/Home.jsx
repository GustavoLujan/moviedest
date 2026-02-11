import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from "../api/tmdbConfig";
import MovieCard from "../components/MovieCard";
import GenreFilter from "../components/GenreFilter/GenreFilter";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.module.css';

const Home = ({ searchQuery }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);

  // 1. Obtención de géneros para el GenreFilter
  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const response = await tmdb.getGenres();
      return response.data.genres;
    }
  });

  // 2. Obtención de películas
  const { data: moviesData, isLoading: moviesLoading } = useQuery({
    queryKey: ['movies', selectedGenre, page, searchQuery],
    queryFn: async () => {
      if (searchQuery && searchQuery.trim() !== "") {
        const response = await tmdb.search(searchQuery, page);
        return response.data;
      }

      const response = selectedGenre 
        ? await tmdb.getMoviesByGenre(selectedGenre, page)
        : await tmdb.getTrending(page);
      return response.data;
    },
    keepPreviousData: true 
  });

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1); 
  };

  // Filtrado de resultados locales para limpiar la interfaz de "N/A"
  // Solo permitimos películas con póster y título
  const validMovies = moviesData?.results?.filter(movie => movie.poster_path && movie.title) || [];

  return (
    <div className="home-main-bg">
      {!searchQuery && (
        <GenreFilter 
          genres={genresData} 
          selectedGenre={selectedGenre} 
          onGenreChange={handleGenreChange} 
        />
      )}
      
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h2 className="display-6 fw-bold text-white text-uppercase">
              {searchQuery 
                ? `Resultados para: "${searchQuery}"` 
                : (selectedGenre 
                    ? `Categoría: ${genresData?.find(g => g.id === selectedGenre)?.name}` 
                    : 'Tendencias Mundiales')}
            </h2>
            <div className="title-underline mx-auto"></div>
          </div>
        </div>

        {moviesLoading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-danger" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4 row-cols-2 row-cols-md-3 row-cols-lg-4 justify-content-center">
            {validMovies.length > 0 ? (
              validMovies.map((movie) => (
                <div key={movie.id} className="col d-flex align-items-stretch justify-content-center">
                  <MovieCard movie={movie} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-white mt-5">
                <h3>No se encontraron resultados válidos para tu búsqueda.</h3>
              </div>
            )}
          </div>
        )}

        {/* Paginación: Solo se muestra si hay resultados válidos */}
        {!moviesLoading && validMovies.length > 0 && (
          <div className="row mt-5">
            <div className="col-12 text-center">
              <button 
                className="btn btn-danger btn-lg rounded-pill px-5 shadow"
                onClick={() => setPage(prev => prev + 1)}
              >
                Cargar más
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;