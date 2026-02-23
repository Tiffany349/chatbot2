"use client";
import React, { useEffect, useRef } from "react";

export default function MessageList({ messages, isLoading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list" role="log" aria-live="polite">
      {messages.map((m) => (
        <div key={m.id} className={`message ${m.sender}`}>
          <div className="bubble">
            <strong className="sender">
              {m.sender === "bot" ? "Asistente" : "Tú"}
            </strong>
            <div className="text">{m.text}</div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="message bot">
          <div className="bubble">
            <strong className="sender">Asistente</strong>
            <div className="text">⏳ Pensando...</div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}