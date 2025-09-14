'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Countdown from "./countdown";
import Link from "next/link";
import { phoneNumber } from "@/lib/data";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";


const upcomingTrip = {
  day: 'Saturday',
  location: 'Mt. Longonot National Park, Kenya',
  title: 'MT.LONGONOT HIKE',
  description: 'A thrilling hike up Mt. Longonot, a stratovolcano in the Great Rift Valley. Experience breathtaking views, diverse wildlife, and the challenge of reaching the summit.',
  tripIncludes: [
    'Guided hike',
    'Park entry fees',
    'Snacks and water',
    'Professional photography'
  ],
  price: 'KSh 1,850',
  date: new Date('2025-10-11T00:00:00'),
  note: 'Saturday, October 11, 2025 • Limited spots available',
  bookingLink: `https://wa.me/${phoneNumber}?text=I'd%20like%20to%20book%20my%20spot%20for%20the%20Mt.%20Longonot%20Hike!`
};

export default function UpcomingTripSection() {
    const upcomingTripImage = PlaceHolderImages.find(img => img.id === 'upcoming-trip-image');

    return (
        <section className="bg-background py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                        Upcoming Trip
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Join us for an unforgettable journey to the summit
                    </p>
                </div>

                <Card className="p-8 md:p-12 bg-card shadow-lg rounded-xl max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div className="md:col-span-3">
                             {upcomingTripImage && (
                                <div className="mb-6 rounded-lg overflow-hidden">
                                <Image
                                    src={upcomingTripImage.imageUrl}
                                    alt={upcomingTripImage.description}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-auto"
                                    data-ai-hint={upcomingTripImage.imageHint}
                                />
                                </div>
                            )}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-background rounded-full text-sm font-medium">
                                    <Calendar className="w-4 h-4 text-muted-foreground"/>
                                    <span>{upcomingTrip.day}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4"/>
                                    <span>{upcomingTrip.location}</span>
                                </div>
                            </div>
                            <h3 className="font-headline text-4xl font-bold text-primary mb-3">{upcomingTrip.title}</h3>
                            <p className="text-muted-foreground mb-8">{upcomingTrip.description}</p>
                            
                            <div className="flex flex-col md:flex-row md:items-end justify-between">
                                 <div>
                                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Trip includes</p>
                                    <ul className="space-y-2">
                                        {upcomingTrip.tripIncludes.map((item, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <span className="w-2 h-2 bg-accent rounded-full"/>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 md:border-l md:pl-8 border-border/50 flex flex-col justify-between">
                           <div>
                             <Countdown date={upcomingTrip.date} variant="upcoming" />
                             <p className="text-xs text-muted-foreground mt-2">{upcomingTrip.note}</p>
                           </div>
                        </div>
                    </div>
                    <div className="border-t border-border/50 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="font-bold text-lg">{upcomingTrip.price} <span className="font-normal text-sm text-muted-foreground">per person</span></p>
                         <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg px-6">
                            <Link href={upcomingTrip.bookingLink} target="_blank" rel="noopener noreferrer">
                                Book Your Spot Now <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    );
}
