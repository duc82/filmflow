"use client";
import React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface VideoJSProps {
  options?: any;
  onReady?: (player: Player) => void;
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

export const VideoJS = (props: VideoJSProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<Player>(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        if (onReady) {
          onReady(player);
        }
      }));

      if (isAndroid()) {
        player.on("fullscreenchange", function () {
          if (player.isFullscreen()) {
            // Xoay màn hình ngang khi vào fullscreen
            if (screen.orientation && screen.orientation.lock) {
              screen.orientation.lock("landscape");
            }
          } else {
            // Mở khóa xoay khi thoát fullscreen
            if (screen.orientation && screen.orientation.unlock) {
              screen.orientation.unlock();
            }
          }
        });
      }

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
