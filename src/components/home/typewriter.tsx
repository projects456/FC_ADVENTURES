'use client';

import { useState, useEffect } from 'react';

const phrases = ['Discover Kenya.', 'Climb Mountains.', 'Explore the Wild.', 'Create Memories.'];

export default function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <p className="font-body text-xl md:text-2xl text-white/90 h-8">
      {text}
      <span className="animate-ping">|</span>
    </p>
  );
}
