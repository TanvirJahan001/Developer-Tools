"use client";

import { useState } from "react";

export default function UrlParser() {
  const [url, setUrl] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState("");

  const parseUrl = () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      setParsedData(null);
      return;
    }

    try {
      const parsedUrl = new URL(url);
      
      // Parse query parameters
      const queryParams = {};
      parsedUrl.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      // Create parsed data object
      const parsed = {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || "default",
        pathname: parsedUrl.pathname,
        search: parsedUrl.search,
        hash: parsedUrl.hash,
        origin: parsedUrl.origin,
        host: parsedUrl.host,
        queryParameters: queryParams,
      };

      setParsedData(parsed);
      setError("");
    } catch (err) {
      setError("Invalid URL format");
      setParsedData(null);
    }
  };

  const handleExampleUrl = () => {
    setUrl("https://example.com:8080/path/to/page?name=John&age=25#section1");
    setError("");
    setParsedData(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          URL Parser
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Parse and analyze URL components and query parameters.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter URL
            </label>
            <button
              onClick={handleExampleUrl}
              className="text-sm text-primary hover:text-primary-dark"
            >
              Use Example URL
            </button>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
          />
        </div>

        <button
          onClick={parseUrl}
          className="group relative inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary active:scale-95 shadow-lg hover:shadow-xl"
        >
          Parse URL
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        {parsedData && (
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Parsed Components
            </h3>
            
            {Object.entries(parsedData).map(([key, value]) => {
              if (key === "queryParameters") {
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Query Parameters
                      </h4>
                    </div>
                    {Object.keys(value).length > 0 ? (
                      Object.entries(value).map(([paramKey, paramValue]) => (
                        <div
                          key={paramKey}
                          className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded"
                        >
                          <span className="text-sm font-mono">
                            {paramKey}: {paramValue}
                          </span>
                          <button
                            onClick={() => copyToClipboard(paramValue)}
                            className="text-xs text-primary hover:text-primary-dark"
                          >
                            Copy
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        No query parameters
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={key}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <span className="ml-2 font-mono text-sm">
                      {value || "(empty)"}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value)}
                    className="text-xs text-primary hover:text-primary-dark"
                  >
                    Copy
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
