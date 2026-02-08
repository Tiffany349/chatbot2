"use client";
import React, { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list" role="log" aria-live="polite">
      {messages.map((m) => (
        <div key={m.id} className={`message ${m.sender}`}>
          <div className="bubble">
            <strong className="sender">{m.sender === "bot" ? "Asistente" : "Tú"}</strong>
            <div className="text">{m.text}</div>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}