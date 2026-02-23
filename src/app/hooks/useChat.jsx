import { useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hola, soy el asistente de la clínica. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageToAI = async (message) => {
    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.reply || "No pude generar respuesta médica.";
    } catch (err) {
      console.error(err);
      return "Error al conectar con la IA.";
    }
  };

  const sendUserMessage = async (text) => {
    if (!text || !text.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]); // se agrega el mensaje del usuario
    setIsLoading(true);

    const reply = await sendMessageToAI(text.trim());

    const botMsg = { id: Date.now() + 1, sender: "bot", text: reply };
    // se agrega la respuesta del bot sin perder el mensaje del usuario
    setMessages((m) => [...m, botMsg]);
    setIsLoading(false);
  };

  return { messages, isLoading, sendUserMessage };
}