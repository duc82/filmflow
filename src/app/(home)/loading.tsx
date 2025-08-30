import HomeSkeleton from "../components/Skeleton/HomeSkeleton";
import { limit } from "../constants/pagination";

export default function HomeLoading() {
  return (
    <>
      <HomeSkeleton length={2} smLength={3} mdLength={4} lgLength={5} />
      <HomeSkeleton length={limit} />
      <HomeSkeleton length={2} smLength={3} mdLength={4} lgLength={5} />
      <HomeSkeleton length={limit} />
    </>
  );
}
