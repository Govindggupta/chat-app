import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import connectMongoDB from './db/db.js';
import cookieparser from 'cookie-parser';

dotenv.config({
    path: './.env'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on port ${PORT}...`);
});
