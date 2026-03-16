import { useState } from "react";

/**
 * RippleButton — drop-in replacement for any <button> or <Link>-styled button.
 * Plays a ripple from the click position on click.
 *
 * Usage:
 *   <RippleButton className="clean-button" onClick={...}>Click me</RippleButton>
 */
export default function RippleButton({ children, className = "", onClick, type = "button", disabled = false, as: Tag = "button", ...props }) {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.5;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, size, id }]);
        // Remove ripple after animation
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);

        if (onClick) onClick(e);
    };

    return (
        <Tag
            type={Tag === "button" ? type : undefined}
            disabled={disabled}
            onClick={handleClick}
            className={`relative overflow-hidden ${className}`}
            {...props}
        >
            {/* Ripple layers */}
            {ripples.map(({ x, y, size, id }) => (
                <span
                    key={id}
                    className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
                    style={{
                        left: x,
                        top: y,
                        width: size,
                        height: size,
                    }}
                />
            ))}
            <span className="relative z-10">{children}</span>
        </Tag>
    );
}
