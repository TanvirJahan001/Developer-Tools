"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import PrimaryButton from "../../components/PrimaryButton";
import Base64Encoder from "./components/Base64Encoder";
import HexToRgb from "./components/HexToRgb";
import JsonToCsv from "./components/JsonToCsv";
import UrlEncoder from "./components/UrlEncoder";
import YamlToJson from "./components/YamlToJson";

export default function DataFormat() {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case "url-encoder":
        return <UrlEncoder />;
      case "base64-encoder":
        return <Base64Encoder />;
      case "json-to-csv":
        return <JsonToCsv />;
      case "yaml-to-json":
        return <YamlToJson />;
      case "hex-to-rgb":
        return <HexToRgb />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {activeTool ? (
          <div className="mt-8">
            <button
              onClick={() => setActiveTool(null)}
              className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              ← Back to Tools
            </button>
            {renderTool()}
          </div>
        ) : (
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* URL Encoder/Decoder */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        URL Encoder/Decoder
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Encode or decode URLs for web compatibility.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("url-encoder")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Base64 Encode/Decode */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Base64 Encode/Decode
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Encodes data to Base64 or decodes Base64 data back to its original form.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("base64-encoder")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* JSON to CSV */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zM9 17v-6M15 17v-6M9 14h6"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        JSON to CSV
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Convert JSON data to CSV format for easier data analysis and manipulation.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("json-to-csv")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* YAML to JSON */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        YAML to JSON
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Convert YAML data format to JSON format easily.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("yaml-to-json")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Hex to RGB */}
            <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        HEX to RGB Converter
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Convert HEX color codes to RGB format with preview.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("hex-to-rgb")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
