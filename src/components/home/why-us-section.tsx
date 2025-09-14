import { MapPin, Heart, Leaf } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Expert Local Guides',
    description: "Our experienced guides know Kenya's hidden gems and ensure your safety while maximizing your adventure.",
  },
  {
    icon: Heart,
    title: 'Authentic Experiences',
    description: 'We connect you with local communities and provide genuine cultural interactions that go beyond typical tourism.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Tourism',
    description: "We're committed to responsible travel that supports local communities and preserves Kenya's natural beauty.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            WHY US
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            What makes our adventures truly special and unforgettable
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-5 mb-4">
                <div className="bg-primary/20 rounded-full p-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-headline text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
