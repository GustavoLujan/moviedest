import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tmdb } from '../api/tmdbConfig';

export const useMovieData = () => {
  const queryClient = useQueryClient();

  // Obtener tendencias
  const useTrending = () => useQuery(['trending'], tmdb.getTrending);

  // Obtener favoritos (Requiere tu Account ID en el .env)
  const useFavorites = () => useQuery(['favorites'], () => 
    tmdb.getFavorites(import.meta.env.VITE_TMDB_ACCOUNT_ID)
  );

  // Mutación para añadir/quitar favoritos
  const useToggleFavorite = () => {
    return useMutation(
      ({ movieId, isFavorite }) => isFavorite 
        ? tmdb.addFavorite(movieId) 
        : tmdb.removeFavorite(movieId),
      {
        onSuccess: () => {
          // Invalidamos la caché para que la lista de favoritos se actualice sola
          queryClient.invalidateQueries(['favorites']);
        },
      }
    );
  };

  return { useTrending, useFavorites, useToggleFavorite };
};