import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DataSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    wordCount: {
        type: Number,
        required: true
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    webLinks: {
        type: [String],
        default: []
    },
    mediaLinks: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const Data = mongoose.model('Data', DataSchema);
export default Data;
