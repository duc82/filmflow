import { getMovies } from "../services/movieService";

export default async function Home() {
  const recommendations = await getMovies("phim-moi");

  return <></>;
}
