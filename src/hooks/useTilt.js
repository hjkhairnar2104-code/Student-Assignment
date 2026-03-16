import { useRef, useState } from "react";

/**
 * useTilt - Custom hook that returns mouse-position-based 3D tilt values
 * and event handlers to attach to a card element.
 *
 * Returns: { ref, tiltStyle, handleMouseMove, handleMouseLeave }
 */
export default function useTilt(maxTilt = 12) {
    const ref = useRef(null);
    const [tiltStyle, setTiltStyle] = useState({
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: "transform 0.15s ease",
    });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        // Normalized coords from -1 to 1
        const x = ((e.clientX - left) / width - 0.5) * 2;
        const y = ((e.clientY - top) / height - 0.5) * 2;

        setTiltStyle({
            transform: `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.03,1.03,1.03)`,
            transition: "transform 0.1s ease",
        });
    };

    const handleMouseLeave = () => {
        setTiltStyle({
            transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
            transition: "transform 0.5s ease",
        });
    };

    return { ref, tiltStyle, handleMouseMove, handleMouseLeave };
}
