'use client';

import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  onEnded: () => void;
  videoSrc: string;
};

export default function VideoPlayer({ onEnded, videoSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', onEnded);
      return () => {
        video.removeEventListener('ended', onEnded);
      };
    }
  }, [onEnded]);

  return (
    <div className="aspect-video w-full bg-black/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden p-2 border border-white/10">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        autoPlay
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
