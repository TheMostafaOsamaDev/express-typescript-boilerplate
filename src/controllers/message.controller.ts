import { SendMessageDto } from "../dtos/SendMessage.dto";
import { cloudinary } from "../lib/cloudinary";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { AsyncRouteHandler } from "../types";

export const getUsersForSidebar: AsyncRouteHandler = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    next(error);
  }
};

export const getMessages: AsyncRouteHandler<{}, { id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id: userToChatId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, currentUserId: userToChatId },
        { senderId: userToChatId, receiverId: currentUserId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const sendMessage: AsyncRouteHandler<
  SendMessageDto,
  { id: string }
> = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await message.save();

    // todo: real time functionality comes here

    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};
