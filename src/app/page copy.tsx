'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars, Text3D, Center } from '@react-three/drei'
import { Suspense, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

// Thêm component ParticlesBackground
function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

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
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
}

function Scene({ scroll }: { scroll: number }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
        
        <motion.mesh rotation-y={scroll * 0.5}>
          <Sphere args={[1, 64, 64]}>
            <meshStandardMaterial 
              color="#4169E1"
              wireframe
              opacity={0.8}
              transparent
            />
          </Sphere>
        </motion.mesh>

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Suspense>
    </Canvas>
  )
}

export default function Home() {
  const parallax = useRef<IParallax>(null)
  const { scrollYProgress } = useScroll()
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="h-screen w-full bg-black">
      {/* Add Particles Background */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      <Parallax ref={parallax} pages={4}>
        {/* Hero Layer */}
        <ParallaxLayer offset={0} speed={0}>
          <div className="h-screen w-full">
            <Scene scroll={scrollYProgress.get()} />
          </div>
        </ParallaxLayer>

        {/* Thêm overlay gradient để particles không làm ảnh hưởng đến text */}
        <ParallaxLayer
          offset={1}
          speed={0.2}
          style={{
            background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.95))',
          }}
        />
        <ParallaxLayer
          offset={2}
          speed={0.2}
          style={{
            background: 'linear-gradient(to bottom, rgba(35, 35, 35, 0.8), rgba(35, 35, 35, 0.95))',
          }}
        />
        <ParallaxLayer
          offset={3}
          speed={0.2}
          style={{
            background: 'linear-gradient(to bottom, rgba(42, 42, 42, 0.8), rgba(42, 42, 42, 0.95))',
          }}
        />

        {/* Hero Content */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white z-10"
          >
            <h1 className="text-6xl font-bold mb-4">Your Name</h1>
            <h2 className="text-2xl mb-8">Creative Developer</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-8 py-3 bg-blue-600 rounded-full text-lg"
              onClick={() => parallax.current?.scrollTo(1)}
            >
              Discover More
            </motion.button>
          </motion.div>
        </ParallaxLayer>

        {/* About Section */}
        <ParallaxLayer
          offset={1}
          speed={0.2}
          style={{
            backgroundColor: '#1a1a1a',
          }}
        >
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-4xl p-8 text-white">
              <h2 className="text-5xl font-bold mb-8">About Me</h2>
              <p className="text-xl leading-relaxed">
                A passionate developer with expertise in creating immersive web experiences...
              </p>
        </div>
          </motion.div>
        </ParallaxLayer>

        {/* Skills Section */}
        <ParallaxLayer
          offset={2}
          speed={0.5}
          style={{
            backgroundColor: '#232323',
          }}
        >
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl p-8 text-white">
              <h2 className="text-5xl font-bold mb-12 text-center">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['Frontend', 'Backend', 'Creative'].map((category, index) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white/5 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">{category}</h3>
                    <ul className="space-y-2">
                      <li>• Skill 1</li>
                      <li>• Skill 2</li>
                      <li>• Skill 3</li>
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ParallaxLayer>

        {/* Projects Section */}
        <ParallaxLayer
          offset={3}
          speed={0.8}
          style={{
            backgroundColor: '#2a2a2a',
          }}
        >
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-6xl p-8 text-white">
              <h2 className="text-5xl font-bold mb-12 text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((project) => (
                  <motion.div
                    key={project}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                    className="p-6 rounded-xl border border-white/10 backdrop-blur-sm"
                  >
                    <h3 className="text-2xl font-bold mb-4">Project {project}</h3>
                    <p className="mb-4">Description of your amazing project goes here...</p>
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-blue-600 rounded-full text-sm"
                      >
                        View Live
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 border border-white/20 rounded-full text-sm"
                      >
                        Source Code
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}
