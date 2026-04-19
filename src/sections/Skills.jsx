import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Frontend Mastery',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Redux', 'GSAP', 'ScrollTrigger']
  },
  {
    title: 'Backend & Data',
    skills: ['Node.js', 'Express', 'MongoDB', 'Python', 'Redis']
  },
  {
    title: 'Cloud & Workflow',
    skills: ['Postman', 'Git', 'GitHub', 'Vercel', 'Render']
  }
]

export default function Skills() {
  const containerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  return (
    <section id="skills" ref={containerRef} className="section-padding" style={{ background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading
          label="TECHNICAL STACK"
          title="CORE EXPERTISE"
          subtitle="A comprehensive toolkit for building high-performance digital products."
        />

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', 
            gap: '2rem',
            marginTop: '4rem'
          }}
        >
          {skillCategories.map((cat, i) => (
            <div 
              key={cat.title}
              ref={el => cardsRef.current[i] = el}
              className="glass"
              style={{
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'none'
              }}
              data-cursor="pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h3 
                style={{ 
                  fontFamily: '"Bebas Neue", sans-serif', 
                  fontSize: '1.8rem', 
                  color: '#0066FF',
                  marginBottom: '2rem',
                  letterSpacing: '0.05em'
                }}
              >
                {cat.title}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {cat.skills.map(skill => (
                  <span 
                    key={skill}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.7rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.5rem 1rem',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFFFFF'
                        e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.2)'
                        e.currentTarget.style.background = 'rgba(255, 215, 0, 0.05)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Corner accent */}
              <div 
                style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '40px', height: '40px',
                  background: 'linear-gradient(225deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

