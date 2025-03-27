"use client";

import crypto from "crypto";
import { useState } from "react";

export default function SHA512Hash() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const generateHash = () => {
    if (!input) return;

    try {
      const hash = crypto.createHash("sha512").update(input).digest("hex");
      setOutput(hash);
    } catch (error) {
      console.error("Error generating SHA-512 hash:", error);
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
        SHA-512 Hash Generator
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
            className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
          >
            Generate SHA-512 Hash
          </button>
        </div>

        {output && (
          <div>
            <label
              htmlFor="output"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              SHA-512 Hash Result
            </label>
            <div className="relative">
              <textarea
                id="output"
                rows={3}
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
