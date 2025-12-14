"use client";

import dynamic from 'next/dynamic';
import Hero from './components/Hero';

// Lazy load components that aren't immediately visible
const About = dynamic(() => import('./components/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

const Team = dynamic(() => import('./components/Team'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

const Timeline = dynamic(() => import('./components/xteam'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

const Events = dynamic(() => import('./components/Events').then(mod => ({ default: mod.Events })), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

const Contact = dynamic(() => import('./components/ContactUs').then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

const Footer = dynamic(() => import('@/app/components/Footer'), {
  loading: () => <div className="py-8">Loading...</div>
});

function Page() {
  return (
    <div>
      <Hero />
      <About />
      <Team />
      <Timeline />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}

export default Page;