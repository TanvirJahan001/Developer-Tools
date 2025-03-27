"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import PrimaryButton from "../../components/PrimaryButton";
import PasswordGenerator from "./components/PasswordGenerator";
import UuidGenerator from "./components/UuidGenerator";
import RandomNumber from "./components/RandomNumber";
import RandomString from "./components/RandomString";

export default function RandomData() {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case "uuid-generator":
        return <UuidGenerator />;
      case "random-number":
        return <RandomNumber />;
      case "password-generator":
        return <PasswordGenerator />;
      case "random-string":
        return <RandomString />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Random Data & Password Tools
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Generate secure passwords and random data
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
            {/* UUID Generator */}
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
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        UUID Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate random UUIDs (v4) with options for formatting and batch generation.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("uuid-generator")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Random Number Generator */}
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
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Random Number Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate random numbers with custom ranges and options.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("random-number")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Password Generator */}
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Password Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Create strong, secure passwords with customizable options.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("password-generator")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* Random String Generator */}
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
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        Random String Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate random strings with custom length and character sets.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("random-string")}>
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
