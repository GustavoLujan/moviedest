import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../api/tmdbConfig';
import MovieCard from '../components/MovieCard';
import styles from './Favorites.module.css';

const Favorites = () => {
  // Usamos useQuery directamente para obtener los favoritos de la API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await tmdb.getFavorites();
      return response.data;
    }
  });

  if (isLoading) return (
    <div className={styles.container}>
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
      <p className={styles.msg}>Cargando tu colección...</p>
    </div>
  );

  if (isError) return (
    <div className={styles.container}>
      <div className={styles.msg}>Error al cargar favoritos. Revisa tu Token y Account ID.</div>
    </div>
  );

  // Filtramos para asegurar que no haya posters rotos, igual que en la Home
  const favs = data?.results?.filter(movie => movie.poster_path) || [];

  return (
    <div className={styles.container}>
      <div className="container py-5">
        <h1 className="text-white fw-bold mb-5 text-uppercase">Mi Lista de Favoritos</h1>
        
        {favs.length === 0 ? (
          <div className="text-center text-secondary py-5">
            <span style={{ fontSize: '4rem' }}>🎬</span>
            <h3 className="mt-3">No tienes películas guardadas aún.</h3>
            <p>Explora las tendencias y añade algunas a tu lista.</p>
          </div>
        ) : (
          <div className="row g-4 row-cols-2 row-cols-md-3 row-cols-lg-4">
            {favs.map(movie => (
              <div key={movie.id} className="col d-flex align-items-stretch">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;