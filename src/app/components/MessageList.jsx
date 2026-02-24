"use client";
import React, { useEffect, useRef } from "react";

export default function MessageList({ messages, isLoading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="message-list" role="log" aria-live="polite">
      {messages.map((m) => (
        <div key={m.id} className={`message ${m.sender}`}>
          
          {/* Avatar */}
          <div className="avatar">
            {m.sender === "bot" ? "🤖" : "👤"}
          </div>

          {/* Burbuja */}
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
          <div className="avatar">🤖</div>

          <div className="bubble">
            <strong className="sender">Asistente</strong>
            <div className="typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}