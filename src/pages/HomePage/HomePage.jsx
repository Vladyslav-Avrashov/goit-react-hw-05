import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/themoviedbAPI';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getTrending() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    }
    getTrending();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
