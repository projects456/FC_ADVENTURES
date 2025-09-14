'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Countdown from '@/components/home/countdown';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import VideoPlayer from './video-player';

const typewriterPhrases = ['Next Stop: Mt. Longonot Hike'];

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-1');
  const nextTripDate = new Date('2025-10-11T00:00:00');

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);

  useEffect(() => {
    if (isTyping) {
      const handleTyping = () => {
        const currentPhrase = typewriterPhrases[phraseIndex];
        setText(currentPhrase.substring(0, text.length + 1));

        if (text === currentPhrase) {
          setTimeout(() => {
            setIsTyping(false);
            setShowVideo(true);
          }, 1000);
        }
      };

      const typingSpeed = 100;
      const timer = setTimeout(handleTyping, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [text, isTyping, phraseIndex]);

  const handleVideoEnd = () => {
    setHideVideo(true);
    setTimeout(() => {
      setIsVideoFinished(true);
    }, 500); // Corresponds to the fade-out duration
  };

  return (
    <section className="relative h-[100vh] min-h-[700px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className={cn(
              'object-cover transition-all duration-1000',
              !isVideoFinished ? 'blur-md scale-110' : 'blur-none scale-100'
            )}
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4">

        {/* Typewriter Text */}
        <div className={cn(
            "absolute transition-all duration-1000 ease-in-out",
            isTyping ? "top-1/2 -translate-y-1/2" : "top-28 md:top-36",
            isVideoFinished && "top-1/2 -translate-y-28"
        )}>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-shadow-lg">
                {isTyping ? text : typewriterPhrases[0]}
                {isTyping && <span className="animate-ping">|</span>}
            </h1>
        </div>
        
        {/* Video Player */}
        <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 w-[90%] md:w-[60%] lg:w-[50%] max-w-4xl",
            showVideo && !hideVideo ? "opacity-100 scale-100" : "opacity-0 scale-90",
            hideVideo && "opacity-0 -translate-y-full"
        )}>
           <VideoPlayer onEnded={handleVideoEnd} videoSrc="/videos/Home/mt.longonot.mp4" />
        </div>

        {/* Countdown and Button */}
        <div className={cn(
            "flex flex-col items-center gap-6 transition-opacity duration-1000 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-50px]",
            isVideoFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
            <Countdown date={nextTripDate} />
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full text-lg px-8 py-6">
                 <Link href="/trips/mount-longonot-hike">Book Now</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
