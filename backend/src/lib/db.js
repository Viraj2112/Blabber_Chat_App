// We are using this file to connect our application to MongoDb.
import mongoose from "mongoose";

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected Succesfully: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`)
    }
}