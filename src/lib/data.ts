
import { Home, Compass, Image as ImageIcon, Info, Phone, ShoppingCart } from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/trips', label: 'Trips', icon: Compass },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/shop', label: 'Shop', icon: ShoppingCart },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
];

const FC_ADVENTURES_WHATSAPP_NUMBER = '254116302317'; // Main contact

export type Adventure = {
  title: string;
  description: string;
  icon: 'Calendar' | 'Users' | 'Shirt';
  images: string[];
  whatsappUrl: string;
  buttonText: string;
  startDate?: string;
};


export const adventures: Adventure[] = [
  {
    title: 'Weekend Getaways',
    description: 'Perfect short escapes from the city hustle',
    icon: 'Calendar',
    images: ['card-hiking-1', 'card-hiking-2', 'card-hiking-3'],
    whatsappUrl: `https://wa.me/254116302317?text=I'm%20interested%20in%20your%20Weekend%20Getaways!`,
    buttonText: 'Explore Getaways'
  },
  {
    title: 'Sato For The Boys',
    description: 'Adventure-packed trips designed for groups',
    icon: 'Users',
    images: ['card-safari-1', 'card-safari-2', 'card-safari-3'],
    whatsappUrl: `https://wa.me/254757574262?text=I'm%20interested%20in%20Sato%20For%20The%20Boys!`,
    buttonText: 'Join The Group'
  },
  {
    title: 'Jersey Editions (25/26)',
    description: 'Exclusive trips with our limited edition jerseys',
    icon: 'Shirt',
    images: ['card-camping-1', 'card-camping-2', 'card-camping-3'],
    whatsappUrl: `https://wa.me/254793990454?text=I'm%20interested%20in%20the%20Jersey%20Editions!`,
    buttonText: 'Get The Jersey'
  },
];

export const trips = [
  {
    slug: 'mount-longonot-hike',
    title: 'MT. LONGONOT HIKE',
    description: 'A thrilling hike up Mt. Longonot, a stratovolcano in the Great Rift Valley.',
    price: 'KES 1,850 per person',
    date: 'October 11, 2025',
    status: 'Available',
    image: 'longonot-detail',
    inclusions: [
      'Round trip transport from Nairobi CBD',
      'Park entry fees',
      'Professional guide',
      'Bottled water',
      'Snacks',
    ],
    exclusions: ['Tips and gratuities', 'Personal items'],
    mapQuery: 'Mount Longonot, Kenya',
  },
  {
    slug: 'kanunga-fourteen-falls',
    title: 'Kanunga falls • Fourteen falls - Waterfall Marathon',
    description: 'A marathon adventure to two of Kenya\'s most scenic waterfalls.',
    price: 'KES 2,500 per person',
    date: 'Coming soon',
    status: 'Coming soon',
    image: 'waterfall-detail',
    inclusions: [],
    exclusions: [],
    mapQuery: 'Fourteen Falls, Kenya',
  },
  {
    slug: 'samburu-national-reserve',
    title: 'Samburu National Reserve',
    description: 'A wild adventure in Samburu, famous for its wildlife and culture.',
    price: 'Price: Check back soon',
    date: 'Coming soon',
    status: 'Coming soon',
    image: 'samburu-detail',
    inclusions: [],
    exclusions: [],
    mapQuery: 'Samburu National Reserve, Kenya',
  }
];

export const phoneNumber = FC_ADVENTURES_WHATSAPP_NUMBER;
