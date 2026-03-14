import {Suspense} from "react";
import EventDetails from "@/components/EventDetails";

const EventDetailsPage = ({ params }: { params: Promise<{ slug: string }>}) => {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <EventDetails params={params} />
            </Suspense>
        </main>
    )
}
export default EventDetailsPage