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

// Thêm interface cho Project
interface Project {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
}

// Thêm dữ liệu projects
const projects: Project[] = [
  {
    url: "https://project1.com",
    title: "Project 1",
    description: "Description of project 1 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  {
    url: "https://project2.com",
    title: "Project 2",
    description: "Description of project 2 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  {
    url: "https://project3.com",
    title: "Project 3",
    description: "Description of project 3 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  ,
  {
    url: "https://project3.com",
    title: "Project 3",
    description: "Description of project 3 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  },
  ,
  {
    url: "https://project3.com",
    title: "Project 3",
    description: "Description of project 3 goes here...",
    thumbnail: "https://www.apexglobal.com.vn/wp-content/uploads/2016/08/it-project-manager.jpg"
  }
];

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
            value: "#A9A9A9", // Màu xám sáng hiện đại
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
              color="#1E2A38" // Xanh dương đậm hiện đại
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

// Thêm component cho structured data
const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Trần Thới Long",
  "jobTitle": "Fullstack Developer",
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
              <h2 className="text-2xl mb-8 text-[#CCD6F6]">Fullstack Developer</h2>
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
                  I'm a passionate fullstack developer with over 3 years of experience in creating immersive web experiences. My journey in tech started when I built my first website in high school, and since then, I've been constantly learning and growing in this ever-evolving field.
                </p>
                <p className="text-xl leading-relaxed mb-6">
                  Currently, I specialize in building scalable web applications using modern technologies like React, Next.js, Node.js, and various cloud platforms. I have a strong foundation in both frontend and backend development, with particular expertise in creating responsive, user-friendly interfaces and implementing robust server-side solutions.
                </p>
                <p className="text-xl leading-relaxed mb-6">
                  Beyond coding, I'm deeply interested in UI/UX design principles and always strive to create applications that not only function flawlessly but also provide an exceptional user experience. I'm also an active contributor to open-source projects and enjoy sharing my knowledge through technical blog posts and community forums.
                </p>
                <p className="text-xl leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, reading tech blogs, or working on personal projects that challenge my skills and creativity. I believe in continuous learning and am always excited to take on new challenges that push my boundaries as a developer.
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
                        'React.js / Next.js',
                        'TypeScript / JavaScript',
                        'TailwindCSS / SCSS',
                        'Redux / Context API',
                        'Flutter / Dart',
                        'HTML5 / CSS3'
                      ]
                    },
                    {
                      category: 'Backend',
                      skills: [
                        'Node.js / Express',
                        'NestJS / TypeORM',
                        'MongoDB / PostgreSQL',
                        'RESTful APIs / GraphQL',
                        'Redis / Message Queues',
                        'AWS / Google Cloud'
                      ]
                    },
                    {
                      category: 'DevOps & Tools',
                      skills: [
                        'Docker / Kubernetes',
                        'CI/CD (Jenkins/GitLab)',
                        'Git / GitHub Actions',
                        'Linux / Shell Scripting',
                        'Nginx / Apache',
                        'Monitoring & Logging'
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
                      degree: "Bachelor of Computer Science",
                      school: "University Name",
                      year: "2019 - 2023",
                      description: "Specialized in Software Engineering with focus on Web Development and Distributed Systems.",
                      achievements: [
                        "GPA: 3.8/4.0",
                        "President of Computer Science Club",
                        "Best Graduation Project Award"
                      ]
                    },
                    {
                      degree: "Full Stack Web Development",
                      school: "Online Certification",
                      year: "2022",
                      description: "Comprehensive training in modern web development technologies.",
                      achievements: [
                        "React.js & Node.js Specialization",
                        "Advanced Database Management",
                        "Cloud Computing Fundamentals"
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
                        "Reading Tech Books"
                      ]
                    },
                    {
                      category: "Creative",
                      icon: "🎨",
                      interests: [
                        "UI/UX Design",
                        "Digital Art",
                        "Music Production",
                        "Video Editing"
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
                        className="bg-[#112240] rounded-xl overflow-hidden h-full"
                      >
                        <div className="relative w-full h-48 overflow-hidden">
                          <img 
                            src={project.thumbnail} 
                            alt={project.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">{project.title}</h3>
                          <p className="mb-6 text-[#CCD6F6] line-clamp-3">{project.description}</p>
                          <div className="flex gap-4">
                            <motion.a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-[#64FFDA] text-[#0A192F] rounded-full text-sm font-medium hover:bg-[#45E6C6] transition-colors"
                            >
                              View Live
                            </motion.a>
                            <motion.a
                              href={`${project.url}/source`}
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
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full p-3 bg-[#172A45] border border-[#64FFDA] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full p-3 bg-[#172A45] border border-[#64FFDA] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                        />
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Message"
                        className="w-full p-3 bg-[#172A45] border border-[#64FFDA] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                      />
                      <button
                        type="submit"
                        className="px-8 py-3 bg-[#64FFDA] text-[#0A192F] rounded-md font-medium hover:bg-[#45E6C6] transition-colors"
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
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          tranthoilong@gmail.com
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          0388425022
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          Tân Bình, TP.HCM
                        </p>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">Follow Me</h3>
                      <div className="flex space-x-4">
                        <a href="#" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                        <a href="#" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a href="#" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
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
