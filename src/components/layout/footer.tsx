import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ride_na_sisi' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-headline text-lg">FC_ADVENTURES</p>
            <p className="text-sm text-muted-foreground">Crafting unforgettable Kenyan journeys.</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FC_ADVENTURES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
