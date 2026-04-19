// components/SectionHeading.jsx — Reusable animated section title with Awwwards micro-interactions
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsDesktop } from '../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export default function SectionHeading({ label, title, subtitle }) {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const lineRef = useRef(null)
  const labelRef = useRef(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const chars = titleRef.current.querySelectorAll('.char')
    
    // Entrance Animation: Masked Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })

    tl.fromTo(labelRef.current, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 1, ease: 'power4.out' }
    )
    .fromTo(chars, 
      { y: '100%', rotate: 5, opacity: 0 }, 
      { y: '0%', rotate: 0, opacity: 1, duration: 1, stagger: 0.03, ease: 'power4.out' },
      '-=0.7'
    )
    .fromTo(lineRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 1, ease: 'power4.inOut' },
      '-=0.8'
    )

    // Character Hover Effect Logic
    const handleMouseEnter = (e) => {
      gsap.to(e.target, { 
        color: '#0066FF', 
        y: -10, 
        duration: 0.4, 
        ease: 'power3.out' 
      })
    }

    const handleMouseLeave = (e) => {
      gsap.to(e.target, { 
        color: '#e2e8f0', 
        y: 0, 
        duration: 0.6, 
        ease: 'power3.inOut' 
      })
    }

    if (isDesktop) {
      chars.forEach(char => {
        char.addEventListener('mouseenter', handleMouseEnter)
        char.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    return () => {
      chars.forEach(char => {
        char.removeEventListener('mouseenter', handleMouseEnter)
        char.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [title])

  // Split title into characters for independent animation
  const renderTitleChars = (text) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`char inline-block ${isDesktop ? 'cursor-none' : ''}`} 
        style={{ willChange: 'transform, color' }}
        data-cursor={isDesktop ? "pointer" : undefined}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div ref={containerRef} style={{ marginBottom: '4rem', position: 'relative' }}>
      {/* Eyebrow label */}
      <p
        ref={labelRef}
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: '#0066FF',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          opacity: 0
        }}
      >
        {label}
      </p>

      {/* Main heading with Masking */}
      <div style={{ overflow: 'hidden' }}>
        <h2
          ref={titleRef}
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            color: '#e2e8f0',
            letterSpacing: '0.02em',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {renderTitleChars(title)}
        </h2>
      </div>

      {/* Optional subtitle */}
      {subtitle && (
        <div style={{ overflow: 'hidden', marginTop: '1.25rem' }}>
            <p
              initial={{ opacity: 0, y: 20 }}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '1.1rem',
                color: 'rgba(226,232,240,0.5)',
                maxWidth: '520px',
                lineHeight: 1.6,
                fontWeight: 300
              }}
            >
              {subtitle}
            </p>
        </div>
      )}

      {/* Decorative line */}
      <div
        ref={lineRef}
        style={{
          marginTop: '2rem',
          height: '1px',
          width: '80px',
          background: 'linear-gradient(90deg, #0066FF, transparent)',
          transformOrigin: 'left',
          scaleX: 0
        }}
      />
    </div>
  )
}
