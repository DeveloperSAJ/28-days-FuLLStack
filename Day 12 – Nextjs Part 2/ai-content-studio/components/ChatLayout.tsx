"use client";

import { useState, useEffect } from "react";
import { Menu, Trash2, Plus, Pencil } from "lucide-react";
import ChatWindow from "./ChatWindow";

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

export default function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Auto-create first chat
  useEffect(() => {
    if (chats.length === 0) {
      const firstChat: Chat = {
        id: Date.now().toString(),
        title: "New Chat",
        messages: [],
        personality: "bestfriend",
      };
      setChats([firstChat]);
      setActiveChatId(firstChat.id);
    }
  }, [chats]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      personality: "bestfriend",
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setSidebarOpen(false);
  };

  const deleteChat = (id: string) => {
    const updated = chats.filter((chat) => chat.id !== id);
    setChats(updated);
    if (activeChatId === id) {
      setActiveChatId(updated[0]?.id ?? null);
    }
  };

  const renameChat = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, title: newTitle } : chat))
    );
    setEditingChatId(null);
  };

  // Handle sending message & personality change
  const handleSend = async (message: string, personality: "bestfriend" | "girlfriend") => {
    if (!activeChat) return;

    // Reset conversation if personality changed
    const messagesToUse =
      activeChat.personality === personality ? activeChat.messages : [];

    if (activeChat.personality !== personality) {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat.id ? { ...c, messages: [], personality } : c
        )
      );
    }

    const updatedMessages = [...messagesToUse, { type: "user", text: message }];
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id ? { ...c, messages: updatedMessages, personality } : c
      )
    );

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode: personality }),
      });
      const data = await res.json();

      const aiMessages = [...updatedMessages, { type: "ai", text: data.content }];
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat.id ? { ...c, messages: aiMessages, personality } : c
        )
      );
    } catch {
      const errMessages = [
        ...updatedMessages,
        { type: "ai", text: "Error: Could not generate response." },
      ];
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat.id ? { ...c, messages: errMessages } : c
        )
      );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 bg-gray-900 text-white w-64 h-full p-4 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <button
          onClick={createNewChat}
          className="flex items-center gap-2 bg-gray-800 w-full p-2 rounded-lg mb-4"
        >
          <Plus size={16} /> New Chat
        </button>

        <div className="space-y-2 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-800
              ${activeChatId === chat.id ? "bg-gray-800" : ""}`}
              onClick={() => {
                setActiveChatId(chat.id);
                setSidebarOpen(false);
              }}
            >
              {editingChatId === chat.id ? (
                <input
                  autoFocus
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={() => renameChat(chat.id, editingTitle)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") renameChat(chat.id, editingTitle);
                  }}
                  className="bg-gray-700 text-white px-2 py-1 rounded w-full mr-2 text-sm outline-none"
                />
              ) : (
                <span className="truncate flex-1 text-sm">{chat.title}</span>
              )}

              <div className="flex items-center gap-2 ml-2">
                <Pencil
                  size={14}
                  className="text-gray-400 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingChatId(chat.id);
                    setEditingTitle(chat.title);
                  }}
                />
                <Trash2
                  size={16}
                  className="text-red-400 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="relative flex items-center justify-center p-4 border-b bg-white">
          <button
            className="md:hidden absolute left-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>
          <h1 className="text-3xl font-bold">AI Studio</h1>
        </div>

        {/* Chat Window */}
        <ChatWindow chat={activeChat} onSend={handleSend} />
      </div>
    </div>
  );
}