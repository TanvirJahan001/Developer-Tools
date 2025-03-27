"use client";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          <div className="prose dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              Data Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              All tools on DevTools operate entirely in your browser. We do not collect, store, or transmit your data to any servers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use anonymous analytics to understand how our tools are used and improve them. This data cannot be used to identify individual users.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use essential cookies to remember your preferences (like dark mode). No tracking cookies are used.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}