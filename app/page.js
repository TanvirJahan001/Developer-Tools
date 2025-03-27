"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundSwitcher } from "../components/BackgroundSwitcher";
import Layout from "../components/Layout";

export default function Home() {
  // Animation variants
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // AnimatedButton component
  const AnimatedButton = motion.button;

  // AnimatedSection component
  const AnimatedSection = motion.section;

  const toolCategories = [
    {
      title: "Code Tidy",
      description: "Format, prettify, and minify your code with ease",
      icon: "code",
      href: "/code-tidy",
      gradient: "from-blue-500 to-cyan-400",
      tools: [
        "JSON Prettify",
        "HTML Prettify",
        "CSS Minify",
        "JavaScript Minify",
        "XML Prettify",
      ],
    },
    {
      title: "Data Format",
      description: "Convert between different data formats seamlessly",
      icon: "data",
      href: "/data-format",
      gradient: "from-purple-500 to-pink-400",
      tools: [
        "URL Encoder/Decoder",
        "Base64 Encode/Decode",
        "JSON to CSV",
        "YAML to JSON",
        "HEX to RGB",
      ],
    },
    {
      title: "Random Data & Password",
      description: "Generate secure passwords and random data",
      icon: "random",
      href: "/random-data",
      gradient: "from-emerald-500 to-teal-400",
      tools: [
        "UUID Generator",
        "Random Number Generator",
        "Password Generator",
        "Random String Generator",
      ],
    },
    {
      title: "Security Tools",
      description: "Hash generators and security utilities",
      icon: "security",
      href: "/security-tools",
      gradient: "from-orange-500 to-amber-400",
      tools: [
        "MD5 Hash Generator",
        "SHA-256 Hash Generator",
        "SHA-512 Hash Generator",
        "CRC32 Hash Generator",
      ],
    },
    {
      title: "Utilities",
      description: "Helpful tools for everyday development tasks",
      icon: "utility",
      href: "/utilities",
      gradient: "from-rose-500 to-red-400",
      tools: [
        "Word Counter",
        "Timestamp Converter",
        "Lorem Ipsum Generator",
        "Regex Tester",
        "Diff Checker",
        "URL Parser",
      ],
    },
    {
      title: "Image Tools",
      description: "Convert, compress and optimize images for web",
      icon: "image",
      href: "/image-tools",
      gradient: "from-green-500 to-lime-400",
      tools: [
        "Image Converter",
        "Image Compressor",
        "Image Resizer",
        "Format Converter",
        "Bulk Processing"
      ],
    },
  ];

  const renderIcon = (iconName) => {
    const icons = {
      code: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      ),
      data: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      ),
      random: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      utility: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
      ),
      image: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
    };
    return icons[iconName];
  };

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        {/* Dynamic Background Switcher with Parallax */}
        <BackgroundSwitcher />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                variants={slideUp}
              >
                Developer Tools
                <motion.span
                  className="block text-3xl md:text-4xl mt-4 text-gray-200"
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  All-in-One Solution
                </motion.span>
              </motion.h1>
              <motion.p
                className="mt-6 text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
                variants={slideUp}
                transition={{ delay: 0.5 }}
              >
                Your all-in-one toolkit for modern web development. Simplify
                your workflow with our comprehensive suite of development tools.
              </motion.p>
              <motion.div
                className="mt-8 flex gap-4 justify-center"
                variants={fadeIn}
                transition={{ delay: 0.7 }}
              >
                <AnimatedButton
                  className="px-6 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                  onClick={() =>
                    document
                      .querySelector("#tools")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    Explore Tools
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </AnimatedButton>
                <AnimatedButton
                  className="px-6 py-3 text-sm font-medium rounded-lg border border-white text-white backdrop-blur-sm bg-white/5 shadow-md shadow-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                  onClick={() =>
                    document
                      .querySelector("#features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                >
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Why Choose Our Tools?
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Built with modern development workflows in mind
            </p>
          </AnimatedSection>

          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="relative group"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-25 group-hover:opacity-100 transition-opacity blur" />
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All tools run directly in your browser for instant results and
                  maximum privacy.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-25 group-hover:opacity-100 transition-opacity blur" />
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                  <svg
                    className="w-6 h-6"
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
                <h3 className="text-xl font-semibold mb-3">Secure by Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your data never leaves your device. Everything is processed
                  locally.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-25 group-hover:opacity-100 transition-opacity blur" />
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Always Updated</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Regular updates ensure compatibility with the latest web
                  standards.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tools Section */}
      <div id="tools" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Developer Tools
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Everything you need, all in one place
            </p>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {toolCategories.map((category) => (
              <motion.div
                key={category.title}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-white dark:bg-gray-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {renderIcon(category.icon)}
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {category.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                      {category.tools.length > 3 && (
                        <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          +{category.tools.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={category.href}
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md text-primary border border-primary/20 hover:bg-primary/10 hover:text-white hover:border-primary transition-all duration-300 group"
                  >
                    <span className="relative z-10">Explore</span>
                    <svg
                      className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </Layout>
  );
}

export const generateMetadata = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Developer Tools",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Code formatting",
      "Data conversion",
      "Security tools",
      "Image processing"
    ]
  };

  return {
    other: {
      'script:ld+json': JSON.stringify(jsonLd),
    },
  };
};


