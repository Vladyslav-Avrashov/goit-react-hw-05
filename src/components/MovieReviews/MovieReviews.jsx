import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/themoviedbAPI';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }
    getReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <ul className={s.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={s.item}>
          <h4>Author: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
