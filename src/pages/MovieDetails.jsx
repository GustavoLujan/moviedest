import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tmdb } from '../api/tmdbConfig';
import { AiFillPlayCircle, AiFillHeart, AiOutlineHeart, AiOutlineArrowLeft } from 'react-icons/ai';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const res = await tmdb.getDetails(id);
      return res.data;
    }
  });

  const { data: favsData } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await tmdb.getFavorites();
      return res.data;
    }
  });

  // Evita pantalla negra verificando si results existe
  const isFavorite = favsData?.results?.some(f => f.id === Number(id)) || false;

  const mutation = useMutation({
    mutationFn: () => tmdb.toggleFavorite(movie.id, !isFavorite),
    onSuccess: () => queryClient.invalidateQueries(['favorites'])
  });

  if (isLoading) return <div className={styles.loadingContainer}><div className="spinner-border text-danger"></div></div>;
  if (isError || !movie) return <div className={styles.error}>Película no encontrada</div>;

  const trailer = movie?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  
  // Filtramos actores que NO tengan foto para mantener la estética
  const validCast = movie?.credits?.cast?.filter(actor => actor.profile_path).slice(0, 6) || [];

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}><AiOutlineArrowLeft /></button>
      
      <div className={styles.backdrop} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className={styles.overlay}>
          <div className={styles.contentWrapper}>
            <div className={styles.posterSide}>
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                alt={movie.title} 
              />
            </div>

            <div className={styles.infoSide}>
              <h1 className={styles.title}>{movie.title}</h1>
              <div className={styles.stats}>
                <span>★ {movie.vote_average?.toFixed(1)}</span> | <span>{movie.release_date?.split('-')[0]}</span> | <span>{movie.runtime} min</span>
              </div>
              <p className={styles.overview}>{movie.overview || "Sin descripción disponible."}</p>
              
              <div className={styles.actionButtons}>
                {trailer && (
                  <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer" className={styles.btnTrailer}>
                    <AiFillPlayCircle size={20} /> Ver Tráiler
                  </a>
                )}
                <button className={isFavorite ? styles.btnFavActive : styles.btnFav} onClick={() => mutation.mutate()}>
                  <AiFillHeart size={20} color={isFavorite ? "#e50914" : "white"} />
                  <span>{isFavorite ? 'En mi lista' : 'Favoritos'}</span>
                </button>
              </div>

              {validCast.length > 0 && (
                <div className={styles.castSection}>
                  <h4 className={styles.castTitle}>Reparto Principal</h4>
                  <div className={styles.castList}>
                    {validCast.map(actor => (
                      <div key={actor.id} className={styles.actorItem}>
                        <div className={styles.actorCircle}>
                          <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                        </div>
                        <span className={styles.actorName}>{actor.name.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;