import { Schema , model , models , Document } from "mongoose"

export interface IEvent {
    title: string;
    slug: string;
    description: string;
    image: string;
    overview: string;
    
}

const eventSchema  = new Schema<IEvent>({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
}, {timestamps: true})


export const Event = models.Event || model<IEvent>("Event", eventSchema)
