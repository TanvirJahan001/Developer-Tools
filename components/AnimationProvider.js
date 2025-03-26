"use client";
import { motion } from "framer-motion";
import { createContext, useContext, useState } from "react";

// Animation variants for consistent use across components
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
};

export const slideIn = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { x: -20, opacity: 0, transition: { duration: 0.2 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardHover = {
  rest: { scale: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  hover: { scale: 1.03, transition: { duration: 0.2, ease: "easeInOut" } },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
};

// Animation context for global animation settings
const AnimationContext = createContext({
  animationsEnabled: true,
  toggleAnimations: () => {},
});

export function useAnimations() {
  return useContext(AnimationContext);
}

export function AnimationProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev);
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}

// Animated components
export const AnimatedSection = ({ children, className, delay = 0 }) => {
  const { animationsEnabled } = useAnimations();

  return animationsEnabled ? (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  ) : (
    <div className={className}>{children}</div>
  );
};

export const AnimatedCard = ({ children, className }) => {
  const { animationsEnabled } = useAnimations();

  return animationsEnabled ? (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className={className}
    >
      {children}
    </motion.div>
  ) : (
    <div className={className}>{children}</div>
  );
};

export const AnimatedButton = ({ children, className, onClick }) => {
  const { animationsEnabled } = useAnimations();

  return animationsEnabled ? (
    <motion.button
      initial="rest"
      whileHover="hover"
      variants={buttonHover}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  ) : (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
