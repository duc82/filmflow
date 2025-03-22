"use client";

import { Episode } from "@/app/types/movie";
import { cn } from "@/app/utils/cn";
import { useRouter } from "@bprogress/next/app";
import { useParams, useSearchParams } from "next/navigation";

interface ListServerProps {
  datas: Episode[];
}

export default function ListServer({ datas }: ListServerProps) {
  const urlSearchParams = useSearchParams();
  const { slug } = useParams();
  const router = useRouter();

  const server_name = urlSearchParams.get("server");
  const activeServer =
    datas.find((data) => data.server_name === server_name) || datas[0];

  const handleClick = (server: string) => {
    if (activeServer.server_name === server) return;
    const searchParams = new URLSearchParams(urlSearchParams.toString());
    searchParams.set("server", server);
    router.replace(`/xem-phim/${slug}?${searchParams.toString()}`);
  };

  return (
    <>
      {datas.map((episode, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleClick(episode.server_name)}
          className={cn(
            "py-2 px-3 text-white rounded-lg bg-gray-400 dark:bg-slate-600 hover:bg-red-500",
            !server_name
              ? i === 0 && "bg-red-500 dark:bg-red-500"
              : episode.server_name === server_name &&
                  "bg-red-500 dark:bg-red-500"
          )}
        >
          {episode.server_name}
        </button>
      ))}
    </>
  );
}
