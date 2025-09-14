'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownUnit = ({ value, label, className }: { value: number, label: string, className?: string }) => (
  <div className={cn("flex flex-col items-center p-2 rounded-lg", className)}>
    <span className="text-3xl md:text-5xl font-bold font-headline">{String(value).padStart(2, '0')}</span>
    <span className="text-xs md:text-sm font-body uppercase tracking-widest">{label}</span>
  </div>
);

type CountdownProps = {
  date: Date;
  variant?: 'hero' | 'upcoming';
};

export default function Countdown({ date, variant = 'hero' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const difference = +new Date(date) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };
    
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const units = timeLeft ? [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    ...(variant === 'hero' ? [{ value: timeLeft.seconds, label: 'Seconds' }] : []),
  ] : [
    { value: 0, label: 'Days' },
    { value: 0, label: 'Hours' },
    { value: 0, label: 'Minutes' },
     ...(variant === 'hero' ? [{ value: 0, label: 'Seconds' }] : []),
  ];

  if (variant === 'hero') {
    return (
      <div className="bg-card/90 backdrop-blur-sm shadow-2xl rounded-2xl p-4 md:p-8 max-w-2xl mx-auto">
        <h3 className="text-center font-headline text-lg md:text-xl text-primary mb-4">Next Big Adventure Starts In:</h3>
        <div className="grid grid-cols-4 gap-2 md:gap-4 text-card-foreground">
          {units.map(unit => <CountdownUnit key={unit.label} value={unit.value} label={unit.label} />)}
        </div>
      </div>
    );
  }

  return (
    <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Departure in</p>
        <div className="flex gap-2 text-foreground">
            {units.map(unit => (
                <CountdownUnit 
                    key={unit.label} 
                    value={unit.value} 
                    label={unit.label} 
                    className="bg-background"
                />
            ))}
        </div>
    </div>
  );
}
