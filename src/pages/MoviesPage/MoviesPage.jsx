import { useState } from 'react';
import { searchMovies } from '../../services/themoviedbAPI';
import MovieList from '../../components/MovieList/MovieList';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies"
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
