import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/themoviedbAPI';
import { lazy, Suspense } from 'react';
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    }
    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  const { title, overview, genres, poster_path } = movie;
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={s.container}>
      <Link to={backLinkHref.current} className={s.backLink}>
        ← Go back
      </Link>
      <div className={s.details}>
        <img src={imageUrl} alt={title} className={s.poster} />
        <div>
          <h2>{title}</h2>
          <p>
            <b>Overview:</b> {overview}
          </p>
          <p>
            <b>Genres:</b> {genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <div className={s.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
