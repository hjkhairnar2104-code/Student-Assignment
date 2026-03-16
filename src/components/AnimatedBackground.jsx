import { useEffect, useRef, Suspense, lazy } from "react";
import { gsap } from "gsap";

const ThreeScene = lazy(() => import("./ThreeScene"));

export default function AnimatedBackground() {
    const baseRef = useRef(null);
    const reduced = typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    useEffect(() => {
        if (reduced) return;
        const el = baseRef.current;
        if (!el) return;
        const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
        tl.to(el, { duration: 14, backgroundPosition: "20% 30%" })
          .to(el, { duration: 14, backgroundPosition: "80% 70%" })
          .to(el, { duration: 14, backgroundPosition: "40% 10%" })
          .to(el, { duration: 14, backgroundPosition: "10% 80%" });
        return () => tl.kill();
    }, [reduced]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: "transform" }}>
            {/* Deep dark base */}
            <div className="absolute inset-0" style={{ background: "#0a0a1b" }} />

            {/* Aurora glow — deep rich neon gradients */}
            <div
                ref={baseRef}
                className="absolute inset-0"
                style={{
                    background: [
                        "radial-gradient(ellipse 80% 60% at 15% 20%, rgba(99,102,241,0.35) 0%, transparent 60%)",
                        "radial-gradient(ellipse 70% 50% at 85% 70%, rgba(139,92,246,0.30) 0%, transparent 60%)",
                        "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(6,182,212,0.18) 0%, transparent 55%)",
                        "radial-gradient(ellipse 50% 40% at 80% 15%, rgba(167,139,250,0.20) 0%, transparent 55%)",
                    ].join(", "),
                    backgroundSize: "200% 200%",
                    backgroundPosition: "0% 0%",
                    willChange: "background-position",
                }}
            />

            {/* Three.js + particles */}
            {!reduced && (
                <Suspense fallback={null}>
                    <ThreeScene />
                </Suspense>
            )}

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                }}
            />
        </div>
    );
}
