import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/SectionHeading'
import { useIsDesktop } from '../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Frontend Mastery',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    description: 'Crafting pixel-perfect, interactive, and high-performance user interfaces.'
  },
  {
    title: 'Backend & System',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Firebase', 'REST APIs', 'JWT Auth'],
    description: 'Architecting scalable server-side solutions and robust database schemas.'
  },
  {
    title: 'Tools & Ecosystem',
    skills: ['Git & GitHub', 'Postman', 'Docker', 'Vercel', 'AWS', 'Figma', 'Webpack', 'CI/CD'],
    description: 'Leveraging modern tooling to streamline development and deployment workflows.'
  }
]

const SkillItem = ({ category, index }) => {
  const itemRef = useRef(null)
  const skillsRef = useRef(null)
  const descRef = useRef(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const el = itemRef.current
    const skills = skillsRef.current.querySelectorAll('.skill-tag')
    const desc = descRef.current
    const bgReveal = el.querySelector('.bg-reveal')
    const arrow = el.querySelector('.arrow')
    const title = el.querySelector('.title-text')

    let ctx = gsap.context(() => {
      if (isDesktop) {
        // Desktop Hover Reveal Logic
        gsap.set(skills, { y: 20, opacity: 0 })
        gsap.set(desc, { x: -20, opacity: 0 })

        const mEnter = () => {
          gsap.to(el, { paddingLeft: '4rem', duration: 0.4, ease: 'power2.out' })
          gsap.to(bgReveal, { height: '100%', duration: 0.4, ease: 'power2.inOut' })
          gsap.to(skills, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' })
          gsap.to(desc, { x: 0, opacity: 1, duration: 0.5, delay: 0.1 })
          gsap.to(arrow, { x: 10, opacity: 1, duration: 0.3 })
        }

        const mLeave = () => {
          gsap.to(el, { paddingLeft: '2rem', duration: 0.4, ease: 'power2.inOut' })
          gsap.to(bgReveal, { height: '0%', duration: 0.4, ease: 'power2.inOut' })
          gsap.to(skills, { y: 20, opacity: 0, duration: 0.3, stagger: 0.02 })
          gsap.to(desc, { x: -20, opacity: 0, duration: 0.3 })
          gsap.to(arrow, { x: 0, opacity: 0, duration: 0.3 })
        }

        el.addEventListener('mouseenter', mEnter)
        el.addEventListener('mouseleave', mLeave)

        return () => {
          el.removeEventListener('mouseenter', mEnter)
          el.removeEventListener('mouseleave', mLeave)
        }
      } else {
        // Mobile/Tablet Scroll Reveal Logic
        gsap.set([skills, desc, arrow], { opacity: 0, y: 10 })
        
        ScrollTrigger.create({
          trigger: el,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(title, { color: '#0066FF', duration: 0.5 })
            gsap.to(bgReveal, { height: '100%', duration: 0.6, ease: 'power2.inOut' })
            gsap.to(arrow, { x: 5, opacity: 1, duration: 0.4 })
            gsap.to(desc, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
            gsap.to(skills, { 
              y: 0, 
              opacity: 1, 
              duration: 0.6, 
              stagger: 0.05, 
              delay: 0.3, 
              ease: 'power2.out' 
            })
          },
          once: true
        })
      }
    }, el)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <div 
      ref={itemRef}
      className={`group relative border-b border-white/10 py-12 md:py-16 transition-all duration-500 overflow-hidden ${isDesktop ? 'cursor-none' : ''}`}
      data-cursor="pointer"
      style={{ paddingLeft: '2rem' }}
    >
      {/* Background Hover Reveal */}
      <div className="bg-reveal absolute bottom-0 left-0 w-full h-0 bg-white/[0.02] -z-10 transition-all pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[0.65rem] font-mono text-blue-500/60 uppercase tracking-[0.3em]">
              0{index + 1}
            </span>
            <div className="arrow opacity-0 h-[1px] w-8 bg-blue-500" />
          </div>
          
          <h3 className="title-text text-4xl md:text-6xl lg:text-7xl font-['Bebas_Neue'] text-white group-hover:text-blue-500 transition-colors duration-500 tracking-wider">
            {category.title}
          </h3>
          
          <p ref={descRef} className="mt-4 text-white/40 max-w-md font-light leading-relaxed hidden md:block">
            {category.description}
          </p>
        </div>

        <div className="flex-1">
          <div ref={skillsRef} className="flex flex-wrap gap-2 md:gap-3 justify-start md:justify-end">
            {category.skills.map((skill) => (
              <span 
                key={skill}
                className="skill-tag px-4 py-2 text-[0.7rem] md:text-[0.8rem] font-mono border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const containerRef = useRef(null)

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.group')
    
    gsap.fromTo(items,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    )
  }, [])

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-[#0B0B0B] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20">
          <SectionHeading
            label="TECHNICAL STACK"
            title="CORE EXPERTISE"
            subtitle="Transforming complex problems into elegant digital solutions through modern technology."
          />
        </div>

        <div ref={containerRef} className="flex flex-col">
          {skillCategories.map((cat, i) => (
            <SkillItem key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </section>
  )
}

