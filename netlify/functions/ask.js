netlify/
└── functions/
    └── ask.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handler(event) {
  try {
    const { query } = JSON.parse(event.body);
    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing query" }),
      };
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: "You are the Backed by Local site assistant. Be concise, friendly, and on-brand — focusing on local business visibility, ROI, and plan options." },
        { role: "user", content: query }
      ],
    });

    const output = response.output_text || "Sorry, I didn’t catch that.";
    return {
      statusCode: 200,
      body: JSON.stringify({ text: output }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}
