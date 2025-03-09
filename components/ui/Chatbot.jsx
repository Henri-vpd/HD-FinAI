"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("/api/chatbot", { message: input });
      setMessages([...messages, userMessage, { role: "bot", content: response.data.reply }]);
    } catch (error) {
      setMessages([...messages, userMessage, { role: "bot", content: "Error fetching response" }]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <Card className="p-4 max-w-lg mx-auto shadow-md">
      <CardContent className="h-80 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === "user" ? "text-right text-blue-500" : "text-left text-gray-700"}>
            {msg.content}
          </div>
        ))}
      </CardContent>
      <div className="flex mt-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." />
        <Button onClick={sendMessage} disabled={loading} className="ml-2">
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </Card>
  );
};

export default Chatbot;
