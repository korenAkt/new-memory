import mongoose from 'mongoose';

// Memories
const MemorySchema = mongoose.Schema(
    {
        username: { 
            type: String, ref: "User"
        },
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        description: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 500
        },
        favorite: {
            type: Boolean
        },
        createdAt: {type: Date, default: Date.Now}
    }    
)

var MemoryModel = mongoose.model("memory", MemorySchema);

export default MemoryModel;


