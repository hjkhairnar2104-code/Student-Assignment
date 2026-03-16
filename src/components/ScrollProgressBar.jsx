import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgressBar — a thin 2px indigo→violet gradient bar that fills
 * as the user scrolls down the page. Lives at the very top of the viewport.
 */
export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
            }}
        />
    );
}
