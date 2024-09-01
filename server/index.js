const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const mongoose = require('mongoose');

//import routes
const router = require('./routes/chatRouter');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const UserRoute = require('./routes/UserRoute');
const ChatRoute = require('./routes/ChatRoute');
const MessageRoute = require('./routes/MessageRoute');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: {origin: '*'}});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//routes
app.use("/", router);
app.use('/api/v1/users', UserRoute)
app.use('/api/v1/chat', ChatRoute)
app.use('/api/v1/message', MessageRoute)

// Socket.io implementation
io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});  
        console.log(user);
        
        if(error) return callback(error);

        socket.emit('message', {user:'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined!`})
        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
        }

        console.log('User had left!!!');
    });
});


//mongodb connect & starting server
const PORT = process.env.PORT || 3002;
const start = async () => {
    try {
      await mongoose.connect(process.env.LOCAL_CONN_STR);
      console.log("Database connected");
      server.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
start();
