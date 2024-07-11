import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    author: {
        type: String, 
        required: true,
    },
    currentAvailablityStatus: {
        type: Boolean, 
        required: true
    }
}, {timestamps:true})

export const Book = mongoose.model("Book", bookSchema);