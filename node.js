// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

let textData = "";

io.on("connection", (socket) => {
    console.log("User connected");

    // Send current data to new user
    socket.emit("update", textData);

    // Receive changes
    socket.on("typing", (data) => {
        textData = data;
        socket.broadcast.emit("update", textData);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});