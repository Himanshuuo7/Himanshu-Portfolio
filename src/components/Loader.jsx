import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const IDENTITY_WORDS = ["DESIGN", "CODE", "ENGINEER", "HIMANSHU."]

export default function Loader({ onComplete }) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const nameRef = useRef(null)
  const [currentWord, setCurrentWord] = useState(IDENTITY_WORDS[0])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })

    // 1. Word Cycle Phase
    const wordCycleTl = gsap.timeline()
    
    IDENTITY_WORDS.slice(0, 3).forEach((word) => {
        wordCycleTl.to({}, { 
            duration: 0.3, 
            onStart: () => setCurrentWord(word) 
        })
        .fromTo(nameRef.current, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
        )
        .to(nameRef.current, { 
            y: -30, opacity: 0, duration: 0.2, ease: 'power3.in', delay: 0.1 
        })
    })

    // 2. Final Signature Reveal + Kinetic Counter
    const subtitleWords = containerRef.current.querySelectorAll('.subtitle-word')
    gsap.set(subtitleWords, { y: 20, opacity: 0 })

    tl.add(wordCycleTl)
    .to({}, { 
        duration: 0.1, 
        onStart: () => setCurrentWord(IDENTITY_WORDS[3]) 
    })
    .fromTo(nameRef.current, 
        { y: 50, opacity: 0, letterSpacing: '0.2em' }, 
        { y: 0, opacity: 1, letterSpacing: '0.05em', duration: 1.2, ease: 'expo.out' }
    )
    .to(subtitleWords, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.6')
    .to({}, {
      duration: 2.5,
      onUpdate: function() {
        const p = this.progress()
        const easedP = gsap.parseEase('power2.inOut')(p)
        setCount(Math.round(easedP * 100))
      }
    }, '-=1.2')

    // 3. Pro-Level Exit (No more curves, just premium slide)
    tl.to(nameRef.current, {
        textShadow: '0 0 30px rgba(255,255,255,0.5)',
        duration: 0.8,
        ease: 'power2.inOut'
    }, '-=0.5')
    .to(containerRef.current, {
      y: '-100%',
      duration: 1.2,
      ease: 'expo.inOut',
      delay: 0.1
    })

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30
        const y = (e.clientY / window.innerHeight - 0.5) * 30
        // Clean Magnetic Drift - No Tilt
        gsap.to(contentRef.current, { x, y, duration: 1, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
        tl.kill()
        window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [onComplete])

  return (
    <div 
        ref={containerRef} 
        style={{ 
            position: 'fixed', inset: 0, zIndex: 1000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#000000', overflow: 'hidden'
        }}
    >
      <div ref={contentRef} style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: -500, background: 'url(https://grainy-gradients.vercel.app/noise.svg)', opacity: 0.05, pointerEvents: 'none', zIndex: -1 }} />

        <div style={{ overflow: 'hidden' }}>
          <h1 
            ref={nameRef}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              color: '#FFFFFF',
              lineHeight: 1,
              margin: 0,
              willChange: 'transform, opacity, letter-spacing, text-shadow'
            }}
          >
            {currentWord === "HIMANSHU." ? (
                <>HIMANSHU<span style={{ color: '#0066FF' }}>.</span></>
            ) : currentWord}
          </h1>
        </div>
        
        <p 
            className="subtitle-wrapper"
            style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.6em',
                marginTop: '2rem',
                textTransform: 'uppercase',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                gap: '1em'
            }}
        >
            {"Designing Real Experience".split(' ').map((word, i) => (
                <span key={i} className="subtitle-word inline-block" style={{ willChange: 'transform, opacity' }}>
                    {word}
                </span>
            ))}
        </p>

        {/* Minimalist Central Counter */}
        <div style={{ 
            marginTop: '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.8rem',
            opacity: 0.5
        }}>
            <div style={{ width: '30px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
            <span style={{ 
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.8rem',
                color: '#FFFFFF',
                letterSpacing: '0.3em'
            }}>
                {count}%
            </span>
        </div>
      </div>
    </div>
  )
}
