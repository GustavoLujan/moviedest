import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GenreFilter.module.css';

const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="genre-filter-container py-3">
      <div className="container">
        <ul className="nav nav-pills justify-content-start justify-content-md-center custom-pills-row">
          {/* Opción para deseleccionar y ver todas */}
          <li className="nav-item">
            <button 
              className={`nav-link custom-pill ${!selectedGenre ? 'active' : ''}`}
              onClick={() => onGenreChange(null)}
            >
              Todos
            </button>
          </li>

          {/* Mapeo dinámico de categorías desde la API */}
          {genres && genres.length > 0 ? (
            genres.map((genre) => (
              <li className="nav-item" key={genre.id}>
                <button
                  className={`nav-link custom-pill ${selectedGenre === genre.id ? 'active' : ''}`}
                  onClick={() => onGenreChange(genre.id)}
                >
                  {genre.name}
                </button>
              </li>
            ))
          ) : (
            <div className="text-secondary small ps-3">Cargando categorías...</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GenreFilter;