'use server';

import { Registration } from '@/models/registration.model';

import ConnectDB from "@/db/db";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string; }) => {
    try {
        await ConnectDB();

        await Registration.create({ eventId, slug, email });

        return { success: true };
    } catch (e) {
        console.error('create booking failed', e);
        return { success: false };
    }
}