"use client";

import { Episode } from "@/app/types/movie";
import { cn } from "@/app/utils/cn";
import { useRouter } from "@bprogress/next/app";
import { useParams, useSearchParams } from "next/navigation";

interface ListEpisodeProps {
  datas: Episode[];
}

export default function ListEpisode({ datas }: ListEpisodeProps) {
  const urlSearchParams = useSearchParams();
  const { slug } = useParams();
  const router = useRouter();

  const server = urlSearchParams.get("server");
  const episode = urlSearchParams.get("episode");

  const data = datas.find((data) => data.server_name === server) || datas[0];

  const episodeData =
    data.server_data.find((data) => data.slug === episode) ||
    data.server_data[0];

  const handleClick = (episode: string) => {
    if (episodeData.slug === episode) return;
    const searchParams = new URLSearchParams(urlSearchParams.toString());
    searchParams.set("episode", episode);
    router.replace(`/xem-phim/${slug}?${searchParams.toString()}`);
  };

  return (
    <>
      {data?.server_data.map((data, i, array) => (
        <button
          type="button"
          key={i}
          onClick={() => handleClick(data.slug)}
          className={cn(
            "text-center overflow-hidden overflow-ellipsis whitespace-nowrap p-1 rounded-lg shadow-md bg-gray-400 text-gray-50 hover:bg-violet-500 dark:bg-slate-600 dark:hover:bg-violet-600",
            episodeData.slug === data.slug && "bg-violet-500 dark:bg-violet-600"
          )}
        >
          {array.length > 1 ? `Tập ${data.name}` : data.name}
        </button>
      ))}
    </>
  );
}
