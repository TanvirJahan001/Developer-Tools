"use client";

import { useState } from "react";

export default function CRC32Hash() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const generateHash = () => {
    if (!input) return;

    try {
      // CRC32 implementation
      const crc32 = (str) => {
        const table = [];
        let c;
        for (let n = 0; n < 256; n++) {
          c = n;
          for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
          }
          table[n] = c;
        }

        let crc = 0 ^ -1;
        for (let i = 0; i < str.length; i++) {
          crc = (crc >>> 8) ^ table[(crc ^ str.charCodeAt(i)) & 0xff];
        }
        return (crc ^ -1) >>> 0;
      };

      const hash = crc32(input).toString(16).padStart(8, "0");
      setOutput(hash);
    } catch (error) {
      console.error("Error generating CRC32 hash:", error);
      setOutput("Error generating hash");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        CRC32 Hash Generator
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Input Text
          </label>
          <textarea
            id="input"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
            placeholder="Enter text to hash..."
            value={input}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={generateHash}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Generate CRC32 Hash
          </button>
        </div>

        {output && (
          <div>
            <label
              htmlFor="output"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              CRC32 Hash Result
            </label>
            <div className="relative">
              <textarea
                id="output"
                rows={1}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                value={output}
                readOnly
              />
              <button
                onClick={handleCopy}
                className="absolute right-2 top-2 p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                title="Copy to clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
