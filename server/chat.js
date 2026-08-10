import { BUSINESS_CONTEXT } from "./trainingData.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

// Keep the payload small: the studio context is long, so only recent turns are sent.
const MAX_HISTORY = 10;
const MAX_CONTENT_LENGTH = 2000;
const REQUEST_TIMEOUT_MS = 20000;

/*
Kept fairly low on purpose: the assistant has to quote the studio address and
phone number verbatim, and a hotter setting made it paraphrase them.
*/
const TEMPERATURE = 0.6;

const GENERIC_ERROR =
  "Sorry, something went wrong. Please try again or contact us on WhatsApp at +91 82100 71659.";

/** Reads the key defensively — a value pasted with quotes or stray whitespace is still usable. */
function readApiKey() {
  const raw = process.env.GROQ_API_KEY;
  if (typeof raw !== "string") return "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

/**
 * Deployment diagnostic for `GET /api/chat`. Reports whether the Groq key is
 * visible to this deployment without ever revealing the key itself.
 */
export function getChatHealth() {
  const key = readApiKey();
  return {
    status: "ok",
    model: MODEL,
    groqConfigured: key.length > 0,
    hint: key.length > 0
      ? "GROQ_API_KEY is set for this deployment."
      : "GROQ_API_KEY is missing. Add it to this environment (on Vercel: Settings > Environment Variables, ticking Production, Preview and Development) and redeploy.",
  };
}

/**
 * Drops anything the Groq API would reject: unknown roles, non-string content
 * and empty strings (the chat widget's rich-text greeting used to serialise to "").
 */
function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({
      role: m.role,
      content: typeof m.content === "string" ? m.content.trim() : "",
    }))
    .filter((m) => m.content.length > 0)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_CONTENT_LENGTH) }))
    .slice(-MAX_HISTORY);
}

/**
 * Calls Groq with the studio system prompt and returns `{ status, reply }`.
 * Never throws — every failure path resolves to a user-facing reply so the
 * widget always has something to render.
 */
export async function generateChatReply(messages) {
  const history = sanitizeMessages(messages);

  if (history.length === 0) {
    return {
      status: 400,
      reply: "Please type a message and I'll help you right away.",
    };
  }

  const apiKey = readApiKey();

  if (!apiKey) {
    console.error("Chat error: GROQ_API_KEY is not configured");
    return {
      status: 500,
      reply:
        "Our assistant is offline for a moment. Please WhatsApp us at +91 82100 71659 and we'll help you right away.",
    };
  }

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: BUSINESS_CONTEXT }, ...history],
        temperature: TEMPERATURE,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error("Chat error: Groq responded", response.status, raw);
      return { status: 502, reply: GENERIC_ERROR };
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("Chat error: Groq returned non-JSON body", raw.slice(0, 500));
      return { status: 502, reply: GENERIC_ERROR };
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("Chat error: Groq returned no message content", raw.slice(0, 500));
      return { status: 502, reply: GENERIC_ERROR };
    }

    return { status: 200, reply };
  } catch (error) {
    console.error("Chat error:", error);
    return { status: 500, reply: GENERIC_ERROR };
  }
}
