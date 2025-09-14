
'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Adventure } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Calendar, Users, Shirt } from 'lucide-react';

const iconMap = {
  Calendar: Calendar,
  Users: Users,
  Shirt: Shirt,
};

export default function AdventureCard({ adventure }: { adventure: Adventure }) {
  const images = adventure.images.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const Icon = iconMap[adventure.icon];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        {images.map((image, index) => image && (
          <Image
            key={image.id}
            src={image.imageUrl}
            alt={image.description}
            fill
            className={cn(
              'object-cover transition-opacity duration-1000 ease-in-out',
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={image.imageHint}
          />
        ))}
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
         <p className="absolute bottom-4 left-4 text-white text-sm font-light">{images[currentIndex]?.description}</p>
      </div>
      
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-start gap-4 mb-3">
            <Icon className="w-6 h-6 text-primary mt-1" />
            <div>
                <h3 className="font-headline text-xl font-semibold">{adventure.title}</h3>
            </div>
        </div>

        <p className="text-muted-foreground flex-grow mb-3">{adventure.description}</p>
        
        {adventure.startDate && (
            <p className="text-sm text-muted-foreground mb-4">Starts: {adventure.startDate}</p>
        )}

        <Button asChild className="w-full mt-auto bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-semibold border border-primary/20">
          <a href={adventure.whatsappUrl} target="_blank" rel="noopener noreferrer">
            {adventure.buttonText}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
