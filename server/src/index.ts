import express, { Express, NextFunction, Request, Response } from "express";
import http, { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import { ExpressError } from "@/utils";
import { authRoutes, messageRoutes, roomRoutes, userRoutes } from "@/routes";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const port: number = 8080;

mongoose
  .connect(process.env.DB_URL || "mongodb://localhost:27017", {
    dbName: "anthrochat",
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database: " + error);
  });

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

const server: HttpServer = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const users: { [key: string]: string } = {};

  socket.on("join_room", (data) => {
    if (users[socket.id]) {
      socket.leave(users[socket.id]);
      io.to(users[socket.id]).emit("receive_message", {
        text: `${data.username} left the room!`,
        username: "Server",
      });
    }
    socket.join(data.room);
    users[socket.id] = data.room;

    socket.to(data.room).emit("receive_message", {
      text: `${data.username} joined the room!`,
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
      if (users[socket.id]) {
        socket.leave(users[socket.id]);
        io.to(users[socket.id]).emit("receive_message", {
          text: `${data.username} left the room!`,
          username: "Server",
        });
        delete users[socket.id];
      }
    });
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ExpressError("Page not found", 404));
});

app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Something went wrong :/";
    res.status(status).json({ message: err.message, status });
  }
);

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
