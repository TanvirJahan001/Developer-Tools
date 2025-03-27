"use client";

import { useState } from "react";

export default function DiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [differences, setDifferences] = useState([]);
  const [error, setError] = useState("");

  const compareDiff = () => {
    if (!text1.trim() || !text2.trim()) {
      setError("Please provide text in both fields");
      setDifferences([]);
      return;
    }

    setError("");
    
    // Split texts into lines
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    
    // Compare lines and find differences
    const diffs = [];
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";
      
      if (line1 !== line2) {
        diffs.push({
          lineNumber: i + 1,
          text1: line1,
          text2: line2,
          type: !line1 ? "added" : !line2 ? "removed" : "modified"
        });
      }
    }
    
    setDifferences(diffs);
  };

  const handleClear = () => {
    setText1("");
    setText2("");
    setDifferences([]);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text 1
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-64 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
            placeholder="Enter first text here..."
          />
        </div>

        {/* Second Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text 2
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-64 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
            placeholder="Enter second text here..."
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={compareDiff}
          className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
        >
          Compare Differences
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-gray-700 dark:text-gray-200 transition-all duration-300 ease-in-out rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {differences.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Differences Found ({differences.length})
          </h3>
          <div className="space-y-4">
            {differences.map((diff, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
              >
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Line {diff.lineNumber} - {diff.type.charAt(0).toUpperCase() + diff.type.slice(1)}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 flex-shrink-0 text-red-500">-</div>
                    <pre className="flex-1 font-mono text-sm whitespace-pre-wrap text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {diff.text1}
                    </pre>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-8 flex-shrink-0 text-green-500">+</div>
                    <pre className="flex-1 font-mono text-sm whitespace-pre-wrap text-green-500 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                      {diff.text2}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
