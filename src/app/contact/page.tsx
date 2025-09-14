import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "@/components/trips/booking-form";
import { Mail, Phone, Instagram } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { phoneNumber } from "@/lib/data";

const contactNumbers = [
    { number: '+254116302317' },
    { number: '+254757574262' },
    { number: '+254793990454' },
]

export default function ContactPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'contact-hero');
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
                Get In Touch
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
                We'd love to hear from you.
            </p>
            </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl text-primary font-bold">Contact Information</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a question or ready to book your next adventure? Reach out to us through any of the channels below.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
                {contactNumbers.map(({ number }) => (
                    <Link key={number} href={`https://wa.me/${number.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                         <Card className="hover:bg-card/80 transition-colors">
                            <CardHeader className="flex-row items-center gap-4">
                                <Phone className="w-8 h-8 text-primary" />
                                <CardTitle className="font-headline text-2xl">Call or WhatsApp</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-muted-foreground">{number}</p>
                                <p className="text-sm">Available 8am - 6pm (EAT)</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                <Link href="mailto:ridenasisi@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Card className="hover:bg-card/80 transition-colors">
                        <CardHeader className="flex-row items-center gap-4">
                            <Mail className="w-8 h-8 text-primary" />
                            <CardTitle className="font-headline text-2xl">Email Us</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground">ridenasisi@gmail.com</p>
                            <p className="text-sm">We'll get back to you within 24 hours.</p>
                        </CardContent>
                    </Card>
                </Link>
                 <Link href="https://www.instagram.com/ride_na_sisi" target="_blank" rel="noopener noreferrer">
                    <Card className="hover:bg-card/80 transition-colors">
                        <CardHeader className="flex-row items-center gap-4">
                            <Instagram className="w-8 h-8 text-primary" />
                            <CardTitle className="font-headline text-2xl">Instagram</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground hover:text-primary">
                            @ride_na_sisi
                            </p>
                            <p className="text-sm">Follow us for updates and photos!</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-center">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <BookingForm tripTitle="General Inquiry" />
                </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}