"use client";

import { useState } from "react";

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(1);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [format, setFormat] = useState("plain"); // plain, html
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur",
    "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui",
    "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const generateText = () => {
    let result = [];
    
    for (let i = 0; i < paragraphs; i++) {
      let paragraph = [];
      
      // First sentence of paragraph should start with "Lorem ipsum dolor sit amet"
      if (i === 0) {
        paragraph.push("Lorem ipsum dolor sit amet");
        for (let w = 5; w < wordsPerParagraph; w++) {
          paragraph.push(words[Math.floor(Math.random() * words.length)]);
        }
      } else {
        for (let w = 0; w < wordsPerParagraph; w++) {
          paragraph.push(words[Math.floor(Math.random() * words.length)]);
        }
      }

      // Capitalize first letter and add period at the end
      let sentences = [];
      let currentSentence = [];
      
      paragraph.forEach((word, index) => {
        currentSentence.push(word);
        if (index % 10 === 9 || index === wordsPerParagraph - 1) {
          let sentence = currentSentence.join(" ");
          sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
          sentences.push(sentence);
          currentSentence = [];
        }
      });

      result.push(sentences.join(" "));
    }

    if (format === "html") {
      setOutput(result.map(p => `<p>${p}</p>`).join("\n"));
    } else {
      setOutput(result.join("\n\n"));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Paragraphs
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={paragraphs}
            onChange={(e) => setParagraphs(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Words per Paragraph
          </label>
          <input
            type="number"
            min="10"
            max="200"
            value={wordsPerParagraph}
            onChange={(e) => setWordsPerParagraph(Math.min(200, Math.max(10, parseInt(e.target.value) || 10)))}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="plain">Plain Text</option>
            <option value="html">HTML</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateText}
        className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
      >
        Generate Lorem Ipsum
      </button>

      {output && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Generated Text
            </h3>
            <button
              onClick={handleCopy}
              className="text-sm text-primary hover:text-primary-dark"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              rows={Math.min(10, paragraphs * 2)}
              className="w-full p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
