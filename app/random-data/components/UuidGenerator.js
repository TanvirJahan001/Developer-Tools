"use client";
import { useState } from "react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState("v4");

  // Function to generate a UUID v4 (random)
  const generateUUIDv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  // Function to generate a UUID v1 (timestamp-based)
  const generateUUIDv1 = () => {
    // This is a simplified version - in production, use a library
    const now = new Date().getTime();
    const timeStr = now.toString(16).padStart(12, "0");
    return `${timeStr.slice(0, 8)}-${timeStr.slice(8, 12)}-1${timeStr.slice(
      12,
      15
    )}-${Math.floor(Math.random() * 4 + 8).toString(16)}${Math.random()
      .toString(16)
      .slice(2, 5)}-${Math.random().toString(16).slice(2, 14)}`;
  };

  const handleGenerate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      if (version === "v4") {
        newUuids.push(generateUUIDv4());
      } else {
        newUuids.push(generateUUIDv1());
      }
    }
    setUuids(newUuids);
  };

  const handleCopy = (uuid) => {
    navigator.clipboard
      .writeText(uuid)
      .then(() => {
        // You could add a toast notification here
        console.log("UUID copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCopyAll = () => {
    navigator.clipboard
      .writeText(uuids.join("\n"))
      .then(() => {
        console.log("All UUIDs copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy all: ", err);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          UUID Generator
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Generate unique identifiers for various applications and systems.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="count"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Count
            </label>
            <input
              type="number"
              id="count"
              min="1"
              max="100"
              value={count}
              onChange={(e) =>
                setCount(
                  Math.min(100, Math.max(1, parseInt(e.target.value) || 1))
                )
              }
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="version"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Version
            </label>
            <select
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="v4">UUID v4 (Random)</option>
              <option value="v1">UUID v1 (Timestamp)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Generate UUID{count > 1 ? "s" : ""}
        </button>
      </div>

      {uuids.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">
              Generated UUIDs
            </h3>
            {uuids.length > 1 && (
              <button
                onClick={handleCopyAll}
                className="text-sm text-primary hover:text-primary/80 focus:outline-none"
              >
                Copy All
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                  {uuid}
                </code>
                <button
                  onClick={() => handleCopy(uuid)}
                  className="text-xs text-primary hover:text-primary/80 focus:outline-none"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
