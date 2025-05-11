import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
    },
})

const Rate = mongoose.model('Rate', rateSchema);
export default Rate;