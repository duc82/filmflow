import MovieList from "../components/Home/MovieList";
import MovieList2 from "../components/Home/MovieList2";
import { getMovies, searchMovies } from "../services/movieService";
import { MovieResponse } from "../types/movie";
import { limit } from "../constants/pagination";

export const revalidate = 900;

export default async function Home() {
  const [newMovie, mostViewedMovie, whatMovieToWhatToday, upcomingMovie] =
    await Promise.all([
      getMovies<MovieResponse>("phim-moi"),
      getMovies<MovieResponse>("", {
        sort_field: "view",
        limit,
      }),
      searchMovies<MovieResponse>(),
      getMovies<MovieResponse>("phim-sap-chieu", {
        limit,
      }),
    ]);

  return (
    <>
      <MovieList title="Phim Mới Cập Nhật" movies={newMovie.items} />
      <MovieList2 title="Phim Được Xem Nhiều" movies={mostViewedMovie.items} />
      <MovieList title="Xem Gì Hôm Nay" movies={whatMovieToWhatToday.items} />
      <MovieList2 title="Phim Sắp Chiếu" movies={upcomingMovie.items} />
    </>
  );
}
