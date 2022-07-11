const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require('socket.io');
const { isObject } = require('util');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket)=>{
    console.log(`User connect with id: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data); 
        console.log(`User with id: ${socket.id} join the room: ${data}`); 
    });

    socket.on("send_message", (data) =>{
        socket.to(data.room).emit("receive_message", data);
    });

    io.on("disconnect", ()=>{
    console.log("user" + socket.id + "Disconnect");
    });

});
server.listen(3001, ()=>{
    console.log("SERVER RUNNING");
});


