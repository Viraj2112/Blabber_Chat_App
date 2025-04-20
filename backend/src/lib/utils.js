import jwt from "jsonwebtoken";

export function generateToken(userId, res) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //these are total milliseconds in 7 days.
        httpOnly: true, // prevent Xss attacks cross-site scripting attacks, makes secure
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development"  // if true cookie is sent only on https.
    })
}