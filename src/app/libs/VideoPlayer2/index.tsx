"use client";
import React from "react";
import VideoJS from "./videoJS";

export default function VideoPlayer2({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  return (
    <VideoJS
      options={{
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        playsinline: true,
        sources: [
          {
            src,
            type: "application/x-mpegURL",
          },
        ],
        poster,
      }}
    />
  );
}
