import express from "express";
import  dotenv  from "dotenv";
import cors from "cors";
import axios from "axios";
import { BUSINESS_CONTEXT } from "./trainingData.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GROQ_API_KEY;

app.post("/chat", async (req, res) => {

  const userMessage = req.body.message;

  try {

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
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

  } catch (err) {

    console.error(err);

    res.json({
      reply:
        "I’m sorry, something went wrong. You can also message us directly on WhatsApp for quick help."
    });

  }

});

app.listen(5000, () => {
  console.log("Puja Glam AI running on port 5000");
});