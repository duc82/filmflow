import MovieList from "../components/Home/MovieList";
import { getMovies } from "../services/movieService";
import { MovieResponse } from "../types/movie";

export default async function Home() {
  const [newMovie, movie] = await Promise.all([
    getMovies<MovieResponse>("phim-moi-cap-nhat"),
    getMovies<MovieResponse>("phim-le"),
  ]);

  return (
    <>
      <MovieList title={newMovie.titlePage} movies={newMovie.items} />
      <MovieList title={movie.titlePage} movies={movie.items} />
    </>
  );
}
