'use client';
import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

const Counter = ({ from = 0, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { 
      duration: duration,
      ease: "easeOut" 
    });

    return () => controls.stop();
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
};

export default Counter;