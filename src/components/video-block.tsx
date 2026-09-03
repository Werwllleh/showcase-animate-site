import { useInView } from "motion/react";
import {useEffect, useRef} from "react";

type VideoBlockProps = {
  src: string;
  poster?: string;
}

const VideoBlock = ({src, poster}:VideoBlockProps) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isInView) {
      videoElement.play()
    } else {
      videoElement.pause()
    }
  }, [isInView])

  return (
    <div className="sticky top-0 bg-emerald-500 h-dvh flex items-center justify-center text-emerald-950 font-bold shading overflow-hidden">
      <video ref={videoRef} className="w-full h-full object-cover" poster={poster} src={src} aria-label={"Видео блок"} preload={"auto"} muted playsInline={true} loop />
    </div>
  );
};

export default VideoBlock;