import { Metadata } from "next";
import MovieList from "../components/Home/MovieList";
import MovieList2 from "../components/Home/MovieList2";
import { getHome } from "../services/indexService";
import { getMovies, searchMovies } from "../services/movieService";
import { MovieResponse } from "../types/movie";

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getHome<MovieResponse>();

  return {
    title: data.seoOnPage.titleHead,
    description: data.seoOnPage.descriptionHead,
    openGraph: {
      type: data.seoOnPage.og_type,
      images: data.seoOnPage.og_image,
      url: data.seoOnPage.og_url,
    },
  };
};

export default async function Home() {
  const [newMovie, mostViewedMovie, whatMovieToWhatToday, upcomingMovie] =
    await Promise.all([
      getMovies<MovieResponse>("phim-moi-cap-nhat"),
      searchMovies<MovieResponse>({
        sort_field: "view",
      }),
      searchMovies<MovieResponse>(),
      getMovies<MovieResponse>("phim-sap-chieu"),
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
