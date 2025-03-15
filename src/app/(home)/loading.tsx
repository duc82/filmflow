import MovieListSkeleton from "../components/Skeleton/MovieListSkeleton";

export default function HomeLoading() {
  return (
    <>
      <MovieListSkeleton />
      <MovieListSkeleton length={50} />
      <MovieListSkeleton />
      <MovieListSkeleton length={50} />
    </>
  );
}
