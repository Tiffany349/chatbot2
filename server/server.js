require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

let conversationHistory = [
  {
    role: "system",
    content:
      "Eres un asistente médico de una clínica de atención primaria. Responde siempre en máximo 2 frases, de forma breve y clara. No recetes medicamentos. Si detectas síntomas graves o urgencias, indica que debe acudir de inmediato a una unidad de salud. Para síntomas comunes, sugiere el especialista adecuado (ej. médico general, ginecólogo, cardiólogo, dermatólogo, psicólogo, alergólogo, etc.). También puedes responder sobre servicios de la clínica (horarios, seguros, documentos) de forma breve.",
  },
  {
    role: "assistant",
    content: "Hola, soy el asistente de la clínica. ¿En qué puedo ayudarte hoy?",
  },
];

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  conversationHistory.push({ role: "user", content: message });

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.HF_MODEL,
          messages: conversationHistory,
        }),
      }
    );

    const rawText = await response.text();
    console.log("HF RAW TEXT:", rawText);

    if (!response.ok) {
      return res.status(500).json({ reply: `Error IA: ${rawText}` });
    }

    const data = JSON.parse(rawText);

    let reply = "";
    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content || "";
    }

    conversationHistory.push({ role: "assistant", content: reply });

    res.json({ reply: reply || "No pude generar respuesta." });
  } catch (err) {
    console.error("ERROR SERVER:", err);
    res.status(500).json({ reply: "Error IA" });
  }
});

app.listen(3001, () => {
  console.log("Servidor IA en http://localhost:3001");
});