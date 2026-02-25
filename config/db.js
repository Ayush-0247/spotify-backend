import mongoose  from "mongoose";

const connectToDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    } catch(error){
        console.log(error.message)
    }
}

export default connectToDatabase