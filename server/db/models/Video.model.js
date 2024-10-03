import mongoose from "mongoose";

const timestamps = {
    timestamps: true
}

const VideoModel = new mongoose.Schema({
    classId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true,
        unique: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    }

}, timestamps);

export default mongoose.model("Video", VideoModel);