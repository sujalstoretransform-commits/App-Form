import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
}, { timestamps: true });

export const Form = mongoose.model("Form", FormSchema);