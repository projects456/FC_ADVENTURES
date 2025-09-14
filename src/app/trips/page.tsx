import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { trips } from '@/lib/data';
import Link from 'next/link';

export default function TripsPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'trips-hero');

  return (
    <div className="animate-fade-in">
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-shadow-lg">
            Find Your Next Adventure
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Explore our 3 headline trips.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Upcoming Trips
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {trips.map((trip) => {
            const tripImage = PlaceHolderImages.find(img => img.id === trip.image);
            const isFeatured = trip.slug === 'mount-longonot-hike';
            return (
              <Card key={trip.slug} className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full bg-card ${isFeatured ? 'lg:scale-110 lg:z-10' : ''}`}>
                {tripImage && (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={tripImage.imageUrl}
                      alt={tripImage.description}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={tripImage.imageHint}
                    />
                  </div>
                )}
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="font-headline text-xl font-bold mb-2 text-primary">{trip.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-3">{trip.description}</p>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">{trip.date}</p>
                  <p className="text-base font-bold text-accent mb-4">{trip.price}</p>
                  <Button asChild className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold">
                    <Link href={`/trips/${trip.slug}`}>
                      Explore
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
