import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary} from "cloudinary";
import { getReceiverSocketId, io } from "../lib/socket.js";

export async function getUsersForSidebar(req, res) {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        onsole.log("Error in getUsersForSidebar Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getMessages(req, res) {
    try {
        const { id:userToChatId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: senderId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: senderId}
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function sendMessage(req, res) {
    try {
        const { text, image } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        // Saving the Image to Cloudinary and adding its Url to Message document in MongoDB
        let imageUrl;
        if(image) {
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResult.secure_url;
        }

        // Saving the message in the Database
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        // todo: realtime functionality goes here using socket.io.
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}