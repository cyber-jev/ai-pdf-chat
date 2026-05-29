"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [uploading, setUploading] = useState(false);
  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setPdfName(file.name);
    setMessages([]);

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("question", "Summarize this document in 3 bullet points.");
    formData.append("history", JSON.stringify([]));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPdfText(data.pdfText);
      setMessages([
        {
          role: "assistant",
          content: `📄 **${file.name}** uploaded successfully!\n\n${data.reply}`,
        },
      ]);
    } catch (error) {
      setMessages([{ role: "assistant", content: "Error reading PDF. Please try again." }]);
    }

    setUploading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !pdfText) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const formData = new FormData();
    formData.append("question", input);
    formData.append("pdfText", pdfText);
    formData.append("history", JSON.stringify(
      updatedMessages.slice(-6).map(({ role, content }) => ({ role, content }))
    ));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...updatedMessages, { role: "assistant", content: "Something went wrong. Try again." }]);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col h-screen">

        {/* Header */}
        <div className="shrink-0 text-center px-4 pt-6 pb-4 border-b border-gray-800">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-green-400 text-xs font-medium mb-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            AI Powered
          </div>
          <h1 className="text-2xl font-bold text-white">Chat with your PDF</h1>
          <p className="text-gray-400 text-xs mt-1">Upload any PDF and ask questions about it</p>
        </div>

        {/* Upload Area */}
        {!pdfText && !uploading && (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-700 hover:border-green-500 rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 hover:bg-green-500/5"
            >
              <div className="text-5xl mb-4">📄</div>
              <p className="text-white font-semibold mb-1">Click to upload your PDF</p>
              <p className="text-gray-500 text-sm">Any PDF document — reports, contracts, books, research papers</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Uploading State */}
        {uploading && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="text-4xl">⚡</div>
            <p className="text-green-400 font-semibold">Reading your PDF...</p>
            <p className="text-gray-500 text-sm">AI is analyzing your document</p>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        )}

        {/* Chat Area */}
        {pdfText && !uploading && (
          <>
            {/* PDF Badge */}
            <div className="shrink-0 px-4 py-2 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📄</span>
                <span className="text-sm text-gray-300 truncate max-w-[200px]">{pdfName}</span>
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">Active</span>
              </div>
              <button
                onClick={() => { setPdfText(""); setPdfName(""); setMessages([]); }}
                className="text-gray-500 hover:text-white text-xs transition-colors"
              >
                Upload new →
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                      AI
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-green-500 text-white rounded-br-sm"
                      : "bg-gray-800 text-gray-100 rounded-bl-sm"
                  }`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                      You
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-xs font-bold shrink-0">
                    AI
                  </div>
                  <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="shrink-0 px-4 pb-2 flex gap-2 overflow-x-auto">
                {["What is the main topic?", "Key takeaways?", "Summarize in detail"].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(q); }}
                    className="shrink-0 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="shrink-0 px-4 pb-6 pt-3 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-900 border border-gray-700 focus:border-green-500 rounded-xl px-4 py-3 text-base outline-none transition-colors"
                  placeholder="Ask anything about your PDF..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-40 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                >
                  {loading ? "..." : "Ask"}
                </button>
              </div>
              <p className="text-center text-gray-700 text-xs mt-3">Built with Next.js & Groq AI</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}