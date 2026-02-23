const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<s>[INST] Eres un asistente médico de clínica. Responde breve y claro.
Paciente: ${userMessage} [/INST]`,
        }),
      }
    );

    const data = await hfResponse.json();

    let reply = "No pude generar respuesta médica.";

    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text.split("[/INST]").pop().trim();
    }

    res.json({ reply });
  } catch (error) {
    console.error("IA ERROR:", error);
    res.json({ reply: "Error IA" });
  }
});

app.listen(3001, () => console.log("Servidor IA en http://localhost:3001"));