import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export function AnimatedComingSoonButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Animation for the loading dots
  const loadingVariants = {
    animate: {
      opacity: [0.2, 1, 0.2],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  };

  const shimmerVariants = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    animate: {
      x: "100%",
      opacity: 0.5,
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  };

  const glowVariants = {
    initial: {
      opacity: 0.3,
    },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const particleVariants = {
    initial: {
      y: 0,
      opacity: 0,
    },
    animate: (i: number) => ({
      y: -10,
      opacity: [0, 0.8, 0],
      transition: {
        duration: 1.5 + Math.random() * 0.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-0.5 rounded-sm bg-gradient-to-r from-teal-400/30 via-teal-300/30 to-teal-400/30 blur-sm"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />

      <motion.button
        className={cn(
          "relative px-6 py-2.5 bg-teal-800/40 backdrop-blur-sm border border-teal-500/30",
          "text-teal-100 font-sans font-light tracking-wide rounded-sm overflow-hidden",
          "transition-all duration-300 hover:bg-teal-700/40 hover:border-teal-400/40"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-teal-300/10 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />

        <div className="flex items-center justify-center gap-1.5">
          <span>Coming Soon</span>

          <div className="flex items-center gap-0.5 ml-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-teal-300 rounded-full"
                variants={loadingVariants}
                animate="animate"
                custom={i}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-teal-300/60 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  bottom: "0",
                }}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                custom={i}
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
}
