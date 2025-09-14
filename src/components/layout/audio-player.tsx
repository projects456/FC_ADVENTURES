'use client';

import { useRef, useEffect } from 'react';

type AudioPlayerProps = {
  src: string;
};

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        let audio = (window as any).__audio;
        if (!audio) {
            audio = new Audio(src);
            audio.loop = true;
            audio.volume = 0.1; // Low volume
            (window as any).__audio = audio;
        }
        audioRef.current = audio;

        const playAudio = () => {
            audioRef.current?.play().catch(error => {
                // Autoplay was prevented, we can log this for debugging
                console.log('Autoplay prevented:', error);
            });
        };

        // Attempt to play on mount
        playAudio();
        
        // Add event listeners to play on user interaction
        const events = ['click', 'keydown', 'touchstart'];
        events.forEach(event => window.addEventListener(event, playAudio, { once: true }));

        return () => {
            events.forEach(event => window.removeEventListener(event, playAudio));
        };
    }
  }, [src]);

  return null;
};

export default AudioPlayer;
