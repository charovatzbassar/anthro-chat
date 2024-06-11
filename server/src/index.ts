import express, { Express, Request, Response } from "express";
import http, { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app: Express = express();

app.use(cors());

const server: HttpServer = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port: number = 8080;

io.on("connection", (socket) => {
  // Keep track of users and the rooms they are in
  const users: { [key: string]: string } = {};

  socket.on("join_room", (data) => {
    // Leave the previous room
    if (users[socket.id]) {
      socket.leave(users[socket.id]);
      io.to(users[socket.id]).emit("receive_message", {
        message: `${data.username} left the room!`,
        username: "Server",
      });
    }

    // Join the new room
    socket.join(data.room);
    users[socket.id] = data.room;

    // Inform other users in the room about the new user
    socket.to(data.room).emit("receive_message", {
      message: `${data.username} joined the room!`,
      username: "Server",
    });

    socket.on("user_typing", (data) => {
      if (data.userIsTyping) {
        socket.broadcast.to(data.room).emit("someone_is_typing", {
          username: data.username,
          room: data.room,
        });
      }
    });

    socket.on("disconnect", () => {
      // Leave the room and delete the user
      if (users[socket.id]) {
        socket.leave(users[socket.id]);
        io.to(users[socket.id]).emit("receive_message", {
          message: `${data.username} left the room!`,
          username: "Server",
        });
        delete users[socket.id];
      }
    });
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
}); // This is the event listener for when a new client connects to the server

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
