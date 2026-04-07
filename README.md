# Microsoft Learn Student Club Website

This repository contains the MLSC website for BVM Engineering College. It is a `Next.js` App Router application that combines:

- a public landing page for the club
- a student registration form
- event data stored in MongoDB
- event detail pages
- API routes for users, events, and event registration

This README explains the project as it is currently implemented in the codebase.

## What The App Does

The site is primarily a club website with a polished, animation-heavy frontend.

Current user-facing flows:

- `/` renders the main landing page
- `/register` renders a full user registration form
- `/events/[slug]` renders an event details page from MongoDB

The landing page is assembled from lazily loaded sections:

- `Hero`
- `About`
- `Team`
- historical event timeline/gallery
- contact section
- footer

## Tech Stack

- Framework: `Next.js 16` with App Router
- Language: `TypeScript`
- Styling: `Tailwind CSS 4`
- Forms: `react-hook-form` + `zod`
- Database: `MongoDB` + `Mongoose`
- Media upload: `Cloudinary`
- Analytics: `PostHog`
- Animation/UI: `framer-motion`, `gsap`, custom UI components

## Project Structure

```text
src/
  app/
    api/                  API routes
    components/           landing-page sections
    events/[slug]/        event details route
    register/             generic registration page
    layout.tsx            root layout, providers, fonts
    page.tsx              landing page entry

  actions/                server actions for events/bookings
  components/             reusable app-level components
  db/                     Mongo connection logic
  lib/                    shared utilities such as axios instance
  models/                 Mongoose models
  schema/                 Zod validation schemas
  types/                  global types

scripts/
  seedEvents.ts           sample event seeder
```

## Core Routes

### Pages

- `/`
  - Main landing page.
  - Built in [`src/app/page.tsx`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/app/page.tsx).
  - Uses `next/dynamic` to lazy-load most sections after the hero.

- `/register`
  - Generic club registration page.
  - Renders [`src/components/UserForm.tsx`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/components/UserForm.tsx).

- `/events/[slug]`
  - Dynamic event details page.
  - Fetches an event from MongoDB using server actions.
  - Also shows similar events based on overlapping tags.

### API

- `GET /api/users`
  - Paginated user listing with filtering and sorting.

- `POST /api/users`
  - Creates a new user after Zod validation.
  - Rejects duplicate `email`, `idno`, and `username`.

- `PUT /api/users`
  - Updates an existing user by `id`.

- `DELETE /api/users`
  - Deletes a user by `id`.

- `GET /api/events`
  - Returns all events sorted by newest first.

- `POST /api/events`
  - Creates an event from `multipart/form-data`.
  - Uploads the event image to Cloudinary.
  - Stores the Cloudinary URL in MongoDB.

- `GET /api/events/[slug]`
  - Returns one event by slug.

- `POST /api/events/[slug]/register`
  - Validates user data.
  - Creates the user if needed.
  - Creates a registration tied to the event.

- `GET /api/events/[slug]/register?email=...`
  - Checks whether a given email is already registered for that event.

## Data Model

### User

Defined in [`src/models/user.models.ts`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/models/user.models.ts).

Important fields:

- `username`
- `email`
- `year`
- `mobileno`
- `idno`
- `github`
- `department`

The model also adds indexes for:

- `email`
- `idno`
- `department`
- `department + year`

### Event

Defined in [`src/models/event.model.ts`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/models/event.model.ts).

Important fields:

- `title`
- `slug`
- `description`
- `overview`
- `image`
- `venue`
- `location`
- `date`
- `time`
- `mode`
- `audience`
- `agenda`
- `organizer`
- `tags`

The event model also:

- auto-generates the slug from the title
- normalizes date/time values
- indexes `slug`, `date + mode`, `tags`, and `createdAt`

### Registration

Defined in [`src/models/registration.model.ts`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/models/registration.model.ts).

Important fields:

- `eventId`
- `userId`
- `eventSlug`
- `status`

The key constraint is a unique compound index on `eventId + userId`, which prevents duplicate registrations for the same event.

## How Data Flows Through The App

### User registration

1. The client form in [`src/components/UserForm.tsx`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/components/UserForm.tsx) validates input with `react-hook-form` and `zod`.
2. It posts to `/api/users` through the shared axios client in [`src/lib/axios.ts`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/lib/axios.ts).
3. The API validates the payload again with the same Zod schema.
4. MongoDB uniqueness checks prevent duplicate email, username, or ID number.
5. On success, the UI stores a success state in `localStorage`.

### Event loading

1. The page route `/events/[slug]` renders [`src/components/EventDetails.tsx`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/components/EventDetails.tsx).
2. That component calls server actions from [`src/actions/event.actions.ts`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/actions/event.actions.ts).
3. The actions connect to MongoDB through [`src/db/db.ts`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/db/db.ts).
4. Similar events are fetched by matching shared tags.

### Event creation

1. `POST /api/events` receives form-data.
2. The image file is streamed to Cloudinary.
3. The returned `secure_url` is saved into the `Event` document.

## Environment Variables

The code currently reads these variables:

```env
MONGODB_URI=

# Cloudinary: use either CLOUDINARY_URL or the explicit credentials below
CLOUDINARY_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Referenced in the codebase, but not critical to current local flow
NEXT_PUBLIC_BASE_URL=
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Seeding Sample Events

There is a standalone seeder at [`scripts/seedEvents.ts`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/scripts/seedEvents.ts).

It inserts a sample event if an event with the same slug does not already exist.

Example:

```bash
npx tsx scripts/seedEvents.ts
```

## Important Implementation Notes

These are worth knowing before extending the project:

- The generic registration form is fully wired to `/api/users`.
- There is also a separate event-registration API at `/api/events/[slug]/register`.
- The reusable [`src/components/BookEvent.tsx`](/c:/Users/Admin/OneDrive/Desktop/MLSC/mlsc/src/components/BookEvent.tsx) component uses a server action for bookings, but it is not currently used by the event details page.
- The current event details page embeds `UserForm`, so the visible form behavior is closer to generic user registration than true event-specific registration.
- MongoDB connection reuse is handled through a cached global Mongoose connection, which is important for development hot reloads.
- `next.config.ts` includes PostHog proxy rewrites and remote image host allowlisting.

## Summary

In practical terms, this project is a club website built on Next.js with three main responsibilities:

- present MLSC content with a polished frontend
- collect student registrations
- manage and display event data from MongoDB

The backend structure is already in place for richer event registration, but the frontend currently mixes a general user signup flow with an event detail experience.
