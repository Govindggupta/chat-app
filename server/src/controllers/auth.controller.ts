import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { error } from "console";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: "Invalid email formata" });
            return;
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ error: "Username is already taken" });
            return;
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ error: "Email is already taken" });
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            console.log(error);
            res.status(400).json({
                error:
                    "Password must be at least 8 characters long and include letters, numbers, capital character and special characters.",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id.toString(), res);

        res.status(201).json({ newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username) {
            res.status(400).json({ error: "Username is required" });
            return;
        }

        if (!password) {
            res.status(400).json({ error: "Password is required" });
            return;
        }

        const user = await User.findOne({ username }).select("+password");

        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.status(400).json({ error: "Invalid password" });
            return;
        }


        if (!user || !isPasswordCorrect) {
            res.status(400).json({ error: "Invalid username or password" });
            return;
        }

        generateTokenAndSetCookie(user._id.toString(), res);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}


interface CustomRequest extends Request {
    user?: {
        _id: string;
    };  
}

export const home = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401).json({ error: "Unauthorized: No Token Provided" });
            return;
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}