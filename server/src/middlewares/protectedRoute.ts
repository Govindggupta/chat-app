import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.js";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string; // Adjust based on your User model
    };
}

export const protectedRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ error: "Unauthorized: No Token Provided" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decoded || !decoded.userId) {
            res.status(401).json({ error: "Unauthorized: Invalid Token" });
            return;
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        req.user = { _id: user._id.toString() };
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};