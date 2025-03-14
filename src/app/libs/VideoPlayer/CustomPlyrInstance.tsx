"use client";
import { APITypes, PlyrProps, usePlyr } from "plyr-react";
import { RefObject, useRef } from "react";
import useHls from "./useHls";

interface CustomPlyrInstanceProps extends PlyrProps {
  hlsSource: string;
  poster?: string;
}

const CustomPlyrInstance = (props: CustomPlyrInstanceProps) => {
  const ref = useRef<APITypes>(null);
  const { source, options = null, hlsSource, poster } = props;

  const raptorRef = usePlyr(ref, {
    ...useHls(hlsSource, options),
    source,
  }) as RefObject<HTMLVideoElement>;

  return (
    <video
      ref={raptorRef}
      className="plyr plyr-react"
      playsInline
      data-poster={poster}
      controls
    />
  );
};

export default CustomPlyrInstance;
