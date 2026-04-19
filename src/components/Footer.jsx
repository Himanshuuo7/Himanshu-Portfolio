import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import Magnetic from './Magnetic'
import { useIsDesktop } from '../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const isDesktop = useIsDesktop()


  useEffect(() => {
    gsap.fromTo(textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%',
        }
      }
    )
  }, [])


  const handleCharHover = (e) => {
    gsap.to(e.target, {
      y: -15,
      color: '#0066FF',
      duration: 0.4,
      ease: 'power3.out'
    })
  }

  const handleCharLeave = (e) => {
    gsap.to(e.target, {
      y: 0,
      color: e.target.classList.contains('text-blue-500') ? '#0066FF' : '#FFFFFF',
      duration: 0.4,
      ease: 'power3.out'
    })
  }

  const renderChars = (text, customClass = '') => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        onMouseEnter={isDesktop ? handleCharHover : null}
        onMouseLeave={isDesktop ? handleCharLeave : null}
        className={`inline-block transition-colors duration-300 ${isDesktop ? 'cursor-none' : ''} ${customClass}`}
        style={{ willChange: 'transform, color' }}
        data-cursor={isDesktop ? "pointer" : undefined}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <footer 
        ref={containerRef}
        style={{ 
            background: '#0B0B0B', 
            padding: '5rem 8vw', 
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
      <div 
        style={{ 
            display: 'flex', 
            flexDirection: isDesktop ? 'row' : 'column',
            justifyContent: 'space-between', 
            alignItems: isDesktop ? 'flex-start' : 'center',
            textAlign: isDesktop ? 'left' : 'center',
            gap: isDesktop ? '4rem' : '1.5rem',
            position: 'relative',
            zIndex: 1
        }}
      >
        <div ref={textRef}>
          <h2 
            style={{ 
                fontFamily: '"Bebas Neue", sans-serif', 
                fontSize: 'clamp(3rem, 10vw, 8rem)', 
                color: '#FFFFFF',
                lineHeight: 0.8,
                letterSpacing: '-0.02em',
                marginBottom: isDesktop ? '2rem' : '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isDesktop ? 'flex-start' : 'center'
            }}
          >
            <div className={`flex flex-wrap ${isDesktop ? '' : 'justify-center'}`}>
                {renderChars("LET'S MAKE")}
            </div>
            <div className={`flex flex-wrap ${isDesktop ? '' : 'justify-center'}`}>
                {renderChars("MAGIC", "text-blue-500")}
                {renderChars(" HAPPEN.")}
            </div>
          </h2>
          {isDesktop && (
            <p 
              style={{ 
                  fontFamily: '"JetBrains Mono", monospace', 
                  fontSize: '0.75rem', 
                  color: 'rgba(255, 255, 255, 0.3)',
                  letterSpacing: '0.4em',
                  marginTop: '4rem'
              }}
            >
              © 2026 HIMANSHU — ALL RIGHTS RESERVED
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: isDesktop ? '3rem' : '1.5rem', flexDirection: 'column', alignItems: isDesktop ? 'flex-start' : 'center' }}>
            <div>
                <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>SOCIALS</p>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: isDesktop ? 'flex-start' : 'center' }}>
                    {[
                        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/himanshu-sonkusre' },
                        { icon: <FaGithub />, href: 'https://github.com/Himanshuuo7' },
                        { icon: <FaXTwitter />, href: 'https://x.com/himmu_o7' },
                        { icon: <FaInstagram />, href: 'https://www.instagram.com/_himen_lyy/' }
                    ].map((social, idx) => (
                        <Magnetic key={idx} strength={0.2}>
                            <a 
                                href={social.href} 
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ 
                                    fontSize: '1.2rem', 
                                    color: 'rgba(255, 255, 255, 0.4)', 
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#0066FF'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
                            >
                                {social.icon}
                            </a>
                        </Magnetic>
                    ))}
                </div>
            </div>
        </div>

        {!isDesktop && (
          <p 
            style={{ 
                fontFamily: '"JetBrains Mono", monospace', 
                fontSize: '0.75rem', 
                color: 'rgba(255, 255, 255, 0.3)',
                letterSpacing: '0.4em',
                marginTop: isDesktop ? '2rem' : '1.5rem'
            }}
          >
            © 2026 HIMANSHU — ALL RIGHTS RESERVED
          </p>
        )}
      </div>



      {/* Background kinetic text or decorative element */}
      <div 
        style={{
            position: 'absolute',
            bottom: '2rem',
            right: '0',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(5rem, 20vw, 15rem)',
            color: 'rgba(0, 102, 255, 0.02)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            lineHeight: 1
        }}
      >
        HIMANSHU
      </div>
    </footer>
  )
}
