import MovieList from "../components/Home/MovieList";
import { getMovies } from "../services/movieService";

export default async function Home() {
  const recommendations = await getMovies("phim-moi");
  console.log(recommendations);

  return (
    <>
      <MovieList movies={recommendations.items} />
    </>
  );
}
