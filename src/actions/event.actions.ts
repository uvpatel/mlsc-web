"use server";

import Event from "@/models/event.model";
import ConnectDB from "@/db/db";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await ConnectDB();
        const event = await Event.findOne({ slug });
        
        if (!event || !event.tags?.length) {
            return [];
        }
        const similarEvents = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags },
        }).lean();

        return similarEvents;
    } catch(error : any) {
        console.error("getSimilarEventsBySlug error:", error);
        return [];
    }
};

export const getEventBySlug = async (slug: string) => {
    try {
        await ConnectDB();
        const event = await Event.findOne({ slug }).lean();
        if (!event) return null;
        
        const stringified = JSON.stringify(event);
        return stringified ? JSON.parse(stringified) : null;
    } catch(error : any) {
        console.error("getEventBySlug error:", error);
        return null;
    }
};

export async function getAllEvents() {
    try {
      await ConnectDB();
    
    
    const events = await Event.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    const serializedEvents = JSON.stringify(events);
    return serializedEvents ? JSON.parse(serializedEvents) : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}