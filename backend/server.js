const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const chatRoutes = require('./routes/chatRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to access json data

//app.get('/', (req, res) => {
//    res.send("API running");
//})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound)
app.use(errorHandler)

/*
app.get('/api/chats', (req, res)=> {
    res.send(chats);
})

app.get('/api/chats/:id',(req, res)=> {
   // console.log(req);
   // console.log(req.params.id);

   const singleChat = chats.find((c) => c._id === req.params.id);
   res.send(singleChat);
})
*/


const PORT = process.env.PORT;

const server = app.listen(
    PORT,
    console.log(`${PORT} : Port Running Server`.yellow.bold)
);

const io = require("socket.io")(server, {
    pingTimeout: 60000,  // close the connection to save bandwidth
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
        console.log(userData._id);
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room " + room);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stoptyping'));


    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });

});
