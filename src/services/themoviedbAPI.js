import axios from 'axios';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzJkOWM5ODIxMjRmMjg5YWNlYjVlNzkwNTlkMjVkOCIsIm5iZiI6MTc0NTc1NzAxMi40MzUwMDAyLCJzdWIiOiI2ODBlMjM1NGQ4MGZkZjgyYTdlYWU2ZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nQ6FfwwOc1AC2FTwoW2czuWokk8tT4kzwd_SuaVgKEc';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await instance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async query => {
  const response = await instance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async movieId => {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
