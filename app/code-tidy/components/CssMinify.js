"use client";
import { useState } from "react";

export default function CssMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  const minifyCss = () => {
    if (!input.trim()) {
      setError("Please enter CSS code to minify");
      return;
    }

    try {
      // Remove comments
      let minified = input.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");

      // Remove whitespace before and after brackets
      minified = minified.replace(/\s*{\s*/g, "{");
      minified = minified.replace(/\s*}\s*/g, "}");

      // Remove whitespace before and after colons and semicolons
      minified = minified.replace(/\s*:\s*/g, ":");
      minified = minified.replace(/\s*;\s*/g, ";");

      // Remove whitespace after commas
      minified = minified.replace(/\s*,\s*/g, ",");

      // Remove semicolons before closing braces
      minified = minified.replace(/;\}/g, "}");

      // Remove multiple spaces and line breaks
      minified = minified.replace(/\s+/g, " ").trim();

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
      setError("Error minifying CSS: " + err.message);
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
    const blob = new Blob([output], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "minified.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          CSS Minify
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Minify your CSS code by removing unnecessary characters and whitespace to reduce file size.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input CSS
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSS code here..."
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            spellCheck="false"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={minifyCss}
            className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
          >
            Minify CSS
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Original</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatBytes(stats.originalSize)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Minified</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatBytes(stats.minifiedSize)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Saved</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatBytes(stats.savings)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Reduction</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.percentage}%
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
    </div>
  );
}

