import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { BUSINESS_CONTEXT } from "./trainingData.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GROQ_API_KEY;

/*
DEBUG CHECK
*/
if (!API_KEY) {
  console.error("❌ GROQ_API_KEY not found in .env");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.send("Puja Glam AI Server Running");
});

app.post("/chat", async (req, res) => {

const userMessage = req.body?.message;

if (!userMessage) {
  return res.status(400).json({
    reply: "Please send a valid message."
  });
}

  try {

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: BUSINESS_CONTEXT
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.85
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {

    console.error("AI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      reply:
        "Sorry, something went wrong. Please try again or contact us on WhatsApp."
    });

  }

});

app.listen(PORT, () => {
  console.log(`🚀 Puja Glam AI running on port ${PORT}`);
});