'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
// import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { Button } from '@/components/ui/button';
import { Phone, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import BookingForm from '../trips/booking-form';

export default function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  // const scrollDirection = useScrollDirection();
  const [isBookingOpen, setIsBookingOpen] = useState(false);



  const navClass = cn(
    'fixed w-full max-w-6xl left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
    'rounded-full shadow-lg border border-white/20',
    'bg-black/30 backdrop-blur-lg',
    'flex items-center justify-between',
    isMobile
      ? 'bottom-4 h-18 px-4 w-[calc(100%-2rem)]'
      : 'top-4 h-20 px-6',
    'translate-y-0 opacity-100'
  );

  const handleBookNowClick = () => {
    setIsBookingOpen(true);
  };
  
  const bookButtonAction = isMobile ? { href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi!%20I'd%20like%20to%20book%20an%20adventure.` } : { onClick: handleBookNowClick };

  return (
    <>
      <header className="h-24 md:h-28">
        <nav className={navClass}>
          {!isMobile && (
            <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold text-white bg-black/30 px-4 py-2 rounded-full">
              <Image src="/logo/logo.jpg" alt="FC Adventures Logo" width={28} height={28} className="h-7 w-7 rounded-full" />
              FC ADVENTURES
            </Link>
          )}
          
          <div className={cn(
            "flex items-center bg-black/30 rounded-full",
            isMobile ? 'justify-around w-full h-[90%] p-1' : 'gap-1 p-2'
          )}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors relative group',
                    isMobile 
                      ? 'flex flex-col items-center gap-1 text-xs px-2 py-1 rounded-lg h-full justify-center'
                      : 'text-sm font-medium px-4 py-2 rounded-full',
                    isActive
                      ? 'text-accent'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  <link.icon className={cn("h-5 w-5", isActive ? "text-accent" : "text-white/70 group-hover:text-white")} />
                  <span className={isActive ? 'text-accent font-bold' : 'text-white/80'}>{link.label}</span>
                  {isActive && !isMobile && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent rounded-full" />
                  )}
                  {isActive && isMobile && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-accent rounded-full" />
                  )}
                </Link>
              )
            })}
            {isMobile && (
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi!%20I'd%20like%20to%20book%20an%20adventure.`} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-xs px-2 py-1 rounded-lg text-white/70 hover:text-white h-full justify-center">
                <Phone className="h-5 w-5" />
                <span className="text-white/80">Book</span>
              </a>
            )}
          </div>

          {!isMobile && (
            <Button {...bookButtonAction} asChild={!!(bookButtonAction as any).href} className="bg-accent hover:bg-accent/90 text-black font-bold rounded-full text-sm px-6 py-2 h-auto">
              {(bookButtonAction as any).href ? <a href={(bookButtonAction as any).href} target="_blank" rel="noopener noreferrer">BOOK NOW</a> : <span>BOOK NOW</span>}
            </Button>
          )}
        </nav>
      </header>
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="font-headline text-2xl text-center">Book This Trip</DialogTitle>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogHeader>
            <BookingForm tripTitle="MT. LONGONOT HIKE" />
        </DialogContent>
      </Dialog>
    </>
  );
}
