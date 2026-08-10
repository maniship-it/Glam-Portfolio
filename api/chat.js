import { generateChatReply } from "../server/chat.js";

/**
 * Vercel serverless entry point for the chat widget.
 * The Express server (server/routes.ts) exposes the same endpoint through the
 * same handler, so both deployments behave identically.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ reply: "Method not allowed" });
  }

  // Vercel parses JSON bodies, but fall back to manual parsing when the
  // content-type header is missing or the body arrives as a raw string.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }

  const { status, reply } = await generateChatReply(body?.messages);

  return res.status(status).json({ reply });
}
