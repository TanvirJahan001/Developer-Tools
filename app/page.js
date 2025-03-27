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

  // AnimatedSection component
  const AnimatedSection = motion.section;

  // Add statistics data
  const statistics = [
    { number: "30+", label: "Developer Tools" },
    { number: "100%", label: "Free" },
    { number: "24/7", label: "Available" },
    { number: "0", label: "Ads" },
  ];

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
      security: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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
        <BackgroundSwitcher />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                variants={slideUp}
              >
                <span className="block">Developer Tools</span>
                <span className="block text-blue-400">All in One Place</span>
              </motion.h1>
              
              <motion.p
                className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
                variants={slideUp}
              >
                Your complete toolkit for modern web development. Format code, convert data,
                generate passwords, and much more.
              </motion.p>
              
              <motion.div
                className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
                variants={slideUp}
              >
                <div className="rounded-md shadow">
                  <Link
                    href="#tools"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Explore Tools
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 
              variants={slideUp}
              className="text-3xl font-bold text-white mb-8"
            >
              Why Choose Our Developer Tools?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                variants={slideUp}
                className="p-6 bg-gray-800 rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-300">All tools run directly in your browser for instant results</p>
              </motion.div>

              <motion.div 
                variants={slideUp}
                className="p-6 bg-gray-800 rounded-lg"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
                <p className="text-gray-300">Your data never leaves your browser</p>
              </motion.div>

              <motion.div 
                variants={slideUp}
                className="p-6 bg-gray-800 rounded-lg"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">All-in-One</h3>
                <p className="text-gray-300">Everything you need in one place</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 
              variants={slideUp}
              className="text-3xl font-bold text-white mb-4"
            >
              Ready to Streamline Your Development?
            </motion.h2>
            <motion.p 
              variants={slideUp}
              className="text-xl text-gray-300 mb-8"
            >
              Start using our developer tools today - no sign up required!
            </motion.p>
            <motion.div variants={slideUp}>
              <Link
                href="#tools"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

