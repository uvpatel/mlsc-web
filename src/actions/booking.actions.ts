'use server';

import registrationSchema from '@/models/register.models';

import ConnectDB from "@/db/db";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string; }) => {
    try {
        await ConnectDB();

        await registrationSchema.create({ eventId, slug, email });

        return { success: true };
    } catch (e) {
        console.error('create booking failed', e);
        return { success: false };
    }
}