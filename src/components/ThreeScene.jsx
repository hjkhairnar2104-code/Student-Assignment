import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import Particles from "./ParticlesNetwork";

const mouse = { x: 0, y: 0 };
if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 1.5;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    }, { passive: true });
}

function Paper({ position, rotation, color, scale = 1 }) {
    const meshRef = useRef();
    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.003;
        meshRef.current.position.x += (mouse.x * 0.4 - meshRef.current.position.x) * 0.015;
    });
    return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
            <mesh ref={meshRef} rotation={rotation} scale={scale}>
                <planeGeometry args={[0.9, 1.2]} />
                <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
        </Float>
    );
}

function GradCap({ position, scale = 1 }) {
    const meshRef = useRef();
    useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.004; });
    return (
        <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.4} position={position}>
            <mesh ref={meshRef} scale={scale}>
                <boxGeometry args={[1.2, 0.08, 1.2]} />
                <meshBasicMaterial color="#818cf8" transparent opacity={0.75} />
            </mesh>
        </Float>
    );
}

function Pencil({ position, scale = 1, color = "#a5b4fc", rotationParams = [0, 0, Math.PI / 4] }) {
    const meshRef = useRef();
    useFrame(() => { if (meshRef.current) meshRef.current.rotation.z += 0.003; });
    return (
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6} position={position}>
            <mesh ref={meshRef} scale={scale} rotation={rotationParams}>
                <cylinderGeometry args={[0.06, 0.06, 1.4, 5]} />
                <meshBasicMaterial color={color} transparent opacity={0.75} />
            </mesh>
        </Float>
    );
}

function Book({ position, rotation = [0, 0, 0], scale = 1, color = "#818cf8" }) {
    const meshRef = useRef();
    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.002;
        meshRef.current.rotation.x += 0.001;
    });
    return (
        <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
            <group ref={meshRef} rotation={rotation} scale={scale}>
                {/* Book Cover */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.2, 1.6, 0.2]} />
                    <meshBasicMaterial color={color} transparent opacity={0.75} />
                </mesh>
                {/* Pages */}
                <mesh position={[0.06, 0, 0]}>
                    <boxGeometry args={[1.15, 1.5, 0.22]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                </mesh>
            </group>
        </Float>
    );
}

function Ring({ position, scale = 1 }) {
    const meshRef = useRef();
    useFrame(() => { if (meshRef.current) { meshRef.current.rotation.x += 0.005; meshRef.current.rotation.y += 0.003; } });
    return (
        <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.3} position={position}>
            <mesh ref={meshRef} scale={scale}>
                <torusGeometry args={[0.5, 0.05, 8, 32]} />
                <meshBasicMaterial color="#67e8f9" transparent opacity={0.65} />
            </mesh>
        </Float>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={1} />
            
            {/* Papers */}
            <Paper position={[-6, 3, -10]}  rotation={[0.2, 0.4, 0.1]}   color="#818cf8" scale={1.2} />
            <Paper position={[7, -2, -11]}  rotation={[-0.1, -0.3, 0.2]} color="#a5b4fc" scale={1.1} />
            <Paper position={[0, 5, -12]}   rotation={[0.15, 0.6, -0.1]} color="#67e8f9" scale={1.0} />
            <Paper position={[-5, -4, -9]}  rotation={[0.3, -0.2, 0.3]}  color="#c4b5fd" scale={1.1} />
            
            {/* Books */}
            <Book position={[5, -4, -10]}   rotation={[0.2, -0.4, 0.1]}  scale={0.9} color="#4f46e5" />
            <Book position={[-8, -1, -11]}  rotation={[-0.2, 0.3, 0.2]}  scale={1.0} color="#6366f1" />
            <Book position={[3, 5, -13]}    rotation={[0.1, 0.5, 0]}     scale={1.1} color="#8b5cf6" />
            <Book position={[-2, 6, -10]}   rotation={[0.3, -0.2, 0.4]}  scale={0.8} color="#4f46e5" />
            
            {/* Grad caps */}
            <GradCap position={[4.5, 4.5, -11]} scale={0.5} />
            <GradCap position={[-6, 2, -13]}    scale={0.4} />
            
            {/* Pencils */}
            <Pencil position={[-3.5, -3, -10]} scale={0.9} color="#818cf8" rotationParams={[0.3, 0, Math.PI / 3]} />
            <Pencil position={[6, 3, -11]}     scale={0.8} color="#a5b4fc" rotationParams={[-0.2, 0.1, Math.PI / 4]} />
            <Pencil position={[-2, 4, -9]}     scale={1.0} color="#c4b5fd" rotationParams={[0, 0, Math.PI / 6]} />
            <Pencil position={[2, -2.5, -8]}   scale={1.1} color="#67e8f9" rotationParams={[0.5, -0.2, Math.PI / 2.5]} />
            <Pencil position={[-7, 5, -12]}    scale={0.9} color="#818cf8" rotationParams={[0.1, 0.4, Math.PI / 5]} />
            
            {/* Rings */}
            <Ring position={[4, -5, -11]}      scale={1.1} />
            <Ring position={[-9, 2.5, -12]}    scale={1.0} />
        </>
    );
}

export default function ThreeScene() {
    return (
        <>
            <Canvas
                className="absolute inset-0 w-full h-full"
                camera={{ position: [0, 0, 5], fov: 65 }}
                dpr={[0.75, 1]}
                frameloop="always"
                gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
                style={{ position: "absolute", inset: 0 }}
            >
                <Scene />
            </Canvas>
            <Particles />
        </>
    );
}
