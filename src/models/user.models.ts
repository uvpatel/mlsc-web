import {Schema, models, model} from "mongoose"


type IUser = {
    username: string;
    email: string;
    year: Number;
    mobileno: Number;
    idno: String;
    github?: String;
    department: String;
    createdAt: Date;
    updatedAt: Date;

}


 
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: [ true , "Email is required"],
        unique: true,
    },
    year: {
        type:Number,
        required: true,
    },
    mobileno: {
        type:Number,
        required: true,
    },
    idno: {
        type: String,
        required: [ true , "Id No is required"],
        unique: true,
    },
    github: {
        type: String,
        optional: true,
    },
    department: {
        type: String,
        required: true,
    },
}, {timestamps: true})


export const User = models.User || model<IUser>("User", userSchema)