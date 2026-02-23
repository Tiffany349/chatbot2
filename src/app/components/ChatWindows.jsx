"use client";
import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../hooks/useChat";

export default function ChatWindows() {
  const { messages, isLoading, sendUserMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendUserMessage(input);
      setInput("");
    }
  };

  return (
    <div className="chat-window">
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSend={handleSend}
      />
    </div>
  );
}