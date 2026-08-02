# Microsoft Learn Student Club — BVM Website

The community platform for Microsoft Learn Student Club at BVM Engineering College. It combines a polished public website with event discovery, registrations, member data, media uploads, and analytics.

[Live Website](https://mlsc-web-bvm.vercel.app/) · [Author](https://github.com/uvpatel)

## Overview

The project gives students one place to learn about the club, discover events, view event details, and register. Organisers can work with event and registration data through server actions and API routes.

## Features

- Responsive club landing page
- Hero, about, team, event timeline, gallery, contact, and footer sections
- Dynamic event pages using slugs
- Similar-event recommendations based on shared tags
- Student registration form with schema validation
- Event booking and registration persistence
- MongoDB-backed event and user data
- Cloudinary event-image uploads
- Paginated user listing with filtering and sorting
- PostHog product analytics
- Motion-rich UI with Framer Motion and GSAP
- Lazy-loaded landing-page sections

## Application Flow

~~~mermaid
flowchart LR
    A["Visitor"] --> B["Club Website"]
    B --> C["Events"]
    C --> D["Event Details"]
    D --> E["Registration"]
    E --> F[(MongoDB)]
    G["Organiser API"] --> F
    G --> H["Cloudinary"]
~~~

## Technology Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4 |
| Forms | React Hook Form, Zod |
| Database | MongoDB, Mongoose |
| Media | Cloudinary |
| Analytics | PostHog |
| Motion | Framer Motion, GSAP |
| Networking | Axios |

## Main Routes

| Route | Purpose |
| --- | --- |
| <code>/</code> | Main community landing page |
| <code>/register</code> | Student registration |
| <code>/events/[slug]</code> | Event details and related events |
| <code>/api/users</code> | User listing, creation, updates, and deletion |
| <code>/api/events</code> | Event listing and creation |

## Project Structure

~~~text
src/
├── app/
│   ├── api/
│   ├── events/[slug]/
│   ├── register/
│   ├── components/
│   └── page.tsx
├── actions/
├── components/
├── db/
├── models/
├── schema/
└── types/
scripts/
└── seedEvents.ts
~~~

## Getting Started

~~~bash
git clone https://github.com/uvpatel/mlsc-web.git
cd mlsc-web
npm install
~~~

Create <code>.env.local</code> with the services enabled in your deployment:

~~~env
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
~~~

Start the development server:

~~~bash
npm run dev
~~~

Open http://localhost:3000.

## Available Scripts

~~~bash
npm run dev
npm run build
npm run start
npm run lint
~~~

## Data Notes

- Event pages are loaded from MongoDB using a unique slug.
- Related events are found through overlapping tags.
- Registrations associate an email with an event ID and slug.
- API input is validated before user creation.
- Cloudinary stores uploaded event media.

## Security and Production Checklist

- Protect organiser-only API operations with authentication and authorisation.
- Validate upload type and size before sending files to Cloudinary.
- Add rate limiting to public registration endpoints.
- Keep database and Cloudinary credentials server-side.
- Add spam protection and duplicate-booking rules.
- Publish a privacy notice for student registration data.

## Roadmap

- Organiser authentication and admin dashboard
- Event capacity and waitlist support
- Confirmation emails and QR attendance
- Improved accessibility and automated testing
- CI checks for linting, type safety, and production builds

## Contribution

Issues and pull requests are welcome. Please keep changes focused, describe the motivation, and include screenshots for visual updates.

## Author

Built and maintained by [Urvil Patel](https://github.com/uvpatel) and the MLSC BVM team.
