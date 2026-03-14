import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/db/db";
import { User } from "@/models/user.models";
import { Registration } from "@/models/registration.model";
import Event from "@/models/event.model";
import { userRegistrationSchema } from "@/lib/validation/userSchema";

export async function POST(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    await ConnectDB();
    const resolvedParams = await context.params;
    const body = await req.json();

    const validationResult = userRegistrationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        message: "Validation failed", 
        errors: validationResult.error.format() 
      }, { status: 400 });
    }

    const userData = validationResult.data;

    const event = await Event.findOne({ slug: resolvedParams.slug });
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    let user = await User.findOne({ email: userData.email });
    if (!user) {
      user = await User.create({
        ...userData,
        year: Number(userData.year),
        mobileno: Number(userData.mobileno)
      });
    }

    const existingRegistration = await Registration.findOne({ eventId: event._id, userId: user._id });
    if (existingRegistration) {
      return NextResponse.json({ message: "You are already registered for this event" }, { status: 409 });
    }

    const registration = await Registration.create({
      eventId: event._id,
      userId: user._id,
      eventSlug: resolvedParams.slug,
      status: "confirmed",
    });

    return NextResponse.json({ message: "Registration successful", registration }, { status: 201 });

  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ message: "A user with this ID Number or Email already exists but there was a conflict." }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    await ConnectDB();
    const resolvedParams = await context.params;
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ registered: false }, { status: 200 });
    }
    
    const event = await Event.findOne({ slug: resolvedParams.slug });
    if(!event) return NextResponse.json({ message: "Event not found" }, { status: 404 });

    const registration = await Registration.findOne({ eventId: event._id, userId: user._id });
    if (registration) {
      return NextResponse.json({ registered: true }, { status: 200 });
    }
    return NextResponse.json({ registered: false }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}
