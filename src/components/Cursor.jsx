import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useIsDesktop } from '../hooks/useMediaQuery'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const [hoverType, setHoverType] = useState('default') // 'default', 'pointer', 'project'
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!isDesktop) return

    // QuickTo for high-performance following
    const xDotTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3' })
    const yDotTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3' })

    const xRingTo = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'power3' })
    const yRingTo = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'power3' })

    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      xDotTo(clientX)
      yDotTo(clientY)
      xRingTo(clientX)
      yRingTo(clientY)
    }

    const onMouseDown = () => {
        gsap.to(ringRef.current, { scale: 0.7, duration: 0.2 })
    }

    const onMouseUp = () => {
        gsap.to(ringRef.current, { scale: 1, duration: 0.2 })
        
        // Shockwave effect
        const shockwave = document.createElement('div')
        shockwave.className = 'cursor-shockwave'
        Object.assign(shockwave.style, {
            position: 'fixed',
            top: `${gsap.getProperty(dotRef.current, 'y')}px`,
            left: `${gsap.getProperty(dotRef.current, 'x')}px`,
            width: '10px', height: '10px',
            border: '1px solid rgba(0, 102, 255, 0.5)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)'
        })
        document.body.appendChild(shockwave)
        
        gsap.to(shockwave, {
            scale: 8,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => shockwave.remove()
        })
    }

    const handleHoverStart = (e) => {
        const target = e.currentTarget
        if (target.closest('.project-card') || target.hasAttribute('data-project')) {
            setHoverType('project')
        } else {
            setHoverType('pointer')
        }
    }

    const handleHoverEnd = () => setHoverType('default')

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const interactables = document.querySelectorAll('a, button, [data-cursor="pointer"], .project-card, .footer-link')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) return

    if (hoverType === 'project') {
        gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.3 })
        gsap.to(ringRef.current, { 
            width: 80, height: 80, 
            background: '#0066FF', border: 'none',
            duration: 0.4, ease: 'power3.out' 
        })
        gsap.to(labelRef.current, { color: '#FFFFFF', scale: 1, opacity: 1, duration: 0.4, delay: 0.1 })
    } else if (hoverType === 'pointer') {
        gsap.to(dotRef.current, { scale: 1.5, background: '#0066FF', duration: 0.3 })
        gsap.to(ringRef.current, { 
            width: 60, height: 60, 
            background: 'transparent',
            border: '1px solid rgba(0, 102, 255, 1)',
            duration: 0.4, ease: 'power3.out' 
        })
        gsap.to(labelRef.current, { scale: 0, opacity: 0, duration: 0.3 })
    } else {
        gsap.to(dotRef.current, { scale: 1, background: '#0066FF', opacity: 1, duration: 0.3 })
        gsap.to(ringRef.current, { 
            width: 40, height: 40, 
            background: 'transparent',
            border: '1px solid rgba(0, 102, 255, 1)',
            duration: 0.4, ease: 'power3.out' 
        })
        gsap.to(labelRef.current, { scale: 0, opacity: 0, duration: 0.3 })
    }
  }, [hoverType, isDesktop])

  if (!isDesktop) return null

  return (
    <>
      <div 
        ref={dotRef} 
        className="cursor-dot" 
        style={{ 
          top: 0, left: 0, 
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }} 
      />
      <div 
        ref={ringRef} 
        className="cursor-ring"
        style={{ 
          top: 0, left: 0, 
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, width, height'
        }}
      >
        <span ref={labelRef} className="cursor-label">View</span>
      </div>
    </>
  )
}

