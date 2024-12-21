import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import connectMongoDB from './db/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

dotenv.config({
    path: './.env'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on port ${PORT}...`);
});