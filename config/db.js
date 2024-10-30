import mongoose, { mongo } from "mongoose";
import colors from 'colors'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo DB connected : ${conn.connection.host}`.bgMagenta)
    } catch(error){
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

export default connectDB;