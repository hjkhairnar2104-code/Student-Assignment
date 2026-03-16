import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * KnowledgeGraph — pure SVG animated knowledge graph.
 * Displays Subject → Assignment → Topic relationships with
 * animated connection lines and spring-hover nodes.
 */

const nodes = [
    // Center hub
    { id: 0, label: "Assignments", x: 50,  y: 50,  r: 22, color: "#6366f1", textColor: "#fff", type: "hub" },
    // Subject nodes
    { id: 1, label: "Mathematics", x: 18,  y: 22,  r: 16, color: "#8b5cf6", textColor: "#fff", type: "subject" },
    { id: 2, label: "Computer Sci", x: 82, y: 22,  r: 16, color: "#6366f1", textColor: "#fff", type: "subject" },
    { id: 3, label: "Data Science", x: 10,  y: 68, r: 16, color: "#06b6d4", textColor: "#fff", type: "subject" },
    { id: 4, label: "AI / ML",      x: 90,  y: 68, r: 16, color: "#8b5cf6", textColor: "#fff", type: "subject" },
    { id: 5, label: "Physics",      x: 50,  y: 88, r: 14, color: "#7c3aed", textColor: "#fff", type: "subject" },
    // Topic nodes
    { id: 6, label: "Calculus",    x: 6,   y: 40,  r: 10, color: "#a5b4fc", textColor: "#4338ca", type: "topic" },
    { id: 7, label: "Algorithms",  x: 94,  y: 40,  r: 10, color: "#a5b4fc", textColor: "#4338ca", type: "topic" },
    { id: 8, label: "Neural Nets", x: 72,  y: 82,  r: 10, color: "#67e8f9", textColor: "#0e7490", type: "topic" },
    { id: 9, label: "Lab Reports", x: 28,  y: 82,  r: 10, color: "#c4b5fd", textColor: "#5b21b6", type: "topic" },
    { id: 10, label: "Deadlines",  x: 50,  y: 14,  r: 10, color: "#fda4af", textColor: "#be123c", type: "topic" },
];

const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 6], [1, 10],
    [2, 7], [2, 10],
    [3, 9], [4, 8],
    [5, 9],
];

function toSVG(pct, dim) { return (pct / 100) * dim; }

export default function KnowledgeGraph({ width = 600, height = 420 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredId, setHoveredId] = useState(null);
    const [pulseStep, setPulseStep] = useState(0);

    // Animate edges one by one
    useEffect(() => {
        if (!inView) return;
        const timer = setInterval(() => {
            setPulseStep((s) => (s + 1) % edges.length);
        }, 600);
        return () => clearInterval(timer);
    }, [inView]);

    return (
        <div ref={ref} className="w-full overflow-hidden select-none">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full"
                style={{ height: "auto" }}
            >
                {/* Edges */}
                {edges.map(([a, b], i) => {
                    const na = nodes[a], nb = nodes[b];
                    const x1 = toSVG(na.x, width);
                    const y1 = toSVG(na.y, height);
                    const x2 = toSVG(nb.x, width);
                    const y2 = toSVG(nb.y, height);
                    const len = Math.hypot(x2 - x1, y2 - y1);
                    const isActive = hoveredId === na.id || hoveredId === nb.id;
                    const isPulse = pulseStep === i;

                    return (
                        <motion.line
                            key={i}
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke={isActive ? "#6366f1" : "#c7d2fe"}
                            strokeWidth={isActive ? 2 : 1}
                            strokeDasharray={len}
                            initial={{ strokeDashoffset: len, opacity: 0 }}
                            animate={inView ? {
                                strokeDashoffset: 0,
                                opacity: isActive ? 1 : 0.5,
                            } : {}}
                            transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
                            style={{ filter: isPulse ? "drop-shadow(0 0 4px #6366f1)" : "none" }}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((n) => {
                    const x = toSVG(n.x, width);
                    const y = toSVG(n.y, height);
                    const isHov = hoveredId === n.id;
                    const r = n.r;

                    return (
                        <motion.g
                            key={n.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ type: "spring", delay: 0.3 + n.id * 0.08, stiffness: 200, damping: 18 }}
                            style={{ originX: `${x}px`, originY: `${y}px`, cursor: "pointer" }}
                            onHoverStart={() => setHoveredId(n.id)}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            {/* Glow ring */}
                            {isHov && (
                                <motion.circle
                                    cx={x} cy={y}
                                    r={r + 8}
                                    fill="none"
                                    stroke={n.color}
                                    strokeWidth={2}
                                    initial={{ opacity: 0, r: r }}
                                    animate={{ opacity: 0.4, r: r + 8 }}
                                />
                            )}
                            {/* Main circle */}
                            <motion.circle
                                cx={x} cy={y} r={r}
                                fill={n.color}
                                animate={{ r: isHov ? r * 1.18 : r }}
                                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                style={{ filter: isHov ? `drop-shadow(0 4px 12px ${n.color}80)` : "none" }}
                            />
                            {/* Label */}
                            <text
                                x={x} y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={n.textColor}
                                fontSize={n.type === "hub" ? 9 : n.type === "subject" ? 7.5 : 6.5}
                                fontWeight={n.type === "hub" ? "700" : "600"}
                                fontFamily="Inter, system-ui, sans-serif"
                                style={{ pointerEvents: "none" }}
                            >
                                {n.label}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
}
