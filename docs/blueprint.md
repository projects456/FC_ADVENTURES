# **App Name**: FC_ADVENTURES

## Core Features:

- Homepage Animation Sequence: Orchestrates a visually engaging sequence on the homepage, including typewriter text, video reveal, calendar-style countdown, and image transition effects, enhancing user engagement.
- Adventure Cards with WhatsApp Redirects: Implements interactive cards for adventure categories, each featuring a sliding image carousel and a WhatsApp redirect link pre-filled with interest information, simplifying user bookings.
- Trip Details Page with Interactive Map: Creates a detailed trip page with key information (dates, prices, inclusions), integrates a Google Maps display for location, and includes a booking form that generates a WhatsApp message with user inputs, streamlining reservations.
- Image Gallery Pinterest Layout: Displays road trip images in a dynamic Pinterest-style layout that adjusts to various screen sizes, and supports lazy loading.
- Glassy Navbar with Bubbly Animation: Designs a distinctive floating glass-style navbar with a dynamic bubble animation and separated sections for branding, navigation, and booking CTA, elevating the site’s visual appeal.
- Savannah Vibe Color Palette: Uses a tool to analyze color choices for CTAs and key elements, to fit with a warm, inviting savanna-themed color palette that reflects the Kenyan landscape and adventurous spirit.
- Background Music and PWA Integration: Incorporates a subtle background music player for consistent site ambiance, combined with PWA functionality enabling users to install the site as a mobile app, enhancing user accessibility and engagement.
- 📲 PWA Capabilities: When we make it installable as a Progressive Web App (PWA), FC_ADVENTURES will behave like a real app from the Play Store/App Store: 1. **Installable App** - Visitors can tap *“Add to Home Screen”* → FC_ADVENTURES icon (your logo/nganya art) appears on their phone. - Launches in **standalone mode** (no browser bar, no address bar, fullscreen). 2. **Offline Support** - Basic shell (nav, hero image, logo, offline message) is cached. - Even if data (images/maps) fails, the app won’t crash — it shows fallback content. 3. **Background Sync** (Optional v2) - If someone fills a booking form offline, it queues and sends the WhatsApp redirect once the device is online. 4. **Push Notifications** (Future v2) - We can ping people: “⛰️ Don’t miss the Mt. Longonot trip – 2 days left!”. 5. **App-Like Animations** - Smooth page transitions (slide in/out like Android/iOS). - Bottom-sheet modals for booking → feels native. 6. **Fast Loading** - Assets cached (images, CSS, JS). - Loads instantly after first visit. 7. **Full-Screen Immersion** - No browser chrome (bars). - Feels like a dedicated adventure booking app.
- 🧭 Nav Bar Layout (App Style): You don’t want a bulky “website nav”, you want a **small glassy bar** that feels like an Android/iOS dock. Here’s how it will look: ### Structure - **Floating Glass Bar** → not touching top/bottom, centered horizontally (like a nav dock). - **Glassy/Blurred Background** → frosted glass effect with moving bubble animation inside. - **3 Segments (mini bars)** inside the dock: 1. **Left:** Logo + “FC_ADVENTURES” text → slightly blurred overlay. 2. **Center:** Nav links (Home, Trips, Gallery, About, Contact). 3. **Right:** “Book Now” button → special brown/yellow (savannah vibez). ### Behavior - **Mobile:** shrinks to a bottom nav dock with just icons (🏠, 🏞️, 🖼️, ℹ️, 📞). - **Desktop:** floats top-center, wider, with text labels. - **Hover/Tap Animation:** slight bubble ripple effect when pressed. - **Scroll Behavior:** - Scroll down → nav bar hides. - Scroll up → nav bar slides back in (like mobile Chrome/iOS Safari).
- 🎨 Styling: - **Shape:** Rounded pill/lozenge, semi-transparent, soft shadow. - **Colors:** Frosted glass white with hints of savannah brown/orange bubble glow. - **Animation:** A slow-moving liquid bubble inside the glass bar → gives “alive” feel. --- 👉 In short: - The **PWA makes it act like an installable mini-app** (fast, offline-ready, immersive). - The **nav bar is a floating glassy dock**, small, app-like, adaptive to mobile vs desktop.

## Style Guidelines:

- Primary color: Earthy Brown (#A67B5B), evokes feelings of warmth and nature.
- Background color: Light Beige (#F5F5DC), a desaturated, brighter tint of the primary that ensures a clean, non-distracting backdrop.
- Accent color: Sunset Orange (#FF8040), an analogous hue that stands out for interactive elements, yet is aligned with the visual concept.
- Headline font: 'Playfair', a modern sans-serif with a fashionable, high-end feel.
- Body font: 'PT Sans', a humanist sans-serif that offers a blend of modernity and approachability.
- Note: currently only Google Fonts are supported.
- Use custom icons that evoke a sense of adventure and travel.
- Ensure a responsive layout that adapts to various screen sizes.
- Implement smooth transitions and subtle animations to enhance user experience.