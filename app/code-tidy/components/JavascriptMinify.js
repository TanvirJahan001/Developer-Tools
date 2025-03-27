"use client";
import { useState } from "react";

export default function JavascriptMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  const minifyJs = () => {
    if (!input.trim()) {
      setError("Please enter JavaScript code to minify");
      return;
    }

    try {
      // Basic JavaScript minification
      let minified = input
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/^\s+|\s+$/g, '') // Trim start and end
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*=\s*/g, '=');

      // Calculate statistics
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      const savings = originalSize - minifiedSize;
      const percentage = ((savings / originalSize) * 100).toFixed(1);

      setStats({
        originalSize,
        minifiedSize,
        savings,
        percentage
      });

      setOutput(minified);
      setError("");
    } catch (err) {
      setError("Error minifying JavaScript: " + err.message);
      setOutput("");
      setStats(null);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minified.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          JavaScript Minifier
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Minify JavaScript code to reduce file size and improve loading times.
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          JavaScript Input
        </label>
        <textarea
          id="input"
          rows={6}
          className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 font-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="function example() { console.log('Hello, World!'); }"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={minifyJs}
          className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
        >
          Minify JavaScript
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {stats && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Original Size</p>
              <p className="font-medium text-gray-900 dark:text-white">{stats.originalSize} bytes</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Minified Size</p>
              <p className="font-medium text-gray-900 dark:text-white">{stats.minifiedSize} bytes</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Savings</p>
              <p className="font-medium text-gray-900 dark:text-white">{stats.savings} bytes</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Reduction</p>
              <p className="font-medium text-gray-900 dark:text-white">{stats.percentage}%</p>
            </div>
          </div>
        </div>
      )}

      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Minified Output
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
            className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
      )}
    </div>
  );
}

