"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  type: "user" | "ai";
  text: string;
}

type Personality = "bestfriend" | "girlfriend";

interface GeneratorFormProps {
  messages?: Message[];
  onSend: (message: string, personality: Personality) => void;
  loading: boolean;
  personality: Personality;
  onPersonalityChange: (newPersonality: Personality) => void;
}

export default function GeneratorForm({
  messages = [],
  onSend,
  loading,
  personality,
  onPersonalityChange,
}: GeneratorFormProps) {
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input, personality);
    setInput("");
  };

  const handlePersonalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPersonality = e.target.value as Personality;
    if (newPersonality !== personality) {
      onPersonalityChange(newPersonality);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[75%] break-words ${
              msg.type === "user"
                ? "bg-black text-white self-end rounded-br-none"
                : "bg-gray-200 text-black self-start rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="self-start">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-black" />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input + Personality Selector */}
      <div className="flex gap-2 p-4 border-t bg-white items-center">
        <select
          value={personality}
          onChange={handlePersonalityChange}
          className="border rounded-lg p-2"
        >
          <option value="bestfriend">Best Friend</option>
          <option value="girlfriend">Girlfriend</option>
        </select>

        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 border rounded-lg p-2 focus:outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>

      <footer className="text-center text-gray-400 text-xs py-2 border-t">
        © {new Date().getFullYear()} AI Studio
      </footer>
    </div>
  );
}