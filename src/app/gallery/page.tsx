import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-') && !img.id.endsWith('hero'));
  const heroImage = PlaceHolderImages.find(img => img.id === 'gallery-8');

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
              <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary text-white text-shadow-lg">
                Gallery of Adventures
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
                A glimpse into the unforgettable moments and breathtaking landscapes from our past trips.
              </p>
            </div>
      </section>
      <div className="container mx-auto px-4 py-16">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image) => (
            <div key={image.id} className="break-inside-avoid">
                <Card className="overflow-hidden group">
                <div className="aspect-w-1 aspect-h-1 relative">
                    <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={600}
                    height={800} // Approximate aspect ratio
                    className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={image.imageHint}
                    />
                </div>
                </Card>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
