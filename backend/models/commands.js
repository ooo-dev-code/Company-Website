import mongoose from "mongoose";

const commandSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    language: { 
        type: String,
        required: true,
    },
    database: {
        type: String,
        required: true,
    },
})

const Command = mongoose.model('Command', commandSchema);
export default Command;