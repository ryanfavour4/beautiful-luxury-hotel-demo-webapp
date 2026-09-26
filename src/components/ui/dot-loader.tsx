import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";

export function DotsBounceFadeLoader() {
  const dotVariants: Variants = {
    animate: {
      y: [0, -4, 0],

      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="ml-2 flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-gray-600"
          variants={dotVariants}
          animate="animate"
          transition={{
            delay: i * 0.2, // stagger timing
          }}
        />
      ))}
    </div>
  );
}

export function CountingDots() {
  const frames = [".", "..", "...", "..", "."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, 350); // adjust speed as you like (300–500ms is perfect)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span className="ml-1 font-mono text-gray-700">{frames[index]}</span>;
}
