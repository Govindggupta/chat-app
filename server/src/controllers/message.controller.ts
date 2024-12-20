import { Request, Response } from "express";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

interface customRequest extends Request {
  user?: {
    _id: string;
  };
}

export const getUsersForSideBar = async (req: customRequest, res: Response) => {
  try {
    const loggedINUserId = req.user?._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedINUserId } });

    res.status(200).json({ filteredUsers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req: customRequest, res: Response) => {
  try {
    const { id: userTochatId } = req.params;
    const myId = req.user?._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userTochatId },
        { senderId: userTochatId, receiverId: myId },
      ],
    });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req: customRequest, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;

    let imageUrl: string = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId: req.user?._id,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();  

    res.status(200).json({ newMessage });       
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
