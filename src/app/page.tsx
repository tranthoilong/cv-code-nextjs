'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars } from '@react-three/drei'
import { Suspense, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image'
import { toast } from 'sonner'

interface Project {
  url: string;
  liveUrl: string;
  title: string;
  description: string;
  thumbnail: string;
}

const projects: Project[] = [
  {
    url: "https://github.com/tranthoilong/game-mouse-online",
    liveUrl: "https://game-mouse-online.vercel.app/",
    title: "Source Game Mouse Online",
    description: "A multiplayer clicking game where two players can create and join game rooms to compete against each other. Players earn points by clicking on their screen, making it an engaging and competitive experience.",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  {
    url: "https://project2.com",
    liveUrl:"",
    title: "Project 2",
    description: "Description of project 2 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  {
    url: "https://project3.com",
    liveUrl:"",
    title: "Project 3",
    description: "Description of project 3 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  ,
  {
    url: "https://project3.com",
    liveUrl:"",
    title: "Project 3",
    description: "Description of project 3 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  ,
  {
    url: "https://project3.com",
    liveUrl:"",
    title: "Project 3",
    description: "Description of project 3 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  }
];

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
            value: "#A9A9A9", 
          },
          links: {
            color: "#A9A9A9",
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
              color="#1E2A38"
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

const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Trần Thới Long",
  "jobTitle": "Developer",
  "url": "https://your-domain.com",
  "sameAs": [
    "https://github.com/your-username",
    "https://linkedin.com/in/your-username",
    "https://twitter.com/your-username"
  ]
}

export default function Home() {
  const parallax = useRef<IParallax>(null)
  const { scrollYProgress } = useScroll()
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name')
    const email = formData.get('email') 
    const message = formData.get('message')

    const submitButton = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement
    
    if (submitButton) {
      submitButton.disabled = true
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `
    }

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        toast.success('Email sent successfully')
        const form = e.target as HTMLFormElement
        form.reset()
      } else {
        toast.error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Failed to send email')
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.innerHTML = 'Send Message'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PersonSchema) }}
      />
      <div className="h-screen w-full bg-[#0A192F]"> {/* Dark navy background */}
        {/* Add Particles Background */}
        <div className="fixed inset-0 z-0">
          <ParticlesBackground />
        </div>

        <Parallax ref={parallax} pages={7}>
          {/* Gradient overlays */}
          <ParallaxLayer
            offset={1}
            speed={0.2}
            style={{
              background: 'linear-gradient(to bottom, rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.95))',
            }}
          />
          <ParallaxLayer
            offset={2}
            speed={0.2}
            style={{
              background: 'linear-gradient(to bottom, rgba(17, 34, 64, 0.8), rgba(17, 34, 64, 0.95))',
            }}
          />
          <ParallaxLayer
            offset={3}
            speed={0.2}
            style={{
              background: 'linear-gradient(to bottom, rgba(23, 42, 69, 0.8), rgba(23, 42, 69, 0.95))',
            }}
          />
          <ParallaxLayer
            offset={4}
            speed={0.2}
            style={{
              background: 'linear-gradient(to bottom, rgba(29, 48, 74, 0.8), rgba(29, 48, 74, 0.95))',
            }}
          />
          <ParallaxLayer
            offset={5}
            speed={0.2}
            style={{
              background: 'linear-gradient(to bottom, rgba(35, 54, 79, 0.8), rgba(35, 54, 79, 0.95))',
            }}
          />

          {/* Hero Layer */}
          <ParallaxLayer offset={0} speed={0}>
            <div className="h-screen w-full">
              <Scene scroll={scrollYProgress.get()} />
            </div>
          </ParallaxLayer>

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
              className="flex flex-col items-center text-center text-white z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-[#64FFDA]"
              >
                <Image
                  src="/avatar.jpg" 
                  alt="Trần Thới Long"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h1 className="text-6xl font-bold mb-4 text-[#64FFDA]">Trần Thới Long</h1>
              <h2 className="text-2xl mb-8 text-[#CCD6F6]">Developer</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-3 bg-[#64FFDA] text-[#0A192F] rounded-full text-lg hover:bg-[#45E6C6]"
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
              backgroundColor: '#112240',
            }}
          >
            <motion.div 
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="max-w-4xl p-8 text-white">
                <h2 className="text-5xl font-bold mb-8 text-[#F39C12]">About Me</h2>
                <p className="text-xl leading-relaxed mb-6">
                  I am a programmer with over a year of experience. I graduated in 2023 and started working at Mpire Agency in July 2023 as a Fresher. After a period of working, I was officially hired as a full-time employee at the company at the end of 2023.
                </p>
                <p className="text-xl leading-relaxed mb-6">
                  During my time at Mpire Agency, I gained valuable experience and became familiar with various software development tools. I had the opportunity to work with languages and frameworks such as Phalcon (PHP), Flutter (Dart), JavaScript, React, and other technologies. Additionally, I have worked on a few small projects using Next.js.
                </p>
                <p className="text-xl leading-relaxed">
                  Furthermore, I also have experience with Docker to create and manage development environments, as well as deploy applications. I have set up CI/CD pipelines to automate the build, testing, and deployment processes for applications in production. Deploying websites has also been a part of my role, ensuring that applications run smoothly and efficiently after deployment.
                </p>
              </div>
            </motion.div>
          </ParallaxLayer>

          {/* Skills Section */}
          <ParallaxLayer
            offset={2}
            speed={0.5}
            style={{
              backgroundColor: '#0A192F',
            }}
          >
            <motion.div 
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-6xl p-8 text-white">
                <h2 className="text-6xl font-bold mb-16 text-center text-[#64FFDA] tracking-tight">
                  Skills & Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    {
                      category: 'Frontend',
                      skills: [
                        'Next.js',
                        'TypeScript / JavaScript',
                        'TailwindCSS',
                        'Flutter / Dart',
                        'HTML5 / CSS3'
                      ]
                    },
                    {
                      category: 'Backend',
                      skills: [
                        'Node.js / Express',
                        'NestJS / TypeORM',
                        'PHP / Phalcon',
                        'MongoDB / PostgreSQL',
                        'RESTful APIs / GraphQL',
                        'Redis',
                      ]
                    },
                    {
                      category: 'DevOps & Tools',
                      skills: [
                        'Docker',
                        'CI/CD (Github/GitLab)',
                        'Git / GitHub Actions',
                        'Linux / Shell Scripting',
                        'Nginx'
                      ]
                    }
                  ].map(({category, skills}, index) => (
                    <motion.div
                      key={category}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(100, 255, 218, 0.2)"
                      }}
                      className="p-8 bg-[#112240] rounded-2xl border border-[#64FFDA]/20 hover:border-[#64FFDA]/40 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <h3 className="text-3xl font-bold mb-6 text-[#64FFDA]">{category}</h3>
                      <ul className="space-y-4 text-lg text-[#8892B0]">
                        {skills.map((skill, i) => (
                          <li key={i} className="flex items-center">
                            <span className="text-[#64FFDA] mr-3">▹</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ParallaxLayer>

          {/* Education Section */}
          <ParallaxLayer
            offset={3}
            speed={0.3}
            style={{
              backgroundColor: '#112240',
            }}
          >
            <motion.div 
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="max-w-4xl p-8 text-white">
                <h2 className="text-5xl font-bold mb-12 text-center text-[#64FFDA]">Education</h2>
                <div className="space-y-8">
                  {[
                    {
                      degree: "Bachelor of Applied Information Technology",
                      school: <a href="https://caothang.edu.vn/" className="text-[#64FFDA] hover:underline">Cao Thang Technical College (CKC)</a>,
                      year: "2020 - 2023",
                      description: "Specialized in Software Engineering with focus on Web Development and Mobile App Development.",
                      achievements: [
                        "GPA: 7.02/10",
                        "Excellent Team Leader"
                      ]
                    },
                    {
                      degree: "Backend Developer & Mobile App Developer",
                      school: <a href="https://masothue.com/0315568678-cong-ty-tnhh-mpire-agency" className="text-[#64FFDA] hover:underline">Mpire Agency</a>,
                      year: "07/2023 - 01/2025",
                      description: "Developed backend services using PHP (Phalcon) and mobile applications using Flutter.",
                      achievements: [
                        "Built RESTful APIs with PHP Phalcon framework",
                        "Developed cross-platform mobile apps with Flutter",
                        <>
                          Worked on multiple client projects simultaneously (
                          <a href="https://tancangpilot.com.vn/" className="text-[#64FFDA] hover:underline">Tan Cang Pilot</a>,{" "}
                          <a href="https://72plusgolfacademy.edu.vn/" className="text-[#64FFDA] hover:underline">72+ Golf Academy</a>,{" "}
                          <a href="https://saigonnewport.com.vn/" className="text-[#64FFDA] hover:underline">Saigon Newport</a>
                          ).
                        </>
                      ]
                    }
                  ].map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-[#112240] p-6 rounded-xl border border-[#64FFDA]/20"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[#64FFDA]">{edu.degree}</h3>
                          <p className="text-[#8892B0]">{edu.school}</p>
                        </div>
                        <span className="text-[#64FFDA] bg-[#64FFDA]/10 px-3 py-1 rounded-full text-sm">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-[#CCD6F6] mb-4">{edu.description}</p>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-center text-[#8892B0]">
                            <span className="text-[#64FFDA] mr-3">▹</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ParallaxLayer>

          {/* Personal Interests Section */}
          <ParallaxLayer
            offset={4}
            speed={0.4}
            style={{
              backgroundColor: '#0A192F',
            }}
          >
            <motion.div 
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="max-w-6xl p-8 text-white">
                <h2 className="text-5xl font-bold mb-12 text-center text-[#64FFDA]">Personal Interests</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      category: "Technology",
                      icon: "💻",
                      interests: [
                        "Open Source Contributing",
                        "AI & Machine Learning",
                        "New Programming Languages",
                        "Tech Blogging"
                      ]
                    },
                    {
                      category: "Lifestyle",
                      icon: "🌟",
                      interests: [
                        "Photography",
                        "Traveling",
                        "Fitness & Health",
                        "Quickly resolve problems",
                        "Play game"
                      ]
                    },
                    {
                      category: "Professional Growth",
                      icon: "📚",
                      interests: [
                        "Exploring new technologies",
                        "Acquiring new knowledge",
                        "Creating valuable products",
                        "Personal development",
                        "Solving real-world problems"
                      ]
                    }
                  ].map((section, index) => (
                    <motion.div
                      key={section.category}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(100, 255, 218, 0.2)"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-[#0A192F] p-6 rounded-xl border border-[#64FFDA]/20 hover:border-[#64FFDA]/40"
                    >
                      <div className="flex items-center mb-6">
                        <span className="text-4xl mr-4">{section.icon}</span>
                        <h3 className="text-2xl font-bold text-[#64FFDA]">{section.category}</h3>
                      </div>
                      <ul className="space-y-3">
                        {section.interests.map((interest, i) => (
                          <li key={i} className="flex items-center text-[#8892B0]">
                            <span className="text-[#64FFDA] mr-3">▹</span>
                            {interest}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ParallaxLayer>

          {/* Projects Section */}
          <ParallaxLayer
            offset={5}
            speed={0.8}
            style={{
              backgroundColor: '#112240',
            }}
          >
            <motion.div 
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-full max-w-6xl p-8">
                <h2 className="text-5xl font-bold mb-12 text-center text-[#64FFDA]">Projects</h2>
                
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  className="w-full project-slider"
                >
                  {projects.map((project, index) => (
                    <SwiperSlide key={index}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-[#112240] rounded-xl overflow-hidden h-full relative group"
                      >
                        <div className="relative w-full h-48 overflow-hidden">
                          <img 
                            src={project.thumbnail} 
                            alt={project.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Preview Content */}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">{project.title}</h3>
                          <p className="mb-6 text-[#CCD6F6] line-clamp-2">{project.description}</p>
                        </div>

                        {/* Hover Content */}
                        <div className="absolute inset-0 bg-[#112240]/95 flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">{project.title}</h3>
                          <p className="mb-6 text-[#CCD6F6]">{project.description}</p>
                          
                          <div className="mt-auto flex gap-4">
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-[#64FFDA] text-[#0A192F] rounded-full text-sm font-medium hover:bg-[#45E6C6] transition-colors"
                              >
                                View Live
                              </motion.a>
                            )}
                            <motion.a
                              href={`${project.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 border border-[#64FFDA] text-[#64FFDA] rounded-full text-sm hover:bg-[#64FFDA]/10 transition-colors"
                            >
                              Source Code
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </ParallaxLayer>

          {/* Contact Form */}
          <ParallaxLayer
            offset={6}
            speed={0.2}
            style={{
              backgroundColor: '#0A192F',
              padding: '50px 0',
            }}
          >
            <motion.div
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-full max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  {/* Contact Form Section */}
                  <div className="bg-[#112240] p-8 rounded-xl">
                    <h2 className="text-4xl font-bold mb-6 text-[#64FFDA]">Get In Touch</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="text" 
                          name="name"
                          placeholder="Your Name"
                          required
                          className="w-full p-4 bg-[#172A45] border-2 border-[#64FFDA] rounded-lg text-white placeholder-[#8892B0] focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent transition-all"
                        />
                        <input
                          type="email"
                          name="email" 
                          placeholder="Your Email"
                          required
                          className="w-full p-4 bg-[#172A45] border-2 border-[#64FFDA] rounded-lg text-white placeholder-[#8892B0] focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent transition-all"
                        />
                      </div>
                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Your Message"
                        required
                        className="w-full p-4 bg-[#172A45] border-2 border-[#64FFDA] rounded-lg text-white placeholder-[#8892B0] focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent transition-all resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-4 bg-[#64FFDA] text-[#0A192F] rounded-lg font-bold text-lg hover:bg-[#45E6C6] active:transform active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>

                  {/* Contact Info Section */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">Contact Information</h3>
                      <div className="space-y-3 text-[#CCD6F6]">
                        <p className="flex items-center group">
                          <svg className="w-5 h-5 mr-3 group-hover:text-[#64FFDA] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <a href="mailto:tranthoilong@gmail.com" className="group-hover:text-[#64FFDA] transition-colors">
                            tranthoilong@gmail.com
                          </a>
                        </p>
                        <div className="flex flex-col space-y-2">
                          <p className="flex items-center">
                            <a href="tel:0383892964" className="flex items-center hover:text-[#64FFDA] transition-colors">
                              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              0383892964
                            </a>
                          </p>
                          <p className="flex items-center">
                            <a href="tel:0388425022" className="flex items-center hover:text-[#64FFDA] transition-colors">
                              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              0388425022
                            </a>
                          </p>
                        </div>
                        <p className="flex items-center">
                          <a className="flex items-center hover:text-[#64FFDA] transition-colors" href="https://www.google.com/maps/place/36%2F9+Ch%E1%BB%AD+%C4%90%E1%BB%93ng+T%E1%BB%AD,+Ph%C6%B0%E1%BB%9Dng+7,+T%C3%A2n+B%C3%ACnh,+H%E1%BB%93+Ch%C3%AD+Minh/@10.7868127,106.6565106,17z/data=!4m6!3m5!1s0x31752f705cc427cf:0xbe31c51c658c3132!8m2!3d10.7868127!4d106.6565106!16s%2Fg%2F11w1wtzhhn?hl=vi-VN&entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoJLDEwMjExNjQwSAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>36/9 Chữ Đồng Tử, Phường 7, Tân Bình, Hồ Chí Minh
                          </a>
                        </p>

                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">Follow Me</h3>
                      <div className="flex space-x-4">
                        <a href="https://github.com/tranthoilong" target="_blank" rel="noopener noreferrer" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/tranthoilong/" target="_blank" rel="noopener noreferrer" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a href="https://facebook.com/tranthoilong" target="_blank" rel="noopener noreferrer" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Copyright */}
                <div className="border-t border-[#233554] pt-8 text-center text-[#8892B0]">
                  <p>© 2024 Trần Thới Long. All Rights Reserved.</p>
                </div>
              </div>
            </motion.div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  )
}
