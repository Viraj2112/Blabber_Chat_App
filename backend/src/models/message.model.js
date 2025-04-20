import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",    //referece to User Model
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",        //reference to User Model
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        }
    }, 
    {timestamps: true}
);

const Message = mongoose.model("Messages", messageSchema);
export default Message;