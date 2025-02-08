import bcrypt from 'bcrypt';
import {  User } from '../modals/userModel.js';
import { response } from 'express';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Signup Error:", error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error." });
    }
};




export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        return res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict", 
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({ message: "User login successfully." });

    } catch (e) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error." });
        }
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200)
            .clearCookie("token")
            .json({ message: "User logout successfully." });
    } catch (e) {
        return res.status(500).json({ message: "Internal server error." });
    }
};