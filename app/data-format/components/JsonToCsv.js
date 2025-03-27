"use client";

import { useState } from "react";

export default function JsonToCsv() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const flattenObject = (obj, prefix = "") => {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? prefix + "." : "";
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };

  const convertJsonToCsv = () => {
    if (!jsonInput.trim()) {
      setError("Please enter JSON data");
      return;
    }

    if (!isValidJson(jsonInput)) {
      setError("Invalid JSON format");
      return;
    }

    try {
      setError("");
      const jsonData = JSON.parse(jsonInput);
      
      // Handle different JSON structures
      let arrayToProcess = [];
      if (Array.isArray(jsonData)) {
        arrayToProcess = jsonData;
      } else {
        arrayToProcess = [jsonData];
      }

      // Flatten nested objects
      const flattenedArray = arrayToProcess.map(item => flattenObject(item));

      // Get all unique headers
      const headers = [...new Set(
        flattenedArray.reduce((acc, item) => {
          return [...acc, ...Object.keys(item)];
        }, [])
      )];

      // Create CSV rows
      const csvRows = [
        headers.join(","), // Header row
        ...flattenedArray.map(item => {
          return headers.map(header => {
            const value = item[header] ?? "";
            // Handle special characters and commas
            return typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))
              ? `"${value.replace(/"/g, '""')}"` 
              : value;
          }).join(",");
        })
      ];

      const csv = csvRows.join("\n");
      setCsvOutput(csv);
    } catch (err) {
      setError("Error converting JSON to CSV: " + err.message);
      setCsvOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          JSON Input
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full h-48 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
          placeholder="Paste your JSON here..."
        />
      </div>

      <button
        onClick={convertJsonToCsv}
        className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
      >
        Convert to CSV
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      {csvOutput && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              CSV Output
            </label>
            <div className="space-x-4">
              <button
                onClick={handleCopy}
                className="text-sm text-primary hover:text-primary-dark"
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button
                onClick={handleDownload}
                className="text-sm text-primary hover:text-primary-dark"
              >
                Download CSV
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={csvOutput}
            className="w-full h-48 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
