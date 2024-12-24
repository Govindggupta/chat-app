import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    profilePicture: {
      type: String,
      default: "/group-placeholder.png",
    },
    lastMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const GroupChat = mongoose.model("GroupChat", groupChatSchema);
export default GroupChat;
