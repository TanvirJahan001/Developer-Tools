"use client";
import { useState } from "react";

export default function JsonPrettify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const handlePrettify = () => {
    setError("");
    try {
      // Parse JSON input
      const parsedJson = JSON.parse(input);

      // Stringify with formatting
      const prettified = JSON.stringify(parsedJson, null, indentSize);

      setOutput(prettified);
    } catch (err) {
      setError("Error: " + err.message);
      setOutput("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          JSON Prettify
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Format JSON data for enhanced readability with proper indentation and
          structure.
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
            JSON Input
          </label>
          <textarea
            id="input"
            rows={6}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"John","age":30,"city":"New York"}'
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={handlePrettify}
            className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
          >
            Prettify JSON
          </button>
        </div>

        <div>
          <label
            htmlFor="output"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Formatted JSON
          </label>
          <textarea
            id="output"
            rows={10}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
