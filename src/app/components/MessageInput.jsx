"use client";
import React from "react";

export default function MessageInput({ value, onChange, onSend }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={onSend}>Enviar</button>
    </div>
  );
}
