import Image from 'next/image';
import { notFound } from 'next/navigation';
import { trips } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MapPin, XCircle, ArrowLeft, Calendar, Tag } from 'lucide-react';
import BookingForm from '@/components/trips/booking-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return trips.map((trip) => ({
    slug: trip.slug,
  }));
}

const GoogleMapEmbed = ({ query }: { query: string }) => (
    <iframe
        className="w-full h-80 rounded-lg border"
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
    ></iframe>
);


export default function TripDetailPage({ params }: Props) {
  const trip = trips.find((t) => t.slug === params.slug);

  if (!trip) {
    notFound();
  }

  const heroImage = PlaceHolderImages.find(img => img.id === trip.image);

  return (
    <div className="animate-fade-in">
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-end text-white">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 p-8 container mx-auto">
           <Button asChild variant="ghost" className="mb-4 bg-black/30 hover:bg-black/50 text-white">
            <Link href="/trips">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Trips
            </Link>
          </Button>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            {trip.title}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">About the Trip</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground mb-6">{trip.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-semibold">Date</p>
                                <p className="text-muted-foreground">{trip.date}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <Tag className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-semibold">Price</p>
                                <p className="text-muted-foreground">{trip.price}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {trip.inclusions.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">What's Excluded</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2">
                            {trip.exclusions.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <XCircle className="h-5 w-5 text-red-500 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Location(s)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {trip.slug === 'kanunga-fourteen-falls' ? (
                  <>
                    <div>
                      <h3 className="font-semibold mb-2">Kanunga Falls</h3>
                      <GoogleMapEmbed query="Kanunga Falls, Kiambu" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Fourteen Falls</h3>
                      <GoogleMapEmbed query="Fourteen Falls, Thika" />
                    </div>
                  </>
                ) : (
                    <GoogleMapEmbed query={trip.mapQuery} />
                )}
              </CardContent>
            </Card>

          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-28 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-center">{trip.slug !== 'mount-longonot-hike' ? 'Inquire About This Trip' : 'Book This Trip'}</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm tripTitle={trip.title} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
