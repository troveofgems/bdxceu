import mongoose from "mongoose";

const timestamps = {
    timestamps: true
}

const CommentModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, timestamps);

export default mongoose.model("Comment", CommentModel);