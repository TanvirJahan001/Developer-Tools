"use client";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            About Us
          </h1>
          <div className="prose dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Welcome to DevTools, your comprehensive suite of developer tools designed to streamline your workflow and enhance productivity.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We strive to provide developers with reliable, efficient, and user-friendly tools that make development tasks easier and more enjoyable.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              What We Offer
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>Free, browser-based developer tools</li>
              <li>Secure, client-side processing</li>
              <li>Regular updates and new features</li>
              <li>Community-driven development</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}