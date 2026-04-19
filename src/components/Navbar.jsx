import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from './Magnetic'
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'Home',     href: '#home',     num: '01' },
  { label: 'About',    href: '#about',    num: '02' },
  { label: 'Skills',   href: '#skills',   num: '03' },
  { label: 'Projects', href: '#projects', num: '04' },
  { label: 'Contact',  href: '#contact',  num: '05' },
]

const HamburgerIcon = ({ isOpen, onClick }) => {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(line1Ref.current, { y: 4, rotate: 45, duration: 0.5, ease: 'power3.inOut' })
      gsap.to(line2Ref.current, { y: -4, rotate: -45, duration: 0.5, ease: 'power3.inOut' })
    } else {
      gsap.to(line1Ref.current, { y: 0, rotate: 0, duration: 0.5, ease: 'power3.inOut' })
      gsap.to(line2Ref.current, { y: 0, rotate: 0, duration: 0.5, ease: 'power3.inOut' })
    }
  }, [isOpen])

  return (
    <div 
      onClick={onClick}
      className="relative w-10 h-10 flex flex-col justify-center items-center cursor-none group"
      data-cursor="pointer"
    >
      <div 
        ref={line1Ref} 
        className="w-8 h-[2px] bg-white mb-[6px] transition-colors group-hover:bg-[#0066FF]" 
        style={{ transformOrigin: 'center' }}
      />
      <div 
        ref={line2Ref} 
        className="w-8 h-[2px] bg-white transition-colors group-hover:bg-[#0066FF]" 
        style={{ transformOrigin: 'center' }}
      />
    </div>
  )
}

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [active, setActive] = useState('home')
  const [lastScroll, setLastScroll] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const progressRef = useRef(null)
  const menuOverlayRef = useRef(null)
  const menuLinksRef = useRef([])
  const menuFooterRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      
      // Update scrolled state for premium floating effect
      setIsScrolled(currentScroll > 50)

      // Always visible on all devices as requested
      setVisible(true)
      
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

    // Active Section Tracking via ScrollTrigger (Superior to IntersectionObserver with Smooth Scroll)
    const sections = ['home', 'about', 'skills', 'projects', 'contact']
    
    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setActive(id)
        }
      })
    })

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(t => {
          if (t.vars.onToggle) t.kill() // Clean up our section triggers
      })
    }
  }, [lastScroll])

  // Mobile Menu Animation Logic
  useEffect(() => {
    const tl = gsap.timeline()
    
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      tl.to(menuOverlayRef.current, { 
        clipPath: 'circle(150% at 100% 0%)', 
        duration: 1, 
        ease: 'power4.inOut' 
      })
      .fromTo(menuLinksRef.current, 
        { y: '100%' }, 
        { y: '0%', duration: 1, stagger: 0.1, ease: 'power4.out' },
        '-=0.4'
      )
      .fromTo(menuFooterRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
    } else {
      // EXIT animation: Immediate link removal as requested
      tl.to(menuLinksRef.current, { 
        y: '105%', 
        duration: 0.3, 
        stagger: 0, // No stagger for "immediate" look
        ease: 'power2.in'
      })
      .to(menuFooterRef.current, { opacity: 0, y: 10, duration: 0.2 }, '-=0.2')
      .to(menuOverlayRef.current, { 
        clipPath: 'circle(0% at 100% 0%)', 
        duration: 0.6, 
        ease: 'power4.inOut',
        onComplete: () => {
            document.body.style.overflow = 'auto'
        }
      }, '-=0.1')
    }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
        setTimeout(() => {
            window.scrollTo({
                top: el.offsetTop,
                behavior: 'smooth'
            })
        }, 500) // Slightly faster delay now that links exit immediately
    }
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          zIndex: 300,
          padding: isScrolled ? '0.8rem 4vw' : '1.5rem 4vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          background: (isScrolled || menuOpen) ? 'rgba(11, 11, 11, 0.85)' : 'transparent',
          backdropFilter: (isScrolled || menuOpen) ? 'blur(20px)' : 'none',
          borderBottom: (isScrolled && !menuOpen) ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          // Performance and Visibility
          visibility: visible || menuOpen ? 'visible' : 'hidden',
          // Premium Floating Pill - Desktop Only
          marginTop: (isScrolled && !menuOpen && window.innerWidth >= 768) ? '1rem' : '0',
          borderRadius: (isScrolled && !menuOpen && window.innerWidth >= 768) ? '100px' : '0',
          boxShadow: (isScrolled && !menuOpen && window.innerWidth >= 768) ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
          width: (isScrolled && !menuOpen && window.innerWidth >= 768) ? 'calc(100% - 2rem)' : '100%',
          transform: (visible || menuOpen) 
            ? ((isScrolled && !menuOpen && window.innerWidth >= 768) ? 'translate(-50%, 0)' : 'translate(-50%, 0)') 
            : 'translate(-50%, -100%)'
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
            transition: 'opacity 0.3s'
          }}
          className={menuOpen ? 'opacity-0' : 'opacity-100'}
        />

        <div 
          style={{ 
            fontFamily: '"Bebas Neue", sans-serif', 
            fontSize: '1.8rem', 
            color: '#FFFFFF',
            zIndex: 201,
            transition: 'opacity 0.3s'
          }}
          className={`cursor-none ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
          data-cursor="pointer"
          onClick={() => scrollTo('#home')}
        >
          H<span style={{ color: '#0066FF' }}>.</span>
        </div>

        {/* Desktop Nav - Removed inline display: none to fix visibility */}
        <nav className="hidden md:flex items-center gap-12">
          {LINKS.map(({ label, href }) => {
            const isActive = active === href.slice(1)
            return (
              <Magnetic key={label} strength={0.2}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`nav-link-hover font-mono text-[0.75rem] uppercase tracking-[0.2em] bg-none border-none cursor-none ${isActive ? 'text-[#0066FF]' : 'text-white/40'}`}
                  data-cursor="pointer"
                >
                  {label}
                </button>
              </Magnetic>
            )
          })}
        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden z-[301]">
          <HamburgerIcon isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-[#0B0B0B] z-[150] flex flex-col justify-center px-[8vw]"
        style={{ clipPath: 'circle(0% at 100% 0%)' }}
      >
        <div className="flex flex-col gap-4 mt-8">
          <p className="font-mono text-[0.65rem] text-blue-500/50 uppercase tracking-[0.4em] mb-4">Navigation</p>
          {LINKS.map(({ label, href, num }, i) => (
            <div key={label} className="mask-wrap border-b border-white/5 py-2">
              <button 
                ref={el => menuLinksRef.current[i] = el}
                onClick={() => scrollTo(href)}
                className="mask-content group flex items-baseline gap-6 bg-none border-none text-left cursor-none"
                data-cursor="pointer"
              >
                <span className="font-mono text-[0.8rem] text-white/20 group-hover:text-blue-500 transition-colors uppercase">{num}</span>
                <span className={`font-['Bebas_Neue'] text-6xl sm:text-7xl lg:text-8xl transition-all duration-500 group-hover:pl-4 ${active === href.slice(1) ? 'text-blue-500' : 'text-white'}`}>
                  {label.toUpperCase()}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div ref={menuFooterRef} className="mt-16 flex flex-col gap-6">
          <div className="h-[1px] w-full bg-white/5" />
          <div className="flex justify-between items-center flex-wrap gap-6">
            <div className="flex gap-6">
                {[
                    { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/himanshu-sonkusre' },
                    { icon: <FaGithub />, href: 'https://github.com/Himanshuuo7' },
                    { icon: <FaXTwitter />, href: 'https://x.com/himmu_o7' },
                    { icon: <FaInstagram />, href: 'https://www.instagram.com/_himen_lyy/' }
                ].map((social, idx) => (
                   <a 
                      key={idx}
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl text-white/40 hover:text-blue-500 transition-all transform hover:scale-110"
                   >
                       {social.icon}
                   </a>
                ))}
            </div>
            <p className="font-mono text-[0.6rem] text-white/20 uppercase tracking-[0.2em]">© 2024 Himanshu S.</p>
          </div>
        </div>
      </div>
    </>
  )
}
