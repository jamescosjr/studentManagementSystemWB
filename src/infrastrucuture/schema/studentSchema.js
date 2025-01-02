import mongoose from "mongoose";

export const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    inscription: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
})

export const Student = mongoose.model("Student", studentSchema);