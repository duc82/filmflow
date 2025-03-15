import MovieListSkeleton from "../components/Skeleton/MovieListSkeleton";

export default function HomeLoading() {
  return (
    <>
      <MovieListSkeleton length={2} smLength={3} mdLength={4} lgLength={5} />
      <MovieListSkeleton length={24} />
      <MovieListSkeleton length={2} smLength={3} mdLength={4} lgLength={5} />
      <MovieListSkeleton length={24} />
    </>
  );
}
