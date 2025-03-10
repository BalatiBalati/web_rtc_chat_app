const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running.");
});

io.on("connection", (socket) => {
    console.log(`🟢 New connection: ${socket.id}`);

    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        console.log(`🔴 Disconnected: ${socket.id}`);
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        console.log(`📞 Call request from ${from} to ${userToCall}`);
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        console.log(`✅ Call answered by ${data.to}`);
        io.to(data.to).emit("callAccepted", data.signal);
    });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
