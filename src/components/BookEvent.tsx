'use client';

import {useState , useEffect} from "react";
import {createBooking} from "@/actions/booking.actions";
import posthog from "posthog-js";

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string;}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoaded , setIsLoaded] = useState(false)

    // load state from local storage on mount
    useEffect(() => {
        const storedData = localStorage.getItem(`booking_${eventId}`);
        if (storedData) {
            try {
                const { email: storedEmail, submitted: storedSubmitted } = JSON.parse(storedData);
                if (storedEmail) setEmail(storedEmail);
                if (storedSubmitted) setSubmitted(storedSubmitted);
            } catch (error) {
                console.error("Error parsing stored booking data:", error);
            }
        }
        setIsLoaded(true);
    }, [eventId]);


     // Save state to local storage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(`booking_${eventId}`, JSON.stringify({ email, submitted }));
        }
    }, [email, submitted, eventId, isLoaded]);

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { success } = await createBooking({ eventId, slug, email });

        if(success) {
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, slug, email })
        } else {
            console.error('Booking creation failed')
            posthog.captureException('Booking creation failed')
        }
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ): (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <button type="submit" className="button-submit">Submit</button>
                </form>
            )}
        </div>
    )
}
export default BookEvent