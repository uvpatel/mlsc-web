import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/db/db";
import Event from '@/models/event.model';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        await ConnectDB();
        
        const params = await context.params;
        const slug = params.slug;

        const event = await Event.findOne({ slug });

        if (!event) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Event fetched successfully', event }, { status: 200 });
    } catch (e) {
        console.error("Error fetching event by slug:", e);
        return NextResponse.json({ message: 'Event fetching failed', error: e instanceof Error ? e.message : 'Unknown' }, { status: 500 });
    }
}
