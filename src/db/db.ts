import mongoose from "mongoose"



export default async function ConnectDB(){

    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI as string)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch {
        console.error("Error connecting to MongoDB");
    }
}