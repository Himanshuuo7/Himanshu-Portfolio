import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowUpRight, FiMail, FiMapPin } from 'react-icons/fi'
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'
import Magnetic from '../components/Magnetic'
import { useIsDesktop } from '../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const isDesktop = useIsDesktop()


  useEffect(() => {
    gsap.fromTo(formRef.current.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      }
    )
  }, [])


  return (
    <section id="contact" ref={containerRef} className="section-padding" style={{ background: '#0B0B0B', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading
          label="LET'S CONNECT"
          title="START A STORY"
          subtitle="Ready to push the boundaries of your digital presence?"
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem',
            marginTop: '6rem'
          }}
        >
          {isDesktop ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 15vw, 10rem)', color: '#FFFFFF', lineHeight: 0.8, letterSpacing: '-0.02em', margin: '0 0 4rem 0' }}>
                  SAY <br />
                  <span style={{ color: '#0066FF' }}>HELLO.</span>
                </h2>

                <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  <div>
                    <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>GET IN TOUCH</p>
                    <Magnetic strength={0.2}>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=himanshusonkusre8@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                          textDecoration: 'none',
                          color: '#FFFFFF',
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#0066FF';
                          e.currentTarget.querySelector('.contact-icon-circle').style.borderColor = '#0066FF';
                          e.currentTarget.querySelector('.contact-icon-circle').style.background = 'rgba(0,102,255,0.1)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#FFFFFF';
                          e.currentTarget.querySelector('.contact-icon-circle').style.borderColor = 'rgba(255,255,255,0.1)';
                          e.currentTarget.querySelector('.contact-icon-circle').style.background = 'none';
                        }}
                      >
                        <div className="contact-icon-circle" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', transition: 'all 0.4s ease' }}>
                          <FiMail />
                        </div>
                        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1.4rem', fontWeight: 500, letterSpacing: '-0.01em' }}>himanshusonkusre8@gmail.com</span>
                      </a>
                    </Magnetic>
                  </div>

                  <div>
                    <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>LOCATION</p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        color: '#FFFFFF',
                        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#0066FF';
                        e.currentTarget.querySelector('.contact-icon-circle-loc').style.borderColor = '#0066FF';
                        e.currentTarget.querySelector('.contact-icon-circle-loc').style.background = 'rgba(0,102,255,0.1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.querySelector('.contact-icon-circle-loc').style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.querySelector('.contact-icon-circle-loc').style.background = 'none';
                      }}
                    >
                      <div className="contact-icon-circle-loc" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', transition: 'all 0.4s ease' }}>
                        <FiMapPin />
                      </div>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1.4rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Waraseoni, Madhya Pradesh</span>
                    </div>
                  </div>
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={e => e.preventDefault()}
                style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingTop: '1rem' }}
              >
                <div style={{ position: 'relative' }}>
                  <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em' }}>01. WHAT'S YOUR NAME?</label>
                  <input type="text" placeholder="Enter Your Name" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', color: '#FFFFFF', fontFamily: '"DM Sans", sans-serif', fontSize: '1.2rem', outline: 'none' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em' }}>02. WHAT'S YOUR EMAIL?</label>
                  <input type="email" placeholder="Enter Your Email" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', color: '#FFFFFF', fontFamily: '"DM Sans", sans-serif', fontSize: '1.2rem', outline: 'none' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em' }}>03. YOUR MESSAGE</label>
                  <textarea rows="4" placeholder="I have a project in mind..." style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', color: '#FFFFFF', fontFamily: '"DM Sans", sans-serif', fontSize: '1.2rem', outline: 'none', resize: 'none' }} />
                </div>
                <div>
                  <Magnetic strength={0.3}>
                    <button style={{ background: '#0066FF', color: '#0B0B0B', border: 'none', padding: '1.5rem 4rem', fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      SEND INQUIRY <FiArrowUpRight />
                    </button>
                  </Magnetic>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Header Area */}
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 15vw, 12rem)', color: '#FFFFFF', lineHeight: 0.8, letterSpacing: '-0.02em', margin: 0 }}>
                SAY <br />
                <span style={{ color: '#0066FF' }}>HELLO.</span>
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '6rem',
                alignItems: 'start'
              }}>
                {/* Minimalist Form */}
                <form
                  ref={formRef}
                  onSubmit={e => e.preventDefault()}
                  style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
                >
                  <div style={{ position: 'relative' }}>
                    <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em' }}>01. WHAT'S YOUR NAME?</label>
                    <input type="text" placeholder="John Doe *" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', color: '#FFFFFF', fontFamily: '"DM Sans", sans-serif', fontSize: '1.2rem', outline: 'none' }} />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em' }}>02. WHAT'S YOUR EMAIL?</label>
                    <input type="email" placeholder="john@doe.com *" style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', color: '#FFFFFF', fontFamily: '"DM Sans", sans-serif', fontSize: '1.2rem', outline: 'none' }} />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em' }}>03. YOUR MESSAGE</label>
                    <textarea rows="4" placeholder="I have a project in mind..." style={{ width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', color: '#FFFFFF', fontFamily: '"DM Sans", sans-serif', fontSize: '1.2rem', outline: 'none', resize: 'none' }} />
                  </div>

                  <div>
                    <Magnetic strength={0.3}>
                      <button style={{ background: '#0066FF', color: '#0B0B0B', border: 'none', padding: '1.5rem 4rem', fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        SEND INQUIRY <FiArrowUpRight />
                      </button>
                    </Magnetic>
                  </div>
                </form>

                {/* Contact Info Area */}
                <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <div>
                    <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em', marginBottom: '1.2rem' }}>CONTACT DETAILS</p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=himanshusonkusre8@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textDecoration: 'none',
                        color: '#FFFFFF'
                      }}
                    >
                      <FiMail style={{ color: '#0066FF' }} />
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1rem' }}>himanshusonkusre8@gmail.com</span>
                    </a>
                  </div>

                  <div>
                    <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#0066FF', letterSpacing: '0.2em', marginBottom: '1.2rem' }}>LOCATION</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFFFFF' }}>
                      <FiMapPin style={{ color: '#0066FF' }} />
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1rem' }}>Waraseoni, Madhya Pradesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  )
}
