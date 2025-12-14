"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader"; // Your LogoAnimation loader

export default function LoaderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Adjust time to match your logo animation length (~4–5 seconds)
        const timer = setTimeout(() => setLoading(false), 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && <Loader />}
            <div
                className={`transition-opacity duration-1000 ease-out ${loading ? "opacity-0" : "opacity-100"
                    }`}
            >
                {children}
            </div>
        </>
    );
}