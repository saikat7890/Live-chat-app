const ChatUsers = require("../models/UsersModel");

// Create User
const createUser = async (req, res) => {
  try {
    const user = await ChatUsers.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}
// Get all users
const getAllUsers = async (req, res) => {
  try {
    let users = await ChatUsers.find({});
 
    res.status(200).json({
      status: 'success',
      'Total no of users': users.length,
      data: {
          users
      }
  })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
  })
  }
};

// Get a User
const getUser = async (req, res) => {
  try {
    const user = await ChatUsers.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
          user
      }
  })
  } catch (error) {
    res.status(404).json({
        status: 'fail',
        message: error.message
    })
  }
};
// Update a user
const updateUser = async (req, res) => {
    try {
      const updatedUser = await ChatUsers.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      
      res.status(200).json({
        status: 'success',
        data: {
          user: updatedUser
        }
      })
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
    })
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
      await ChatUsers.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'deleted successfully'
    })
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
    }) 
  }
};

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };