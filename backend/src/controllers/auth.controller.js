import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export async function signup(req, res) {
    try {
        const { email, fullName, password } = req.body;

        if(!email || !fullName || !password) return res.status(400).json({message: "All fields are required"});

        const user = await User.findOne({email: email});
        if (user) return res.status(400).json({message: "User Already Exits. Please Sign In."});

        if(password.length < 6) return res.status(400).json({message: "Password must be atleast 6 characters long."});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({email: email.trim(), fullName: fullName.trim(), password: hashedPassword});

        if(newUser) {
            // Generating jwt token
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName, 
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }    
};

export async function login(req, res) {
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({message: "All fields are required"});

        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({message: "Invalid Credentials"});

        const isPassValid = await bcrypt.compare(password, user.password);

        if(!isPassValid) return res.status(400).json({message: "Invalid Credentials"});

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
    
};

// When user is Logging out we just have to clear cookies.
export function logout(req, res) {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out Successfully" });
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

// In the update Profile we are only Allowing the user to change his/her profile picture.
export async function updateProfile(req, res) {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if(!profilePic) return res.status(400).json({message: "Profile Pic is Required."});

        const uploadResult = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResult.secure_url}, {new: true});

        res.status(200).json(updatedUser);


    } catch (error) {
        console.log("Error in Update Profile Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function checkAuth(req, res) {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in Update checkAuth Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}