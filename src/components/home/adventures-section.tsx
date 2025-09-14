import { adventures } from '@/lib/data';
import AdventureCard from './adventure-card';

export default function AdventuresSection() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-24 mt-20">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Explore Our Adventures
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover unforgettable experiences tailored for every type of adventurer.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {adventures.map((adventure, index) => (
          <AdventureCard key={index} adventure={adventure} />
        ))}
      </div>
    </section>
  );
}
