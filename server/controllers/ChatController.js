const ChatModel = require("../models/ChatModel");

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "SenderId and ReceiverId are required" });
  }
  try {
    const existingChat = await ChatModel.findOne({ members: { $all: [senderId, receiverId] } });
    if (existingChat) {
      return res.status(200).json({
        status: 'chat already exists'
      });
    }
    const chat = await ChatModel.create({
      members: [senderId, receiverId],
    });
    res.status(200).json({
      status: 'success on creating chat',
      data: {
        chat
      }
    });
  } catch (error) {
    console.log(error);
    
    res.status(404).json({
      status: 'fail to create chat',
      message: error.message
  })
  }
};

const userChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({
      status: 'success on fetching all user chats',
      data: {
        chats
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail to fetch user chats',
      message: error.message
  })
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json({
      status: 'success on getting the chat',
      data: {
        chat
      }
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: error.message
  })
  }
};

module.exports = { createChat, findChat, userChats };