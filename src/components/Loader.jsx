import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const percentageRef = useRef(null)
  const nameRef = useRef(null)
  const tagRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })

    // Initialization
    gsap.set([nameRef.current, tagRef.current, percentageRef.current], { opacity: 0, y: 20 })
    gsap.set(progressRef.current, { scaleX: 0 })

    tl.to([nameRef.current, percentageRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    })
    .to(tagRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .to(progressRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: 'power2.inOut',
    }, '-=0.6')
    .to({}, {
      duration: 2.2,
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100)
        if (percentageRef.current) percentageRef.current.innerText = `${progress}%`
      }
    }, '-=2.5')
    .to(containerRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'expo.inOut',
      delay: 0.2
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={containerRef} className="loader-overlay" style={{ background: '#0B0B0B' }}>
      {/* Progress line */}
      <div 
        ref={progressRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '2px',
          background: '#0066FF',
          transformOrigin: 'left',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
          zIndex: 10
        }}
      />

      <div style={{ textAlign: 'center' }}>
        <h1 
          ref={nameRef}
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            color: '#FFFFFF',
            letterSpacing: '0.05em',
            lineHeight: 1,
            margin: 0
          }}
        >
          HIMANSHU<span style={{ color: '#0066FF' }}>.</span>
        </h1>
        <p 
          ref={tagRef}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'max(0.7rem, 1vw)',
            color: '#0066FF',
            letterSpacing: '0.5em',
            marginTop: '1rem',
            opacity: 0.8
          }}
        >
          CREATIVE DEVELOPER
        </p>
      </div>

      <div 
        ref={percentageRef}
        style={{
          position: 'absolute', bottom: '10%', right: '10%',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: 'rgba(255, 255, 255, 0.03)',
          fontWeight: 900,
          fontStyle: 'italic'
        }}
      >
        0%
      </div>

      <div 
        style={{
          position: 'absolute', bottom: '2rem', left: '2rem',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.2)',
          letterSpacing: '0.2em'
        }}
      >
        © 2026 — DIGITAL ARCHIVE
      </div>
    </div>
  )
}

