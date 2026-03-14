import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import ConnectDB from "@/db/db";
import Event from '@/models/event.model';
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  overview: z.string().min(1, "Overview is required"),
  venue: z.string().min(1, "Venue is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  mode: z.enum(["online", "offline", "hybrid"]),
  audience: z.string().min(1, "Audience is required"),
  organizer: z.string().min(1, "Organizer is required"),
});

export async function POST(req: NextRequest) {
    try {
        await ConnectDB();

        const formData = await req.formData();
        
        let eventRaw;
        try {
            eventRaw = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({ message: 'Invalid JSON data format'}, { status: 400 })
        }

        const validationResult = eventSchema.safeParse(eventRaw);
        if (!validationResult.success) {
            return NextResponse.json({ 
                message: 'Validation failed', 
                errors: validationResult.error.format()
            }, { status: 400 });
        }

        const eventData = validationResult.data;

        const file = formData.get('image') as File;
        if(!file) return NextResponse.json({ message: 'Image file is required'}, { status: 400 })

        let tags = [];
        try {
            const tagsValue = formData.get('tags');
            if (tagsValue) {
                tags = JSON.parse(tagsValue as string);
                if (!Array.isArray(tags)) throw new Error();
            }
        } catch (error) {
            return NextResponse.json({ message: 'Invalid tags array'}, { status: 400 })
        }

        let agenda = [];
        try {
            const agendaValue = formData.get('agenda');
            if (agendaValue) {
                agenda = JSON.parse(agendaValue as string);
                if (!Array.isArray(agenda)) throw new Error();
            }
        } catch (error) {
            return NextResponse.json({ message: 'Invalid agenda array'}, { status: 400 })
        }

        if(!process.env.CLOUDINARY_URL && (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME)) {
            console.warn("Cloudinary credentials missing, image upload may fail.");
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
                if(error) return reject(error);
                if(!results) return reject(new Error('Upload failed'));
                resolve(results);
            }).end(buffer);
        });

        if (!uploadResult || !uploadResult.secure_url) {
             return NextResponse.json({ message: 'Failed to retrieve Cloudinary URL'}, { status: 500 })
        }

        const createdEvent = await Event.create({
            ...eventData,
            image: uploadResult.secure_url,
            tags: tags,
            agenda: agenda,
        });

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown'}, { status: 500 })
    }
}

export async function GET() {
    try {
        await ConnectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Event fetching failed', error: e instanceof Error ? e.message : 'Unknown'}, { status: 500 });
    }
}
