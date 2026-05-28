// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("pdf");
//     const question = formData.get("question");
//     const history = JSON.parse(formData.get("history") || "[]");

//     let pdfText = formData.get("pdfText") || "";

//     if (file && file.size > 0) {
//       const bytes = await file.arrayBuffer();
//       const uint8Array = new Uint8Array(bytes);
      
//       // Extract text by finding readable strings in PDF binary
//       const textDecoder = new TextDecoder("latin1");
//       const rawText = textDecoder.decode(uint8Array);
      
//       // Extract text between BT and ET markers (PDF text blocks)
//       const textBlocks = [];
//       const btEtRegex = /BT([\s\S]*?)ET/g;
//       let match;
//       while ((match = btEtRegex.exec(rawText)) !== null) {
//         const block = match[1];
//         const tjRegex = /\((.*?)\)\s*Tj/g;
//         let tjMatch;
//         while ((tjMatch = tjRegex.exec(block)) !== null) {
//           const text = tjMatch[1]
//             .replace(/\\n/g, "\n")
//             .replace(/\\r/g, "")
//             .replace(/\\\(/g, "(")
//             .replace(/\\\)/g, ")")
//             .replace(/\\\\/g, "\\");
//           if (text.trim()) textBlocks.push(text);
//         }
//       }
      
//       pdfText = textBlocks.join(" ").slice(0, 12000);
      
//       if (!pdfText.trim()) {
//         pdfText = "Could not extract text from this PDF. It may be scanned or image-based.";
//       }
//     }

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [
//         {
//           role: "system",
//           content: `You are an expert document analyst. You have been given the following document content:

// ---DOCUMENT START---
// ${pdfText}
// ---DOCUMENT END---

// Answer questions about this document accurately and concisely.
// If the answer is not in the document, say so clearly.
// Always reference specific parts of the document when answering.`,
//         },
//         ...history,
//         { role: "user", content: question },
//       ],
//     });

//     const reply = completion.choices[0].message.content;
//     return Response.json({ reply, pdfText });

//   } catch (error) {
//     console.error("Error:", error);
//     return Response.json({ reply: "Error: " + error.message }, { status: 500 });
//   }
// }


import Groq from "groq-sdk";
import { extractText } from "unpdf";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf");
    const question = formData.get("question");
    const history = JSON.parse(formData.get("history") || "[]");

    let pdfText = formData.get("pdfText") || "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = new Uint8Array(bytes);
      const { text } = await extractText(buffer, { mergePages: true });
      pdfText = text.slice(0, 12000);

      if (!pdfText.trim()) {
        pdfText = "Could not extract text from this PDF. It may be scanned or image-based.";
      }
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert document analyst. You have been given the following document content:

---DOCUMENT START---
${pdfText}
---DOCUMENT END---

Answer questions about this document accurately and concisely.
If the answer is not in the document, say so clearly.
Always reference specific parts of the document when answering.`,
        },
        ...history,
        { role: "user", content: question },
      ],
    });

    const reply = completion.choices[0].message.content;
    return Response.json({ reply, pdfText });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ reply: "Error: " + error.message }, { status: 500 });
  }
}