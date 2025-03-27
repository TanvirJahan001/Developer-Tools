"use client";
import { useState } from "react";

export default function XmlPrettify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const prettifyXml = () => {
    if (!input.trim()) {
      setError("Please enter XML code to prettify");
      return;
    }

    try {
      let formatted = "";
      let indent = 0;
      const lines = input
        .replace(/>\s*</g, ">\n<") // Add newline between elements
        .replace(/</g, "\n<") // Add newline before elements
        .split("\n")
        .filter(line => line.trim()); // Remove empty lines

      lines.forEach(line => {
        line = line.trim();
        
        if (line.startsWith("</")) {
          // Closing tag - decrease indent
          indent--;
          formatted += " ".repeat(indent * indentSize) + line + "\n";
        } else if (line.startsWith("<?")) {
          // XML declaration - no indent
          formatted += line + "\n";
        } else if (line.endsWith("/>")) {
          // Self-closing tag - keep indent
          formatted += " ".repeat(indent * indentSize) + line + "\n";
        } else if (line.startsWith("<")) {
          // Opening tag - add indent after
          formatted += " ".repeat(indent * indentSize) + line + "\n";
          if (!line.endsWith("/>")) {
            indent++;
          }
        } else {
          // Content - keep current indent
          formatted += " ".repeat(indent * indentSize) + line + "\n";
        }
      });

      setOutput(formatted.trim());
      setError("");
    } catch (err) {
      setError("Error formatting XML: " + err.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formatted.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          XML Prettify
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Format XML data with proper indentation for enhanced readability and structure.
        </p>
      </div>

      <div className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="indentSize"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Indent Size
          </label>
          <select
            id="indentSize"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            XML Input
          </label>
          <textarea
            id="input"
            rows={6}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<?xml version='1.0'?><root><child>content</child></root>"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={prettifyXml}
            className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
          >
            Prettify XML
          </button>
        </div>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="output"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Formatted XML
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
              id="output"
              rows={10}
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
              value={output}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}
