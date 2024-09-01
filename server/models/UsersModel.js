const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please emter your username'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      unique: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  }
    
  },
  { timestamps: true }
);

const ChatUsers = mongoose.model("ChatUsers", UserSchema);
module.exports = ChatUsers;