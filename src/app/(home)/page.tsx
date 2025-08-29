import { Metadata } from "next";
import MovieList from "../components/Home/MovieList";
import MovieList2 from "../components/Home/MovieList2";
import { getMetadata } from "../services/indexService";
import { getMovies, searchMovies } from "../services/movieService";
import { MovieResponse } from "../types/movie";

export const revalidate = 900;

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getMetadata<MovieResponse>();

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
      getMovies<MovieResponse>("phim-moi"),
      getMovies<MovieResponse>("", {
        sort_field: "view",
        limit: 25,
      }),
      searchMovies<MovieResponse>(),
      getMovies<MovieResponse>("phim-sap-chieu", {
        limit: 25,
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
