import { Server } from "socket.io";
import prisma from "../../prisma/prisma";

export async function streamIssue(io: Server) {
  await prisma.$disconnect();
  console.log("streamIssue");
  const stream = await prisma.issue.subscribe();

  // Handle Prisma stream events
  for await (const event of stream) {
    console.log(`received event: `, event);

    if (event.action === "create") {
      io.sockets.emit("issue_added", event);
    }
  }
}

export async function streamTodo(io: Server) {
  await prisma.$disconnect();
  console.log("streamTodo");

  const stream = await prisma.todo.subscribe();

  // Handle Prisma stream events
  for await (const event of stream) {
    console.log(`received event: `, event);

    if (event.action === "create") {
      io.sockets.emit("todo_added", event);
    }
  }
}
