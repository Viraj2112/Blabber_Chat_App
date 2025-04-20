import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // get hold of all the Other Users. 

router.get("/:id", protectRoute, getMessages);  // get hold of all the conversation between sender and receiver.

router.post("/send/:id", protectRoute, sendMessage);    // send message.

export default router;