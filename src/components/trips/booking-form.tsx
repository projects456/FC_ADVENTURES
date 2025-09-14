'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { phoneNumber } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().regex(/^\d{10,13}$/, { message: 'Please enter a valid phone number.' }),
  bookingType: z.string().optional(),
  seats: z.coerce.number().min(1, { message: 'At least 1 seat is required.' }).optional(),
  message: z.string().optional(),
  expectedSeats: z.coerce.number().min(1, 'Please enter at least 1 seat.').max(5, 'Maximum of 5 seats allowed.').optional(),
  anticipatedSeats: z.coerce.number().min(1, 'Please enter at least 1 seat.').optional(),
});

type FormValues = z.infer<typeof formSchema>;

const offerPrices = {
  individual: 1850,
  couple: 3500,
  group: 9000,
};

export default function BookingForm({ tripTitle }: { tripTitle: string }) {
  const [total, setTotal] = useState(offerPrices.individual);
  const isGeneralInquiry = tripTitle === 'General Inquiry';
  const isWaterfallInquiry = tripTitle === 'Kanunga falls • Fourteen falls - Waterfall Marathon';
  const isSamburuInquiry = tripTitle === 'Samburu National Reserve';
  const isBooking = tripTitle === 'MT. LONGONOT HIKE';

  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      bookingType: isBooking ? 'individual' : undefined,
      seats: isBooking ? 1 : undefined,
      message: '',
      expectedSeats: isWaterfallInquiry ? 1 : undefined,
      anticipatedSeats: isSamburuInquiry ? 1 : undefined,
    },
  });

  const watchBookingType = form.watch('bookingType');
  const watchSeats = form.watch('seats');

  useEffect(() => {
    let newTotal = 0;
    if (!isBooking || !watchBookingType || !watchSeats) {
        setTotal(0);
        return;
    }
    switch (watchBookingType) {
      case 'individual':
        newTotal = watchSeats * offerPrices.individual;
        form.setValue('seats', Math.max(1, watchSeats));
        break;
      case 'couple':
        newTotal = offerPrices.couple;
        form.setValue('seats', 2);
        break;
      case 'group':
         newTotal = offerPrices.group;
         form.setValue('seats', 5);
        break;
    }
    setTotal(newTotal);
  }, [watchBookingType, watchSeats, form, isBooking]);

  function onSubmit(values: FormValues) {
    let message: string;
    let targetPhoneNumber = phoneNumber;

    if (isGeneralInquiry) {
        message = `General Inquiry:
Name: ${values.name}
Phone: ${values.phone}
Message: ${values.message}`;
    } else if (isWaterfallInquiry) {
        message = `Inquiry for "${tripTitle}":
Name: ${values.name}
Phone: ${values.phone}
Expected Seats: ${values.expectedSeats}`;
    } else if (isSamburuInquiry) {
        message = `Inquiry for "${tripTitle}":
Name: ${values.name}
Phone: ${values.phone}
Anticipated Seats: ${values.anticipatedSeats}`;
    } else if (isBooking) { // Specifically for Mt. Longonot
        message = `Hello! I'd like to book the "${tripTitle}" trip.
Booking Type: ${values.bookingType}
Seats: ${values.seats}
Name(s): ${values.name}
Phone: ${values.phone}
Total: KSh. ${total.toLocaleString()}`;
        targetPhoneNumber = '254116302317';
    } else { // Fallback for any other trip title that might appear
        message = `Inquiry about "${tripTitle}":
Name: ${values.name}
Phone: ${values.phone}`;
    }
    
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!isGeneralInquiry && (
            <div className="bg-muted/50 p-3 rounded-md text-center">
                <p className="font-bold text-primary">{tripTitle}</p>
                {isBooking && <p className="text-sm text-muted-foreground">Date: October 11, 2025</p>}
            </div>
        )}
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name(s)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Jomo Kenyatta, ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="07XXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isGeneralInquiry ? (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inquiry</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us how we can help..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : isWaterfallInquiry ? (
            <FormField
              control={form.control}
              name="expectedSeats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Booking Seats</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        ) : isSamburuInquiry ? (
            <FormField
              control={form.control}
              name="anticipatedSeats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anticipated Seats</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        )
        : isBooking ? (
          <>
            <FormField
              control={form.control}
              name="bookingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a booking type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="couple">Couple</SelectItem>
                      <SelectItem value="group">Group of 5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seats</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} disabled={watchBookingType !== 'individual'}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          // Fallback simple message for other trips
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any questions?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full">
          {isGeneralInquiry ? 'Send via WhatsApp' : isBooking ? `Book Now (Ksh ${total.toLocaleString()})` : 'Inquire Now'}
        </Button>
      </form>
    </Form>
  );
}
