const express = require('express');
const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = userRouter;