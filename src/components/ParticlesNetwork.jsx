import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

/**
 * ParticlesNetwork — lightweight tsparticles knowledge graph overlay.
 * Reduced to 35 particles (from 55) for smooth 60fps.
 */
export default function ParticlesNetwork() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="knowledge-particles"
            className="absolute inset-0 w-full h-full"
            init={particlesInit}
            options={{
                fullScreen: { enable: false },
                fpsLimit: 60,
                background: { color: { value: "transparent" } },
                particles: {
                    number: { value: 35, density: { enable: true, area: 900 } },
                    color: { value: ["#6366f1", "#8b5cf6", "#a5b4fc"] },
                    shape: { type: "circle" },
                    opacity: { value: 0.3 },
                    size: { value: { min: 1, max: 2.5 } },
                    links: {
                        enable: true,
                        distance: 120,
                        color: "#6366f1",
                        opacity: 0.12,
                        width: 0.7,
                    },
                    move: {
                        enable: true,
                        speed: 0.5,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: { default: "bounce" },
                    },
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "repulse" },
                        onClick: { enable: false },
                    },
                    modes: {
                        repulse: { distance: 70, duration: 0.4 },
                    },
                },
                detectRetina: false,   /* Off for performance */
            }}
        />
    );
}
