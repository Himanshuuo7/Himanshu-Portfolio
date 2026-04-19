import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/SectionHeading'
import Magnetic from '../components/Magnetic'
import profileImg from '../assets/himanshu.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const parallaxImgRef = useRef(null)
  const bgTextRef = useRef(null)
  const contentRef = useRef(null)
  const headingRef = useRef(null)
  const textRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      })

      tl.fromTo(imageRef.current, 
        { scale: 1.2, opacity: 0, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }, 
        { scale: 1, opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.8, ease: 'expo.out' }
      )
      .fromTo(headingRef.current,
        { y: 150, rotateX: 45 },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
        '-=1.4'
      )
      .fromTo(textRefs.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
        '-=1'
      )

      // 2. Parallax Scroll Effect for Image Content
      gsap.to(parallaxImgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // 3. Kinetic Background Text (Horizontal Scroll)
      gsap.to(bgTextRef.current, {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleImageMove = (e) => {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    
    gsap.to(currentTarget, {
        rotateY: x * 15,
        rotateX: -y * 15,
        duration: 0.5,
        ease: 'power2.out'
    })
  }

  const handleImageLeave = (e) => {
    gsap.to(e.currentTarget, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out'
    })
  }

  return (
    <section 
        id="about" 
        ref={containerRef} 
        className="section-padding" 
        style={{ 
            background: '#0B0B0B', 
            overflow: 'hidden',
            position: 'relative'
        }}
    >
      {/* Background Kinetic Text */}
      <div 
        ref={bgTextRef}
        style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            whiteSpace: 'nowrap',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(10rem, 30vw, 40rem)',
            color: 'rgba(255, 255, 255, 0.02)',
            zIndex: 0,
            pointerEvents: 'none',
            transform: 'translateY(-50%)',
            letterSpacing: '0.1em'
        }}
      >
        HIMANSHU SONKUSRE — ABOUT HIMANSHU SONKUSRE — 
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeading
          label="THE STORY"
          title="ABOUT ME"
          subtitle="Merging engineering precision with creative vision."
        />

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', 
            gap: 'clamp(2rem, 8vw, 6rem)',
            marginTop: '4rem',
            alignItems: 'center'
          }}
        >
          {/* Image Container with Micro-interaction */}
          <div 
            ref={imageRef}
            onMouseMove={handleImageMove}
            onMouseLeave={handleImageLeave}
            style={{ 
              position: 'relative',
              aspectRatio: '4/5',
              background: '#151515',
              perspective: '2000px',
              cursor: 'none'
            }}
            data-cursor="pointer"
          >
            <div 
                style={{
                    position: 'absolute',
                    inset: '0', 
                    zIndex: 1,
                    overflow: 'hidden'
                }}
            >
                <div 
                    ref={parallaxImgRef}
                    style={{
                        position: 'absolute',
                        inset: '0',
                        background: `url(${profileImg}) center/cover`,
                        filter: 'grayscale(100%) contrast(110%)',
                        transition: 'filter 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%) contrast(100%)'}
                    onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%) contrast(110%)'}
                />
            </div>
            {/* Decorative frame */}
            <div 
                style={{
                    position: 'absolute',
                    top: '-1rem', left: '-1rem',
                    width: '4rem', height: '4rem',
                    borderTop: '2px solid #0066FF',
                    borderLeft: '2px solid #0066FF',
                    zIndex: 2
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    bottom: '-1rem', right: '-1rem',
                    width: '4rem', height: '4rem',
                    borderBottom: '2px solid #0066FF',
                    borderRight: '2px solid #0066FF',
                    zIndex: 2
                }}
            />
          </div>

          {/* Text Content */}
          <div ref={contentRef}>
            <div style={{ overflow: 'hidden' }}>
                <h3 
                    ref={headingRef}
                    style={{ 
                        fontFamily: '"Bebas Neue", sans-serif', 
                        fontSize: 'clamp(3rem, 7vw, 5rem)', 
                        color: '#FFFFFF',
                        marginBottom: '2rem',
                        letterSpacing: '0.05em',
                        lineHeight: 0.9
                    }}
                >
                    DRIVEN BY DIGITAL <br />
                    <span style={{ color: '#0066FF' }}>EXCELLENCE</span>
                </h3>
            </div>
            
            <p 
                ref={el => textRefs.current[0] = el}
                style={{ 
                    fontFamily: '"DM Sans", sans-serif', 
                    fontSize: '1.25rem', 
                    lineHeight: 1.6, 
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '1.5rem',
                    fontWeight: 300
                }}
            >
              I am Himanshu, a specialized <span style={{ color: '#0066FF', fontWeight: 500 }}>Full Stack Engineer</span> focused on building premium digital experiences. My approach combines technical robustness with a keen eye for motion and aesthetics.
            </p>
            <p 
                ref={el => textRefs.current[1] = el}
                style={{ 
                    fontFamily: '"DM Sans", sans-serif', 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8, 
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '3rem'
                }}
            >
              Whether it's architecting complex backend systems or crafting pixel-perfect GSAP transitions, I thrive on solving challenges that push the boundaries of what's possible on the web.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <Magnetic strength={0.3}>
                    <button 
                        style={{
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: '0.8rem',
                            color: '#0B0B0B',
                            background: '#0066FF',
                            border: 'none',
                            padding: '1.25rem 2.5rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            cursor: 'none'
                        }}
                        data-cursor="pointer"
                    >
                        DOWNLOAD CV
                    </button>
                </Magnetic>
                <div 
                    style={{
                        padding: '1.25rem 2rem',
                        background: 'rgba(255, 215, 0, 0.05)',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <div className="status-dot-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0066FF', boxShadow: '0 0 10px #0066FF' }} />
                    <span style={{ fontSize: '0.75rem', fontFamily: '"JetBrains Mono", monospace', color: 'rgba(255, 255, 255, 0.6)' }}>AVAILABLE FOR PROJECTS</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }
        .status-dot-pulse { animation: pulse 2s infinite ease-in-out; }
      `}</style>
    </section>
  )
}

