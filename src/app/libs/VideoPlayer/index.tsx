"use client";
import React from "react";
import VideoJS from "./videoJS";
import "videojs-hotkeys";

export default function VideoPlayer({
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
        aspectRatio: "16:9",
        sources: [
          {
            src,
            type: "application/x-mpegURL",
          },
        ],
        poster,
        plugins: {
          hotkeys: { volumnStep: 0.1, seekStep: 5 },
        },
      }}
    />
  );
}
