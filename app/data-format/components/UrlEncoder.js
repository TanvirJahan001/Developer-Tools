"use client";

import { useState } from "react";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // 'encode' or 'decode'

  const handleEncodeDecode = () => {
    if (mode === "encode") {
      setOutput(encodeURIComponent(input));
    } else {
      try {
        setOutput(decodeURIComponent(input));
      } catch (error) {
        setOutput("Error: Invalid URL encoding");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          URL Encoder/Decoder
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Encode or decode URLs to ensure correct transmission over the
          internet.
        </p>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setMode("encode")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              mode === "encode"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              mode === "decode"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Input
          </label>
          <textarea
            id="input"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter text to encode"
                : "Enter text to decode"
            }
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleEncodeDecode}
            className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
          >
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </button>
        </div>

        <div>
          <label
            htmlFor="output"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Result
          </label>
          <textarea
            id="output"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
