require("dotenv").config();
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import prisma from "../prisma/prisma";
import { streamIssue, streamTodo } from "./pulse/meetingSession";
const port = process.env.APP_PORT || 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", async (socket) => {});


server.listen(port, async () => {
process.setMaxListeners(99);

  // io.on("connection", (socket) => {
  //   console.log("ellooo");
  //   const key = socket.handshake.query.api_key;

  //   if (key && key === "apiKey") {
  //     streamIssue(io);
  //     streamTodo(io);
  //   } else {
  //     // next(new Error("Unauthorized"));
  //   }
  // });
  streamIssue(io);
  streamTodo(io);
});
