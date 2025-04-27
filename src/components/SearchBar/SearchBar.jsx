import { useState } from 'react';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query);
    setQuery('');
  };

  return (
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
  );
};

export default SearchBar;
