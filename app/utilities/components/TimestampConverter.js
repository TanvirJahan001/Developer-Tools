"use client";

import { useState } from "react";

export default function TimestampConverter() {
  const [input, setInput] = useState("");
  const [inputFormat, setInputFormat] = useState("unix");
  const [outputFormat, setOutputFormat] = useState("iso");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formats = {
    unix: { label: "Unix Timestamp (seconds)", example: "1704067200" },
    unixms: { label: "Unix Timestamp (milliseconds)", example: "1704067200000" },
    iso: { label: "ISO 8601", example: "2024-01-01T00:00:00Z" },
    rfc: { label: "RFC 2822", example: "Mon, 01 Jan 2024 00:00:00 GMT" },
    human: { label: "Human Readable", example: "January 1, 2024 00:00:00" },
  };

  const convertTimestamp = () => {
    if (!input.trim()) {
      setError("Please enter a timestamp");
      setOutput("");
      return;
    }

    try {
      let date;

      // Parse input based on format
      switch (inputFormat) {
        case "unix":
          date = new Date(parseInt(input) * 1000);
          break;
        case "unixms":
          date = new Date(parseInt(input));
          break;
        case "iso":
          date = new Date(input);
          break;
        case "rfc":
          date = new Date(input);
          break;
        case "human":
          date = new Date(input);
          break;
        default:
          throw new Error("Invalid input format");
      }

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      // Convert to output format
      let result;
      switch (outputFormat) {
        case "unix":
          result = Math.floor(date.getTime() / 1000).toString();
          break;
        case "unixms":
          result = date.getTime().toString();
          break;
        case "iso":
          result = date.toISOString();
          break;
        case "rfc":
          result = date.toUTCString();
          break;
        case "human":
          result = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          });
          break;
        default:
          throw new Error("Invalid output format");
      }

      setOutput(result);
      setError("");
    } catch (err) {
      setError("Invalid timestamp format");
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    let value;
    
    switch (inputFormat) {
      case "unix":
        value = Math.floor(now.getTime() / 1000).toString();
        break;
      case "unixms":
        value = now.getTime().toString();
        break;
      case "iso":
        value = now.toISOString();
        break;
      case "rfc":
        value = now.toUTCString();
        break;
      case "human":
        value = now.toLocaleString("en-US");
        break;
      default:
        value = "";
    }
    
    setInput(value);
    setError("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Input Format
            </label>
            <button
              onClick={getCurrentTimestamp}
              className="text-sm text-primary hover:text-primary-dark"
            >
              Use Current Time
            </button>
          </div>
          <select
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {Object.entries(formats).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Timestamp
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={formats[inputFormat].example}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output Format
          </label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {Object.entries(formats).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convertTimestamp}
          className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
        >
          Convert Timestamp
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Result
              </label>
              <button
                onClick={handleCopy}
                className="text-sm text-primary hover:text-primary-dark"
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
            <input
              readOnly
              value={output}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
            />
          </div>
        )}
      </div>
    </div>
  );
}
