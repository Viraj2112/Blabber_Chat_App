import express from "express";
import authRoutes from "./routes/auth.route.js"; // here authRoutes is the router we created in auth.route.js
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app } from "./lib/socket.js"; // Import the socket server
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" })); // Extract JSON data out of file.
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser()); // Middleware to parse cookies from the client's request.

app.use("/api/auth", authRoutes); // Used for authorization every time a request passes this middleware.
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/vite-project/dist")));
    app.get("*", (req, res) => {
        if (req.originalUrl.startsWith("/api")) {
            res.status(404).send("API route not found");
        } else {
            res.sendFile(path.join(__dirname, "../frontend/vite-project/dist", "index.html"));
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server is Running on Port: ${PORT}`);
    connectDB();
});