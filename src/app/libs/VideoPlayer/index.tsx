"use client";
import React from "react";
import VideoJS from "./videoJS";

export default function VideoPlayer({
  src,
  poster,
  wrapperClassName,
}: {
  src: string;
  poster?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <VideoJS
        options={{
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          playsinline: true,
          aspectRatio: "16:9",
          sources: [
            {
              src,
              type: "application/x-mpegURL",
            },
          ],
          poster,
        }}
      />
    </div>
  );
}
