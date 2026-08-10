import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// plain ESM module, shared with the Vercel serverless function in api/chat.js
import { generateChatReply } from "./chat.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Chat widget endpoint. Must be registered before the Vite/static catch-all,
  // otherwise POST /api/chat falls through and answers with index.html.
  app.post("/api/chat", async (req, res) => {
    const { status, reply } = await generateChatReply(req.body?.messages);
    res.status(status).json({ reply });
  });

  return httpServer;
}
