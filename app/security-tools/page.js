"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import PrimaryButton from "../../components/PrimaryButton";
import CRC32Hash from "./components/CRC32Hash";
import MD5Hash from "./components/MD5Hash";
import SHA256Hash from "./components/SHA256Hash";
import SHA512Hash from "./components/SHA512Hash";

export default function SecurityTools() {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case "md5-hash":
        return <MD5Hash />;
      case "sha256-hash":
        return <SHA256Hash />;
      case "sha512-hash":
        return <SHA512Hash />;
      case "crc32-hash":
        return <CRC32Hash />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Security Tools
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Hash generators and security utilities
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
            {/* MD5 Hash */}
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
                        MD5 Hash Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate MD5 hashes for quick data verification and legacy systems.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("md5-hash")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* SHA-256 Hash */}
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        SHA-256 Hash Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate SHA-256 hashes for secure cryptographic operations.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("sha256-hash")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* SHA-512 Hash */}
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
                        SHA-512 Hash Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate SHA-512 hashes for enhanced security and data integrity.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("sha512-hash")}>
                    Use Tool
                  </PrimaryButton>
                </div>
              </div>
            </div>

            {/* CRC32 Hash */}
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
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        CRC32 Hash Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate CRC32 checksums for error detection and data verification.
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <PrimaryButton onClick={() => setActiveTool("crc32-hash")}>
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
