import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticElement — OPTIMIZED with useMotionValue + useSpring.
 * No setState means no React re-renders on mousemove.
 */
export default function MagneticElement({
    children,
    className = "",
    stiffness = 300,
    damping = 15,
    mass = 0.5,
}) {
    const ref = useRef(null);

    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);

    const x = useSpring(mvX, { stiffness, damping, mass });
    const y = useSpring(mvY, { stiffness, damping, mass });

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        mvX.set((e.clientX - (left + width / 2)) * 0.3);
        mvY.set((e.clientY - (top + height / 2)) * 0.3);
    };

    const reset = () => {
        mvX.set(0);
        mvY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ position: "relative", x, y }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={className}
        >
            {children}
        </motion.div>
    );
}
