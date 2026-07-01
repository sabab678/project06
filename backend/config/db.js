import mongoose  from "mongoose";

const connectDB = async ()=>{
    try {
        const connectionIsntance = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected successfully")

    } catch (error) {
        console.log("error in DB connection ",error)
    }
}

export default connectDB