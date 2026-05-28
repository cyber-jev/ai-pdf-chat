# 💬 AI PDF Chat — Chat with Any Document Using AI

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Groq](https://img.shields.io/badge/Groq-LLM-orange?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

> Upload any PDF and have an intelligent conversation with it. Powered by Groq's lightning-fast LLM and built with Next.js.

🔗 **Live Demo:** [ai-pdf-chat.vercel.app](https://ai-pdf-chat.vercel.app)  
👨‍💻 **Built by:** [Jev](https://johnnyjev.vercel.app) — Frontend Developer & AI Engineer

---

## 🎯 Why I Built This

The ability to extract insights from documents quickly is one of the most powerful use cases for AI right now. Lawyers reviewing contracts, researchers analyzing papers, students studying textbooks, businesses processing reports — everyone deals with PDFs daily.

I built this tool to demonstrate how AI can transform a static document into an interactive knowledge base. Instead of reading through 50 pages to find one answer, you simply ask.

This project showcases my ability to:
- Build full-stack AI-powered web applications from scratch
- Integrate LLM APIs with real-world file processing
- Design clean, production-ready user interfaces
- Handle complex data flows between frontend and backend

---

## ✨ Features

- 📄 **Upload any PDF** — drag and drop or click to upload
- 🤖 **Instant AI Summary** — get a 3-point summary immediately on upload
- 💬 **Conversational Q&A** — ask follow-up questions in a chat interface
- 🧠 **Context-Aware Answers** — AI remembers previous questions in the session
- 💡 **Smart Suggestions** — pre-built question chips to get started fast
- 📋 **Goes Beyond the Document** — AI supplements answers with general knowledge when needed
- 📱 **Fully Responsive** — works beautifully on mobile and desktop
- ⚡ **Lightning Fast** — powered by Groq's ultra-fast inference engine

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Frontend | React 19, Tailwind CSS |
| AI / LLM | Groq API (llama-3.3-70b-versatile) |
| PDF Parsing | unpdf |
| Markdown Rendering | react-markdown |
| Deployment | Vercel |
| Package Manager | npm |

---

## 📦 NPM Packages Used

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "groq-sdk": "^0.8.0",
    "unpdf": "^0.11.0",
    "react-markdown": "^9.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/cyber-jev/ai-pdf-chat.git

# Navigate into the project
cd ai-pdf-chat

# Install dependencies
npm install

# Create environment file
touch .env.local
```

### Environment Variables

Add your Groq API key to `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
ai-pdf-chat/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js        # API route — PDF parsing + Groq LLM
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Main UI — chat interface
├── public/                      # Static assets
├── .env.local                   # Environment variables (not committed)
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🔄 How It Works

```
User uploads PDF
      ↓
Frontend sends PDF via FormData to /api/chat
      ↓
Backend extracts text using unpdf
      ↓
Extracted text injected into Groq system prompt
      ↓
Groq LLM (llama-3.3-70b) answers questions about the document
      ↓
Response streamed back to frontend
      ↓
User sees formatted answer in chat UI
```

---

## 💡 Use Cases

- 📚 **Students** — chat with textbooks, research papers, lecture notes
- ⚖️ **Legal** — review contracts, extract key clauses instantly
- 💼 **Business** — analyze reports, summarize meeting documents
- 🔬 **Research** — query academic papers without reading every page
- 🏠 **Real Estate** — review property documents, lease agreements

---

## 🌐 Deployment

This app is deployed on **Vercel**. To deploy your own instance:

1. Push to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add `GROQ_API_KEY` as an environment variable
4. Deploy — done!

---

## 👨‍💻 About the Developer

Built by **Jev** — a Frontend Developer & AI Engineer based in Port Harcourt, Nigeria, building intelligent web applications that solve real problems.

- 🌐 Portfolio: [johnnyjev.vercel.app](https://johnnyjev.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/johnnyjev](https://linkedin.com/in/johnnyjev)
- 🐙 GitHub: [github.com/cyber-jev](https://github.com/cyber-jev)
- 📧 Email: johnnye4u2c@gmail.com

---

## 📄 License

MIT License — feel free to use this project as inspiration or a starting point for your own AI applications.

---

> *"The best way to learn is by building things that actually work."* — Jev
