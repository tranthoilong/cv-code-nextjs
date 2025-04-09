'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"

function ParticlesBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };


  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: "#A9A9A9",
          },
          links: {
            color: "#A9A9A9",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
          },
          number: {
            value: 60,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
}

function Scene() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Stars radius={300} depth={60} count={15000} factor={7} saturation={0} fade />
        
        <mesh>
          <Sphere args={[1.2, 64, 64]}>
            <meshStandardMaterial 
              color="#64FFDA"
              wireframe
              opacity={0.6}
              transparent
              emissive="#64FFDA"
              emissiveIntensity={0.2}
            />
          </Sphere>
        </mesh>

        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1} />
      </Suspense>
    </Canvas>
  )
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>
      
      <div className="absolute inset-0">
        <Scene />
      </div>

      <div className="text-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-[#64FFDA] mb-4">404</h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-semibold text-[#64FFDA] mb-4">Page Not Found</h2>
          <p className="text-[#64FFDA] mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
          
          <Link 
            href="/"
            className="px-6 py-3 bg-[#64FFDA] text-[#0A192F] rounded-full font-semibold hover:bg-[#45E6C6] transition-all duration-300"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
