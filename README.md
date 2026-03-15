# Microsoft Learn Student Club - BVM Engineering College

Welcome to the official repository for the **Microsoft Learn Student Club (MLSC)** at BVM Engineering College! 

This website serves as the primary gateway for students to learn about our community, explore upcoming events & workshops, meet the team members, and connect with us. It is built as a modern, high-performance web application tailored for a premium user experience utilizing detailed animations.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **UI Components**: [Aceternity UI](https://ui.aceternity.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Media Hosting**: [Cloudinary](https://cloudinary.com/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), [Tabler Icons](https://tabler.io/icons)

## 📁 Codebase Architecture

The project is structured around the `app` router paradigm with logical separation of concerns:

### `src/app`
The main visual interface and routing logic for the entire app.
- `page.tsx`: The landing page which dynamically assembles components like Hero, About, Team, Events timeline, and Contact info using lazy loading (`next/dynamic`).
- `layout.tsx`: Root layout providing global styling, fonts (`Geist` & `Geist Mono`), and the `LoaderWrapper` for the initial screen animation.
- `api/`: REST endpoints. Includes routes for:
  - `events/[slug]`: Finding, fetching details, and uploading new events (integrates with Cloudinary for image hosting).
  - `users`: CRUD operations for club members and users.
- `components/`: Landing page-specific components (`Hero.tsx`, `About.tsx`, `Team.tsx`, `Navbar.tsx`, `Events.tsx` etc.). Contains customized scrolling animations like `StickyScroll` and `Timeline`.

### `src/components`
Global reusable interface components that aren't specifically tied to the landing page index.
- `BookEvent.tsx`: A client component that handles event registrations, records user bookings, manages localStorage states, and utilizes Posthog for analytics.
- `EventCard.tsx` / `EventDetails.tsx`: Displays event information dynamically based on URL slugs.
- `ui/`: Holds reusable UI elements imported mostly from Aceternity and Shadcn (buttons, animated texts, timelines, inputs, etc.).

### `src/db`
Database configuration module.
- `db.ts`: Manages the MongoDB connection pool through Mongoose using the connection string defined in the `.env` file.

### `src/models`
Mongoose schema definitions defining the data structures within the MongoDB cluster.
- `event.model.ts`: Event definition schema tracking dates, agenda, venue details, generated URL slugs, tags, etc.
- `user.models.ts`: Defines generic user structures.
- `register.models.ts`: Used conceptually for tracking user signups/booking to events.

### `src/actions`
Next.js Server Actions enabling modern secure data-fetching without explicitly crafting API routes for every operation.
- `event.actions.ts`: Functions like `getAllEvents()` and `getSimilarEventsBySlug()` connecting directly with Mongoose in server-execution mode.
- `booking.actions.ts`: Contains the secure server-action `createBooking()` to register users for specific events safely.

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js installed. Creating a `.env` file in the root with valid config variables is required:
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# Cloudinary Keys (for creating/uploading event thumbnails)
# PostHog Keys (for tracking analytics)
```

### Installation
1. Clone the repository and install the dependencies:
```bash
npm install
```

2. Run the development server:
```bash
# Our scripts are configured to run with Turbopack for faster builds
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Design System
We leverage **Tailwind CSS** extended with custom complex animations. Many components utilize advanced CSS features via Aceternity UI, including encrypted-text reveals, dark animated veils (WebGL/Canvas via OGL), and complex timeline structures perfectly suited for an engineering club atmosphere prioritizing aesthetics.

## 💡 Contributing
Modifications to main landing sections should occur within `src/app/components/`. If adding new pages, follow the Next.js App Router `src/app/.../page.tsx` pattern and modularize complex client-side interactions within `src/components/`.

Your feedback and contributions are welcome! 🚀

posthog

'use client'

import { usePostHog } from 'posthog-js/react'

export default function CheckoutPage() {
    const posthog = usePostHog()

    function handlePurchase() {
        posthog.capture('purchase_completed', { amount: 99 })
    }

    return <button onClick={handlePurchase}>Complete purchase</button>
}