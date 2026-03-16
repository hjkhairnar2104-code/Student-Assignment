import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CursorFollower — PERFORMANCE-OPTIMIZED version.
 * Uses useMotionValue + useSpring so position updates NEVER trigger
 * React re-renders. Framer Motion handles it entirely in its RAF loop.
 *
 * The outer ring lags behind the cursor with spring physics.
 * The inner dot follows almost instantly.
 */
export default function CursorFollower() {
    const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Raw mouse position (no React state — never re-renders)
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    // Outer ring: laggy spring
    const ringX = useSpring(mouseX, { stiffness: 110, damping: 20, mass: 0.6 });
    const ringY = useSpring(mouseY, { stiffness: 110, damping: 20, mass: 0.6 });

    // Inner dot: very fast spring
    const dotX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.15 });
    const dotY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.15 });

    const hoverRef = useRef(false);
    const ringRef = useRef(null);

    useEffect(() => {
        if (isCoarse || isReduced) return;

        const onMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const onOver = (e) => {
            const isInteractive = e.target.closest("button, a, input, textarea, select, [data-cursor-grow]");
            if (!ringRef.current) return;
            if (isInteractive && !hoverRef.current) {
                hoverRef.current = true;
                ringRef.current.style.width = "44px";
                ringRef.current.style.height = "44px";
                ringRef.current.style.borderColor = "rgba(99,102,241,0.8)";
                ringRef.current.style.backgroundColor = "rgba(99,102,241,0.06)";
                ringRef.current.style.marginLeft = "-22px";
                ringRef.current.style.marginTop = "-22px";
            } else if (!isInteractive && hoverRef.current) {
                hoverRef.current = false;
                ringRef.current.style.width = "36px";
                ringRef.current.style.height = "36px";
                ringRef.current.style.borderColor = "rgba(99,102,241,0.45)";
                ringRef.current.style.backgroundColor = "transparent";
                ringRef.current.style.marginLeft = "-18px";
                ringRef.current.style.marginTop = "-18px";
            }
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
        };
    }, [mouseX, mouseY, isCoarse, isReduced]);

    if (isCoarse || isReduced) return null;

    return (
        <>
            {/* Outer ring — spring lag, no re-renders */}
            <motion.div
                ref={ringRef}
                className="pointer-events-none fixed z-[9999] rounded-full border transition-[width,height,border-color,background-color] duration-200"
                style={{
                    x: ringX,
                    y: ringY,
                    width: 36,
                    height: 36,
                    marginLeft: -18,
                    marginTop: -18,
                    borderColor: "rgba(99,102,241,0.45)",
                    borderWidth: 1.5,
                    top: 0,
                    left: 0,
                }}
            />
            {/* Inner dot — instant follow */}
            <motion.div
                className="pointer-events-none fixed z-[9999] rounded-full bg-indigo-500"
                style={{
                    x: dotX,
                    y: dotY,
                    width: 7,
                    height: 7,
                    marginLeft: -3.5,
                    marginTop: -3.5,
                    top: 0,
                    left: 0,
                }}
            />
        </>
    );
}
