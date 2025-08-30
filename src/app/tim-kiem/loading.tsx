import MovieListSkeleton from "../components/Skeleton/MovieListSkeleton";
import { limit } from "../constants/pagination";

export default function SearchLoading() {
  return <MovieListSkeleton length={limit} />;
}
