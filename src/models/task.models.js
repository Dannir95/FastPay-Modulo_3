import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    tittle: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    date: {
        type: "string",
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps : true
});

export default mongoose.model('Task', taskSchema);