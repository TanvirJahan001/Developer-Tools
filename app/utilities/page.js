"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import PrimaryButton from "../../components/PrimaryButton";
import DiffChecker from "./components/DiffChecker";
import LoremIpsumGenerator from "./components/LoremIpsum";
import RegexTester from "./components/RegexTester";
import TimestampConverter from "./components/TimestampConverter";
import UrlParser from "./components/UrlParser";
import WordCounter from "./components/WordCounter";

export default function Utilities() {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case "word-counter":
        return <WordCounter />;
      case "timestamp-converter":
        return <TimestampConverter />;
      case "lorem-ipsum":
        return <LoremIpsumGenerator />;
      case "regex-tester":
        return <RegexTester />;
      case "diff-checker":
        return <DiffChecker />;
      case "url-parser":
        return <UrlParser />;
      default:
        return null;
    }
  };

  const tools = [
    {
      id: "word-counter",
      name: "Word Counter",
      description: "Count words, characters, and paragraphs in your text.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
    },
    {
      id: "timestamp-converter",
      name: "Timestamp Converter",
      description: "Convert between different timestamp formats and timezones.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      id: "lorem-ipsum",
      name: "Lorem Ipsum Generator",
      description: "Generate Lorem Ipsum placeholder text with various options.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h7"
        />
      ),
    },
    {
      id: "regex-tester",
      name: "Regex Tester",
      description: "Test and validate regular expressions with real-time matching.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      ),
    },
    {
      id: "diff-checker",
      name: "Diff Checker",
      description: "Compare two texts and highlight the differences.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      ),
    },
    {
      id: "url-parser",
      name: "URL Parser",
      description: "Parse and analyze URL components and query parameters.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      ),
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Utilities
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Helpful tools for everyday development tasks
          </p>
        </div>

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
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg transition-all hover:shadow-lg"
              >
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
                          {tool.icon}
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                          {tool.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <PrimaryButton onClick={() => setActiveTool(tool.id)}>
                      Use Tool
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
