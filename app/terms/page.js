"use client";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Service
          </h1>
          <div className="prose dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              Usage Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              By using DevTools, you agree to these terms. Our tools are provided &quot;as is&quot; without any warranties.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              Limitations
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We are not responsible for any damages that may occur from using our tools. Users are responsible for validating results.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
              Fair Use
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please use our tools responsibly. We reserve the right to limit access in cases of abuse.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}