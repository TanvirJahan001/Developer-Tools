"use client";
import { useState } from "react";

export default function HtmlPrettify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const prettifyHtml = () => {
    if (!input.trim()) {
      setError("Please enter HTML code to prettify");
      return;
    }

    try {
      let formatted = "";
      let indent = 0;
      const lines = input
        .replace(/>\s*</g, ">\n<") // Add newline between elements
        .replace(/(<[^\/].*?>)/g, "\n$1") // Add newline before opening tags
        .replace(/(<\/.*?>)/g, "$1\n") // Add newline after closing tags
        .split("\n")
        .filter(line => line.trim()); // Remove empty lines

      lines.forEach(line => {
        line = line.trim();
        
        if (line.match(/<\/\w+>/)) {
          // Closing tag - decrease indent before printing
          indent = Math.max(0, indent - 1);
          formatted += " ".repeat(indent * indentSize) + line + "\n";
        } else if (line.match(/<[^\/!].*?>/)) {
          // Opening tag - print then increase indent
          formatted += " ".repeat(indent * indentSize) + line + "\n";
          if (!line.match(/<.*?\/>/)) { // Not self-closing
            indent += 1;
          }
        } else {
          // Text content or self-closing tag
          formatted += " ".repeat(indent * indentSize) + line + "\n";
        }
      });

      setOutput(formatted.trim());
      setError("");
    } catch (err) {
      setError("Error formatting HTML: " + err.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formatted.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          HTML Prettify
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Format HTML code with proper indentation for better readability.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input HTML
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML code here..."
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            spellCheck="false"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Indent Size
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="block w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="8">8 spaces</option>
            </select>
          </div>
          <button
            onClick={prettifyHtml}
            className="flex-1 px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
          >
            Prettify HTML
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Formatted Output
              </label>
              <div className="space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}
      </div>
    </div>
  );
}
