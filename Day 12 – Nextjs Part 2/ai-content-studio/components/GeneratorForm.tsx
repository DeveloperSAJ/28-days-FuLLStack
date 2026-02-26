"use client";

import { useState, useRef, useEffect } from "react";
import Loader from "./Loader";

interface Message {
  type: "user" | "ai";
  text: string;
}

export default function GeneratorForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new message added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: input }]);

    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Add AI response
      setMessages((prev) => [...prev, { type: "ai", text: data.content }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Error: Could not generate response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 flex flex-col h-[70vh] border-2 rounded-lg p-4 bg-white">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 my-2 rounded-lg max-w-[75%] break-words ${
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
              <Loader />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input section */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-2 rounded-lg p-2 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
        <footer className="text-center text-gray-500 text-sm mt-4 mb-4">
          © {new Date().getFullYear()} AI Studio. All rights reserved.
        </footer>
    </>
  );
}
