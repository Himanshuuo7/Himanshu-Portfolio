import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import Magnetic from '../components/Magnetic'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    number: '01',
    title: 'TaskFlow API',
    description:
      'A high-performance task management REST API built with Node.js and Express. Features JWT authentication, Redis caching, and MongoDB Atlas.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    github: 'https://github.com',
    live: 'https://render.com',
  },
  {
    id: 2,
    number: '02',
    title: 'ShopSphere',
    description:
      'Full-stack e-commerce platform with real-time inventory, Stripe payment integration, and an advanced admin dashboard.',
    tech: ['React', 'Redux', 'Node.js', 'Stripe'],
    github: 'https://github.com',
    live: 'https://vercel.com',
  },
  {
    id: 3,
    number: '03',
    title: 'DevConnect',
    description:
      'Social networking platform for developers. Real-time chat via Socket.io, GitHub OAuth, and project collaboration boards.',
    tech: ['React', 'Node.js', 'Socket.io', 'OAuth'],
    github: 'https://github.com',
    live: 'https://vercel.com',
  },
  {
    id: 4,
    number: '04',
    title: 'MetricsBoard',
    description:
      'Real-time analytics dashboard that ingests server logs and visualizes KPIs with high-performance charts.',
    tech: ['React', 'Python', 'Redis', 'Recharts'],
    github: 'https://github.com',
    live: 'https://render.com',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const items = gridRef.current.children
    
    Array.from(items).forEach((item, i) => {
      const title = item.querySelector('.project-title')
      const number = item.querySelector('.project-number')
      const content = item.querySelector('.project-content')

      gsap.fromTo(title, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        }
      )

      gsap.fromTo(number, 
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 0.05,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
          }
        }
      )

      gsap.fromTo(content, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
          }
        }
      )
    })
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section-padding" style={{ position: 'relative', background: '#0B0B0B', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading
          label="SELECTED WORKS"
          title="FEATURED PROJECTS"
          subtitle="A showcase of technical architecture and creative engineering."
        />

        <div
          ref={gridRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10rem',
            marginTop: '8rem'
          }}
        >
          {projects.map((project, i) => (
            <div 
              key={project.id}
              style={{ 
                position: 'relative', 
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                padding: '4rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div 
                className="project-number"
                style={{
                  position: 'absolute',
                  left: '-2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(8rem, 25vw, 20rem)',
                  color: '#FFFFFF',
                  opacity: 0.03,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1
                }}
              >
                {project.number}
              </div>

              <div className="project-content" style={{ position: 'relative', zIndex: 1, width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <div>
                  <h3 
                    className="project-title"
                    style={{ 
                      fontFamily: '"Bebas Neue", sans-serif', 
                      fontSize: 'clamp(3rem, 8vw, 6rem)', 
                      color: '#FFFFFF',
                      marginBottom: '2rem',
                      lineHeight: 0.9,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  <p 
                    style={{ 
                      fontFamily: '"DM Sans", sans-serif', 
                      fontSize: '1.2rem', 
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '2.5rem',
                      lineHeight: 1.6,
                      maxWidth: '500px'
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                    {project.tech.map(t => (
                      <span 
                        key={t}
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '0.7rem',
                          color: '#0066FF',
                          background: 'rgba(0, 102, 255, 0.05)',
                          border: '1px solid rgba(0, 102, 255, 0.1)',
                          padding: '0.5rem 1rem',
                          letterSpacing: '0.1em'
                        }}
                      >
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <Magnetic strength={0.3}>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem', 
                          color: '#FFFFFF', 
                          textDecoration: 'none',
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '0.8rem',
                          opacity: 0.6,
                          transition: 'opacity 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
                      >
                        <FiGithub /> GITHUB
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.3}>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem', 
                          color: '#0066FF', 
                          textDecoration: 'none',
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '0.8rem' 
                        }}
                      >
                        <FiExternalLink /> LIVE DEMO
                      </a>
                    </Magnetic>
                  </div>
                </div>

                {/* Decorative Visual Element for Developer Theme */}
                <div style={{ position: 'relative', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ 
                        width: '100%', 
                        aspectRatio: '16/9', 
                        background: 'linear-gradient(45deg, #151515, #0B0B0B)',
                        border: '1px solid rgba(255, 255, 255, 0.03)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.05) 0%, transparent 70%)',
                            zIndex: 1
                        }} />
                        {/* Abstract Code Grid or Placeholder */}
                        <div style={{ padding: '2rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem', color: 'rgba(0, 102, 255, 0.2)', userSelect: 'none' }}>
                            {"{/* PROJECT_" + (i+1) + " */}"} <br />
                            const data = await fetch('/api/v1/projects'); <br />
                            {"// Architecture by Himanshu"} <br />
                            {"// " + project.tech.join(' | ')}
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


