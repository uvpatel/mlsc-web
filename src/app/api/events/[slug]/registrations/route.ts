import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/db/db";
import { Registration } from "@/models/registration.model";
import Event from "@/models/event.model";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    await ConnectDB();
    const resolvedParams = await context.params;
    
    const event = await Event.findOne({ slug: resolvedParams.slug });
    if (!event) {
       return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Populate user details to fetch all registrations with user info
    const registrations = await Registration.find({ eventId: event._id })
        .populate('userId', 'username email year mobileno idno github department')
        .sort({ createdAt: -1 });

    return NextResponse.json({ registrations }, { status: 200 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}
