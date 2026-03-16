import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * useParallax — wraps framer-motion's useScroll + useTransform for clean
 * parallax offsets on any element.
 *
 * Usage:
 *   const { ref, y } = useParallax(80);   // moves 80px up during scroll
 *   <motion.div ref={ref} style={{ y }}>…</motion.div>
 *
 * @param {number} distance  px to shift over the element's scroll range
 * @param {string} direction "y" | "x"
 */
export default function useParallax(distance = 60, direction = "y") {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const offset = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
    return { ref, [direction]: offset };
}
