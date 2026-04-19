import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from './Magnetic'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [lastScroll, setLastScroll] = useState(0)
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const progressRef = useRef(null)
  const menuOverlayRef = useRef(null)
  const menuLinksRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > lastScroll && currentScroll > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScroll(currentScroll)
    }

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        scrub: 0.3,
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [lastScroll])

  // Mobile Menu Animation
  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuOverlayRef.current, { 
        clipPath: 'circle(150% at 100% 0%)', 
        duration: 1.2, 
        ease: 'power4.inOut' 
      })
      gsap.fromTo(menuLinksRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.5, ease: 'power4.out' }
      )
    } else {
      gsap.to(menuOverlayRef.current, { 
        clipPath: 'circle(0% at 100% 0%)', 
        duration: 1, 
        ease: 'power4.inOut' 
      })
    }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
        window.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth'
        })
    }
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 300,
          padding: '1.5rem 4vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          background: lastScroll > 50 || menuOpen ? 'rgba(11, 11, 11, 0.95)' : 'transparent',
          backdropFilter: lastScroll > 50 || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: lastScroll > 50 && !menuOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}
      >
        <div 
          ref={progressRef}
          style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '100%', height: '1px',
            background: '#0066FF',
            transformOrigin: 'left',
            scaleX: 0,
            zIndex: 101,
            opacity: menuOpen ? 0 : 1,
            visibility: menuOpen ? 'hidden' : 'visible',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}
        />

        <div 
          style={{ 
            fontFamily: '"Bebas Neue", sans-serif', 
            fontSize: '1.8rem', 
            color: '#FFFFFF',
            cursor: 'none',
            zIndex: 201,
            opacity: menuOpen ? 0 : 1,
            visibility: menuOpen ? 'hidden' : 'visible',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}
          data-cursor="pointer"
          onClick={() => scrollTo('#home')}
        >
          H<span style={{ color: '#0066FF' }}>.</span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'none', gap: '3rem', alignItems: 'center' }} className="md-flex">
          {LINKS.map(({ label, href }) => {
            const isActive = active === href.slice(1)
            return (
              <Magnetic key={label} strength={0.2}>
                <button
                  onClick={() => scrollTo(href)}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    color: isActive ? '#0066FF' : 'rgba(255, 255, 255, 0.4)',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    padding: '10px'
                  }}
                  data-cursor="pointer"
                >
                  {label.toUpperCase()}
                </button>
              </Magnetic>
            )
          })}
        </nav>

        {/* Hamburger */}
        <div 
          style={{ cursor: 'pointer', zIndex: 301 }} 
          className="md-hide" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Magnetic strength={0.5}>
            <div style={{ color: menuOpen ? '#0066FF' : '#FFFFFF', fontSize: '1.8rem', padding: '0.5rem' }}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </div>
          </Magnetic>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        ref={menuOverlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0B0B0B',
          zIndex: 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10vw',
          clipPath: 'circle(0% at 100% 0%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem', color: 'rgba(0, 102, 255, 0.5)', letterSpacing: '0.3em' }}>MENU</p>
          {LINKS.map(({ label, href }, i) => (
            <button 
              key={label}
              ref={el => menuLinksRef.current[i] = el}
              onClick={() => scrollTo(href)}
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3.5rem, 15vw, 6rem)',
                color: active === href.slice(1) ? '#0066FF' : '#FFFFFF',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                textDecoration: 'none',
                lineHeight: 1,
                cursor: 'none',
                transition: 'color 0.3s'
              }}
              data-cursor="pointer"
            >
              {label.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
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

      <style>{`
        @media (min-width: 768px) {
            .md-flex { display: flex !important; }
            .md-hide { display: none !important; }
        }
        @media (max-width: 767px) {
            .md-hide { display: block !important; }
        }
      `}</style>
    </>
  )
}
