"use client";

import { useState } from "react";
import GeneratorForm from "./GeneratorForm";

interface Message {
  type: "user" | "ai";
  text: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  personality: "bestfriend" | "girlfriend";
}

interface ChatWindowProps {
  chat?: Chat;
  onSend: (message: string, personality: "bestfriend" | "girlfriend") => void;
}

export default function ChatWindow({ chat, onSend }: ChatWindowProps) {
  const [loading, setLoading] = useState(false);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        No chat selected
      </div>
    );
  }

  const handleSend = async (message: string, personality: "bestfriend" | "girlfriend") => {
    setLoading(true);
    await onSend(message, personality);
    setLoading(false);
  };

  const handlePersonalityChange = (newPersonality: "bestfriend" | "girlfriend") => {
    // Triggered by GeneratorForm personality switch
    if (newPersonality !== chat.personality) {
      onSend("", newPersonality); // Reset conversation by sending empty message
    }
  };

  return (
    <GeneratorForm
      messages={chat.messages}
      onSend={handleSend}
      loading={loading}
      personality={chat.personality}
      onPersonalityChange={handlePersonalityChange}
    />
  );
}