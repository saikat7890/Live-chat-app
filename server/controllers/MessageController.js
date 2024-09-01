const MessageModel = require("../models/MessageModel");

const addMessage = async (req, res) => {
  try {
    const message = await MessageModel.create(req.body);
    res.status(200).json({
      status: 'success on adding a message',
      data: {
        message
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail to add message',
      message: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const message = await MessageModel.find(req.params);
    res.status(200).json({
      status: 'success on fetching the message',
      data: {
        message
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail to fetch message',
      message: error.message,
    });
  }
};

module.exports = {addMessage, getMessages};