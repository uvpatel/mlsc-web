"use client";


import { Contact } from './components/ContactUs';
import Hero from './components/Hero';
import { Events } from './components/Events';
import NavbarLayer from './components/Navbar';
import Team from './components/Team';
import Timeline from './components/xteam';
import { About } from './components/About';
import Footer from "@/app/components/Footer"
function page() {
    return (
        <div>
            <NavbarLayer/>
            <Hero />
            <About />
            <Team />
            <Timeline />
            <Events />
            <Contact />
            <Footer />

        </div>
    )
}

export default page


