import { useRef, useCallback } from "react";
import { useSpring } from "@react-spring/web";

/**
 * useMagnetic — gives any element a spring-based magnetic hover effect.
 *
 * Usage:
 *   const { ref, style, handlers } = useMagnetic(0.4);
 *   <animated.button ref={ref} style={style} {...handlers}>…</animated.button>
 *
 * @param {number} strength  0–1, how strongly the element follows the cursor (default 0.35)
 */
export default function useMagnetic(strength = 0.35) {
    const ref = useRef(null);

    const [style, api] = useSpring(() => ({
        x: 0,
        y: 0,
        config: { mass: 1, tension: 280, friction: 22 },
    }));

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        api.start({
            x: (e.clientX - cx) * strength,
            y: (e.clientY - cy) * strength,
        });
    }, [api, strength]);

    const handleMouseLeave = useCallback(() => {
        api.start({ x: 0, y: 0 });
    }, [api]);

    return {
        ref,
        style,
        handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
    };
}
