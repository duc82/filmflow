import MovieListSkeleton from "@/app/components/Skeleton/MovieListSkeleton";
import { limit } from "@/app/constants/pagination";

export default function CategoryLoading() {
  return <MovieListSkeleton length={limit} />;
}
