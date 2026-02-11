import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../api/tmdbConfig';
import MovieCard from './components/MovieCard';
import styles from './Favorites.module.css'; // Reutilizamos el grid de favorites

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data, isLoading } = useQuery(['search', query], () => 
    tmdb.search(query), { enabled: !!query }
  );

  if (isLoading) return <div className={styles.msg}>Buscando "{query}"...</div>;

  const results = data?.data?.results || [];

  return (
    <div className={styles.container}>
      <h1>Resultados para: {query}</h1>
      <div className={styles.grid}>
        {results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {results.length === 0 && <p>No se encontraron películas.</p>}
    </div>
  );
};

export default Search;