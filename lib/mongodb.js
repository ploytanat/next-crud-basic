import mongoose from "mongoose";

export const connectMongoDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongoDB")
    }catch(error){
        console.log("Error connecing to mongodb", error);
    }
}
