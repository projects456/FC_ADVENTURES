import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const WobblyCard = ({ imageId, alt, hint, className }: { imageId: string, alt: string, hint: string, className?: string }) => {
    const image = PlaceHolderImages.find(img => img.id === imageId);
    if (!image) return null;

    return (
        <Card className={`overflow-hidden shadow-lg rounded-xl transition-transform duration-500 ease-in-out ${className}`}>
            <Image
                src={image.imageUrl}
                alt={alt}
                width={500}
                height={500}
                className="object-cover w-full h-auto"
                data-ai-hint={hint}
            />
        </Card>
    );
}

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'about-hero');

  return (
    <div className="animate-fade-in">
        <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center text-center text-white">
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
                Our Story
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
                The adventure behind the adventures.
            </p>
            </div>
      </section>

      <div className="container mx-auto px-4 py-16">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
                <h2 className="font-headline text-4xl font-bold text-primary">Who We Are</h2>
                <div className="space-y-4 text-lg text-foreground/80">
                    <p>
                        FC ADVENTURES, fondly known as the "Father Christmas squad," started with a simple idea: to share the joy of exploration and the beauty of Kenya with everyone. We are a team of passionate travelers, expert guides, and vibe masters dedicated to creating unforgettable experiences.
                    </p>
                    <p>
                        Our journey began with a small group of friends organizing road trips, and it has since grown into a thriving community of adventurers.
                    </p>
                </div>
            </div>
            <div className="relative h-96 w-full">
                <WobblyCard imageId="about-image-2" alt="Adventure moment" hint="friends group photo" className="absolute top-0 left-0 w-3/4 animate-wobble-1" />
                <WobblyCard imageId="about-image-1" alt="Team photo" hint="team photo" className="absolute bottom-0 right-0 w-3/4 animate-wobble-2" />
            </div>
        </div>
      </div>
    </div>
  );
}
