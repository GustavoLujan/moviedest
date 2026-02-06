import React from 'react';
import { Link } from 'react-router-dom'; 
import './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  // 1. Configuración de imágenes y placeholders
  const PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Sin+Poster';
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : PLACEHOLDER;

  // 2. Función para manejar errores de carga (por si la URL de la API falla)
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER;
  };

  return (
    /* Envolvemos todo en un Link para navegar a los detalles */
    <Link to={`/movie/${movie.id}`} className="text-decoration-none w-100 h-100">
      <div className="movie-card-wrapper h-100 w-100">
        <div className="poster-container position-relative">
          <img 
            src={imageUrl} 
            alt={movie.title} 
            className="img-fluid rounded-3 movie-poster-img" 
            onError={handleImageError}
            loading="lazy"
          />
          <div className="rating-badge">
            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
          </div>
        </div>
        
        <div className="movie-info mt-2 text-center">
          {/* Mostramos el título y el año de estreno */}
          <h6 className="text-white text-truncate mb-0 px-1" title={movie.title}>
            {movie.title}
          </h6>
          <p className="text-secondary small">
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;