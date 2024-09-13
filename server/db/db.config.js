import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()


export const connectDB = async () => {
    const { DB_URL } = process.env
    if(!DB_URL) {
        throw new Error("Database URL not found")
    }

    try {
        await mongoose.connect(DB_URL)
        console.log("Database connected successfully")
    } catch (err) {
        console.log(err)
        throw new Error("Database connection failed")
    }
}