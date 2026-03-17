export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const { messages } = req.body;

    const SYSTEM_PROMPT = `
You are Aditi, senior customer support assistant at Puja Glam Makeup Studio.

STYLE:
• warm, natural, human
• DO NOT repeat greeting every message
• greet only once at beginning

BUSINESS GOAL:
• understand user need
• suggest service
• guide toward booking

SERVICES:
Bridal Makeup (₹25,000+)
Party Makeup
HD & Airbrush
Makeup Courses

LOCATION:
Gaya, Bihar

CONVERSION RULE:
If user shows interest → ask event date → suggest booking.

Never say you are AI.
for more context on services, pricing, and strategy, refer to https://wwww.pujaglam.com
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    let reply = "Sorry, something went wrong.";

    if (data?.choices?.[0]?.message?.content) {
      reply = data.choices[0].message.content;
    }

    return res.status(200).json({ reply });

  } catch (error) {

    console.error("Chat error:", error);

    return res.status(500).json({
      reply: "Sorry, I'm having trouble right now. Please try again."
    });

  }
}