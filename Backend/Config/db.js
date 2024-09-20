import mongoose from "mongoose";



export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://shresthsingh:Shresth123@cluster0.aprj7.mongodb.net/?').then(()=>console.log('Connected to the database'))
}