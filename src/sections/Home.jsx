import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from '../components/Magnetic'
import Hero3D from '../components/Hero3D'
import { useIsDesktop } from '../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const parallaxRef = useRef(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    // Entry animation sequence
    tl.fromTo(title1Ref.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
    )
    .fromTo(title2Ref.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5 }, 
      '-=1.2'
    )
    .fromTo(subtitleRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      '-=1'
    )
    .fromTo(ctaRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      '-=0.8'
    )
    .fromTo(scrollRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }, 
      '-=0.5'
    )

    // Parallax effect on scroll
    gsap.to(parallaxRef.current, {
      y: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
        window.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth'
        })
    }
  }

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: isDesktop ? 'center' : 'flex-start',
        background: '#0B0B0B',
        overflow: 'hidden',
        paddingTop: isDesktop ? '100px' : '120px'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 10% 20%, rgba(0, 102, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.02) 0%, transparent 50%)',
          zIndex: 0
        }}
      />

      {/* Hero 3D Element — Desktop Only */}
      {isDesktop && (
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
          <Hero3D />
        </div>
      )}

      {/* Cinematic Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 8vw',
          width: '100%'
        }}
      >
        <div style={{ maxWidth: '1000px' }}>
          {/* Eyebrow */}
          <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
                letterSpacing: '0.4em',
                color: '#0066FF',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span style={{ width: '40px', height: '1px', background: '#0066FF' }} />
              FULL STACK ENGINEER
            </p>
          </div>

          {/* Heading */}
          <div style={{ overflow: 'hidden' }}>
            <h1
              ref={title1Ref}
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                color: '#FFFFFF',
                lineHeight: 0.9,
                letterSpacing: '-0.02em'
              }}
            >
              BUILDING<span style={{ color: '#0066FF' }}>.</span>
            </h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <h1
              ref={title2Ref}
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                color: '#FFFFFF',
                lineHeight: 0.9,
                letterSpacing: '-0.02em'
              }}
            >
              BOLD PRODUCTS
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} style={{ maxWidth: '600px', marginBottom: '3rem' }}>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: 1.6,
                fontWeight: 300
              }}
            >
              I build immersive, high-performance web experiences that live 
              at the intersection of <span style={{ color: '#FFFFFF', fontWeight: 500 }}>design & technology</span>.
            </p>
          </div>

          {/* CTA Buttons with Magnetic Physics */}
          <div 
            ref={ctaRef}
            style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Magnetic strength={0.4}>
              <button
                onClick={() => scrollTo('#projects')}
                style={{
                  padding: '1.25rem 2.5rem',
                  background: '#0066FF',
                  color: '#0B0B0B',
                  border: 'none',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  cursor: 'none'
                }}
                data-cursor="pointer"
              >
                EXPLORE WORK
              </button>
            </Magnetic>

            <Magnetic strength={0.4}>
              <button
                onClick={() => scrollTo('#contact')}
                style={{
                  padding: '1.25rem 2.5rem',
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  cursor: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0066FF'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                data-cursor="pointer"
              >
                LET'S TALK
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Scroll Indicator — Responsive Positioning */}
        <div
          ref={scrollRef}
          style={{
            position: isDesktop ? 'absolute' : 'relative',
            bottom: isDesktop ? '4rem' : 'auto',
            right: isDesktop ? '4rem' : 'auto',
            marginTop: isDesktop ? 0 : '6rem',
            width: isDesktop ? 'auto' : '100%',
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            zIndex: 10
          }}
        >
          {isDesktop && (
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                color: 'rgba(255, 255, 255, 0.3)',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
              }}
            >
              SCROLL TO EXPLORE
            </span>
          )}
          <Magnetic strength={0.3}>
            <div 
              className="animate-float"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 102, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => scrollTo('#about')}
            >
              <div 
                style={{
                  width: '1px',
                  height: '15px',
                  background: '#0066FF',
                }}
              />
            </div>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

