"use client";

import { useState } from "react";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      // Parse JSON input
      const jsonData = JSON.parse(input);

      // Check if it's an array of objects
      if (!Array.isArray(jsonData)) {
        setError("Input must be an array of objects");
        return;
      }

      // Get headers from the first object
      const headers = Object.keys(jsonData[0]);

      // Create CSV header row
      let csv = headers.join(",") + "\n";

      // Add data rows
      jsonData.forEach((item) => {
        const row = headers
          .map((header) => {
            // Handle nested objects and arrays
            const cell = item[header];
            if (typeof cell === "object" && cell !== null) {
              return '"' + JSON.stringify(cell).replace(/"/g, '""') + '"';
            }
            // Escape quotes and handle commas
            return typeof cell === "string"
              ? '"' + cell.replace(/"/g, '""') + '"'
              : cell;
          })
          .join(",");
        csv += row + "\n";
      });

      setOutput(csv);
    } catch (err) {
      setError("Error: " + err.message);
      setOutput("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          JSON to CSV Converter
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Convert JSON data to CSV format for easier data analysis and
          manipulation.
        </p>
      </div>

      <div className="mb-4">
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
            placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={handleConvert}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Convert to CSV
          </button>
        </div>

        <div>
          <label
            htmlFor="output"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            CSV Result
          </label>
          <textarea
            id="output"
            rows={6}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
