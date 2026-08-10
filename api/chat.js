import { generateChatReply, getChatHealth } from "../server/chat.js";

/**
 * Vercel serverless entry point for the chat widget.
 * The Express server (server/routes.ts) exposes the same endpoint through the
 * same handler, so both deployments behave identically.
 */
export default async function handler(req, res) {
  // Open this URL in a browser to check whether the deployment can see GROQ_API_KEY.
  if (req.method === "GET") {
    return res.status(200).json(getChatHealth());
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
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
