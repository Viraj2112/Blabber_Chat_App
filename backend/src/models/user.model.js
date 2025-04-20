import mongoose from "mongoose";

// Defining Users model.
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
            minLength: 5, 
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        }
    },
    { timestamps: true } // it is required to create fields like createdAt and updatedAt Automatically.
);

const User = mongoose.model("Users", userSchema);

export default User;