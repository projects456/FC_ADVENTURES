import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { phoneNumber } from '@/lib/data';

const merchItems = [
    {
        id: 't-shirt',
        title: 'T-shirt',
        description: 'Wear the Adventure',
        tagline: '"Drip Loading..."',
        image: PlaceHolderImages.find(img => img.id === 'merch-tshirt'),
    },
    {
        id: 'hoodie',
        title: 'Hoodie',
        description: 'Nganya Mode: Activated',
        tagline: '"Adventure Cozy"',
        image: PlaceHolderImages.find(img => img.id === 'merch-hoodie'),
    },
    {
        id: 'cap',
        title: 'Cap',
        description: 'Drip Loading...',
        tagline: '"Be Sun Smart"',
        image: PlaceHolderImages.find(img => img.id === 'merch-cap'),
    },
    {
        id: 'big-5',
        title: 'Big 5',
        description: 'The Ultimate Collection',
        tagline: '"Wear the Wild"',
        image: PlaceHolderImages.find(img => img.id === 'merch-big5'),
    }
];


export default function ShopPage() {
    const waitlistLink = `https://wa.me/${phoneNumber}?text=Hi!%20I'd%20like%20to%20join%20the%20WhatsApp%20waitlist%20for%20your%20merch!`;

    return (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary inline-flex items-center gap-4">
                    Adventure Merch Drops <Flame className="h-12 w-12 text-accent" />
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Get ready for exclusive FC Adventures gear!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {merchItems.map(item => item.image && (
                    <Card key={item.id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col text-center">
                        <div className="bg-card p-6 relative">
                             <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 border-yellow-500">
                                Dropping Soon
                            </Badge>
                            <Image
                                src={item.image.imageUrl}
                                alt={item.image.description}
                                width={200}
                                height={200}
                                className="mx-auto group-hover:scale-105 transition-transform duration-500"
                                data-ai-hint={item.image.imageHint}
                            />
                        </div>
                        <CardContent className="p-6 flex-grow flex flex-col justify-center">
                            <h3 className="font-headline text-2xl font-bold mb-2 text-primary">{item.title}</h3>
                            <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                            <p className="text-sm italic text-muted-foreground/80 mt-2">{item.tagline}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-accent/80 text-accent-foreground rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl">
                 <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                    Be the first to grab the drip!
                </h2>
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-lg px-8 py-6 mt-4">
                    <Link href={waitlistLink} target="_blank" rel="noopener noreferrer">
                        Join WhatsApp Waitlist
                    </Link>
                </Button>
            </div>
        </div>
    );
}
