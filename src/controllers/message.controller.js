import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { response } from 'express';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error('Error in getUsersForSidebar:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, ReceiverId: userToChat },
        { ReceiverId: myId, senderId: userToChat },
      ],
    });

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error in getMessages:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { image, text } = req.body;
    const senderId = req.user._id;

    let imgUrl;
    if (imgUrl) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imgUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imgUrl,
    });

    await newMessage.save();

    //todo: realtime functionality will come here : socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in sendMessage:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
