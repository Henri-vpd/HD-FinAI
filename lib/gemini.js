import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

export async function fetchGeminiResponse(message) {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing. Check your .env file.");
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process your request.";
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return `Error: ${error.response?.data?.error?.message || "Processing failed."}`;
  }
}
