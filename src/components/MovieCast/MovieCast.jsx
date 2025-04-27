import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/themoviedbAPI';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error(error);
      }
    }
    getCast();
  }, [movieId]);

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={styles.list}>
      {cast.map(({ cast_id, profile_path, name, character }) => (
        <li key={cast_id} className={styles.item}>
          <img
            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
            alt={name}
            className={styles.image}
          />
          <p>
            <b>{name}</b>
          </p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
