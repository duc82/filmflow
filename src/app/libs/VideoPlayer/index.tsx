"use client";
import "plyr-react/plyr.css";
import Hls from "hls.js";
import { Options } from "plyr";
import CustomPlyrInstance from "./CustomPlyrInstance";

export default function VideoPlayer({
  hlsSource,
  videoOptions,
  poster,
  containerClassName,
}: {
  hlsSource: string;
  videoOptions?: Options;
  poster?: string;
  containerClassName?: string;
}) {
  const supported = Hls.isSupported();

  return (
    <div className={containerClassName}>
      {supported ? (
        <CustomPlyrInstance
          source={null}
          options={videoOptions}
          hlsSource={hlsSource}
          poster={poster}
        />
      ) : (
        "HLS is not supported in your browser"
      )}
    </div>
  );
}
