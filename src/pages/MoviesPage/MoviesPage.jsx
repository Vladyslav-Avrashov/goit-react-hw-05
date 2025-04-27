import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/themoviedbAPI';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const getSearchQuery = async () => {
      if (!query) return;
      const data = await searchMovies(query);
      const searchedMovies = data?.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(searchedMovies);
    };
    getSearchQuery();
  }, [query]);

  const handleSearchSubmit = newQuery => {
    if (!newQuery) {
      return setSearchParams({});
    }

    setSearchParams({ query: newQuery });
  };

  return (
    <div className={s.container}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
