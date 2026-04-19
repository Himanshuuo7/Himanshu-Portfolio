import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowUpRight, FiMail, FiMapPin } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import Magnetic from '../components/Magnetic'
import { useIsDesktop } from '../hooks/useMediaQuery'
import Toast from '../components/Toast'

gsap.registerPlugin(ScrollTrigger)

const FormField = ({ label, type = 'text', placeholder, num, value, onChange, name, required = false }) => {
  const lineRef = useRef(null)
  const labelRef = useRef(null)
  const inputRef = useRef(null)

  const onFocus = () => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: 'power3.out' })
    gsap.to(labelRef.current, { color: '#0066FF', x: 10, duration: 0.4 })
  }

  const onBlur = (e) => {
    if (!e.target.value) {
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.6, ease: 'power3.inOut' })
      gsap.to(labelRef.current, { color: 'rgba(0, 102, 255, 0.4)', x: 0, duration: 0.4 })
    }
  }

  return (
    <div className="relative mb-12 group">
      <label
        ref={labelRef}
        className="block font-mono text-[0.65rem] text-blue-500/40 uppercase tracking-[0.3em] mb-4 transition-all"
      >
        {num}. {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          rows="5"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-transparent border-none border-b border-white/10 pb-4 text-xl md:text-2xl text-white outline-none placeholder:text-white/10 resize-none font-light"
        />
      ) : (
        <input
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-transparent border-none border-b border-white/10 pb-4 text-xl md:text-2xl text-white outline-none placeholder:text-white/10 font-light"
        />
      )}

      {/* Animated focus line */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066FF] scale-x-0 origin-left"
      />
    </div>
  )
}

const ContactInfoItem = ({ icon: Icon, label, value, href }) => {
  const circleRef = useRef(null)

  const handleMouseEnter = () => {
    gsap.to(circleRef.current, { scale: 1.1, backgroundColor: 'rgba(0, 102, 255, 0.1)', borderColor: '#0066FF', duration: 0.4 })
  }

  const handleMouseLeave = () => {
    gsap.to(circleRef.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.1)', duration: 0.4 })
  }

  const innerContent = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-center gap-6 group cursor-none w-full"
      data-cursor="pointer"
    >
      <div
        ref={circleRef}
        className="w-14 h-14 min-w-[3.5rem] rounded-full border border-white/10 flex items-center justify-center text-xl text-white group-hover:text-blue-500 transition-colors duration-400"
      >
        <Icon />
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <p className="font-mono text-[0.6rem] text-blue-500/50 uppercase tracking-[0.3em] mb-1">{label}</p>
        <p className="text-[0.9rem] sm:text-lg md:text-xl text-white/80 group-hover:text-white transition-colors duration-400 leading-tight break-words">{value}</p>
      </div>
    </div>
  )

  return (
    <Magnetic strength={0.15}>
      <div className="w-full">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline block w-full">
            {innerContent}
          </a>
        ) : (
          <div className="block w-full">
            {innerContent}
          </div>
        )}
      </div>
    </Magnetic>
  )
}
export default function Contact() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })

  const showNotification = (message, type = 'success') => {
    setToast({ isVisible: true, message, type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      showNotification('Please fill out all fields before sending.', 'error')
      return
    }

    setIsSending(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('message', message)
      formData.append('_replyto', email)
      formData.append('_subject', 'New inquiry from portfolio site')
      formData.append('_template', 'table')

      const response = await fetch('https://formsubmit.co/ajax/himanshusonkusre8@gmail.com', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send message. Please try again later.')
      }

      showNotification('Inquiry sent successfully. I will get back to you soon!', 'success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      showNotification(error.message || 'Something went wrong. Please try again.', 'error')
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    const titleLines = titleRef.current.querySelectorAll('.mask-content')

    gsap.fromTo(titleLines,
      { y: '100%', rotate: 5 },
      {
        y: '0%',
        rotate: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%'
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
        onMouseEnter={handleCharHover}
        onMouseLeave={handleCharLeave}
        className={`inline-block transition-colors duration-300 ${customClass}`}
        style={{ willChange: 'transform, color' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section id="contact" ref={containerRef} className="relative py-24 md:py-40 bg-[#0B0B0B] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          label="LET'S CONNECT"
          title="START A STORY"
          subtitle="Ready to push the boundaries of your digital presence? Reach out and let's build something exceptional."
        />

        {/* Desktop Layout: Side-by-side | Mobile Layout: Stacked in specific order */}
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 mt-20 lg:mt-32">

          {/* Left Side (Desktop) / Top Parts (Mobile) */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div ref={titleRef} className="mb-20">
              <h2 className="font-['Bebas_Neue'] text-7xl md:text-9xl lg:text-[10rem] text-white leading-[0.85] tracking-tighter">
                <div className="mask-wrap">
                  <div className="mask-content flex flex-wrap">
                    {renderChars("SAY")}
                  </div>
                </div>
                <div className="mask-wrap">
                  <div className="mask-content flex flex-wrap">
                    {renderChars("HELLO", "text-blue-500")}
                    <span
                      onMouseEnter={handleCharHover}
                      onMouseLeave={handleCharLeave}
                      className="inline-block transition-colors duration-300 text-white"
                    >.</span>
                  </div>
                </div>
              </h2>
            </div>

            {/* Hidden Info on Mobile (will appear at bottom) */}
            <div className="hidden lg:flex flex-col gap-10">
              <ContactInfoItem
                icon={FiMail}
                label="Get in touch"
                value="himanshusonkusre8@gmail.com"
                href="mailto:himanshusonkusre8@gmail.com"
              />
              <ContactInfoItem
                icon={FiMapPin}
                label="Location"
                value="Waraseoni, Madhya Pradesh"
              />
            </div>
          </div>

          {/* Right Side (Desktop) / Middle (Mobile) */}
          <div className="lg:w-1/2 relative">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col">
              <FormField
                num="01"
                label="What's your name?"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormField
                num="02"
                label="What's your email?"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormField
                num="03"
                label="Your message"
                type="textarea"
                placeholder="Describe your project..."
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <div className="mt-10 flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-start">
                <Magnetic strength={0.3}>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="group relative px-10 py-5 bg-blue-600 text-[#0B0B0B] font-mono text-sm font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 hover:bg-white cursor-none disabled:opacity-50"
                    data-cursor="pointer"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isSending ? 'Sending...' : 'Send Inquiry'}
                      <FiArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-500" />
                    </span>
                  </button>
                </Magnetic>
              </div>
            </form>
          </div>

          {/* Bottom Info on Mobile ONLY */}
          <div className="lg:hidden flex flex-col gap-10 mt-10 px-4">
            <ContactInfoItem
              icon={FiMail}
              label="Get in touch"
              value="himanshusonkusre8@gmail.com"
              href="mailto:himanshusonkusre8@gmail.com"
            />
            <ContactInfoItem
              icon={FiMapPin}
              label="Location"
              value="Waraseoni, Madhya Pradesh"
            />
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <Toast 
        {...toast} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />
    </section>
  )
}
