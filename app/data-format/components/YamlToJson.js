"use client";

import { useState } from "react";
import jsYaml from "js-yaml";

export default function YamlToJson() {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [formatOutput, setFormatOutput] = useState(true);

  const convertYamlToJson = () => {
    if (!yamlInput.trim()) {
      setError("Please enter YAML data");
      return;
    }

    try {
      setError("");
      const jsonData = jsYaml.load(yamlInput);
      const output = formatOutput
        ? JSON.stringify(jsonData, null, 2)
        : JSON.stringify(jsonData);
      setJsonOutput(output);
    } catch (err) {
      setError("Invalid YAML syntax: " + err.message);
      setJsonOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Example YAML for users to try
  const exampleYaml = `# Example YAML
server:
  host: example.com
  port: 8080
  settings:
    timeout: 30
    retry: true

users:
  - name: John Doe
    role: admin
    active: true
  - name: Jane Smith
    role: user
    active: false

database:
  url: mongodb://localhost
  credentials:
    username: dbuser
    password: secret`;

  const loadExample = () => {
    setYamlInput(exampleYaml);
    setError("");
    setJsonOutput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            YAML Input
          </label>
          <button
            onClick={loadExample}
            className="text-sm text-primary hover:text-primary-dark"
          >
            Load Example
          </button>
        </div>
        <textarea
          value={yamlInput}
          onChange={(e) => setYamlInput(e.target.value)}
          className="w-full h-48 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
          placeholder="Paste your YAML here..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="formatOutput"
          checked={formatOutput}
          onChange={(e) => setFormatOutput(e.target.checked)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label
          htmlFor="formatOutput"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Format JSON output (pretty print)
        </label>
      </div>

      <button
        onClick={convertYamlToJson}
        className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
      >
        Convert to JSON
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      {jsonOutput && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON Output
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
                Download JSON
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={jsonOutput}
            className="w-full h-48 p-4 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
          />
        </div>
      )}

      {jsonOutput && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Input size: {yamlInput.length} characters
          <br />
          Output size: {jsonOutput.length} characters
        </div>
      )}
    </div>
  );
}

