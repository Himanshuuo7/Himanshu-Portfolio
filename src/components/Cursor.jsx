import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  
  const mouse = useRef({ x: 0, y: 0 })
  const delayedMouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      
      // Immediate dot move
      gsap.set(dotRef.current, {
        x: e.clientX,
        y: e.clientY
      })
    }

    const animate = () => {
      // Smooth interpolation for the ring
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * 0.15
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * 0.15

      gsap.set(ringRef.current, {
        x: delayedMouse.current.x,
        y: delayedMouse.current.y
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    const raf = requestAnimationFrame(animate)

    // Interaction listeners
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    const interactables = document.querySelectorAll('a, button, [data-cursor="pointer"]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div 
        ref={dotRef} 
        className="cursor-dot" 
        style={{ 
          position: 'fixed', top: 0, left: 0, 
          zIndex: 10000, pointerEvents: 'none' 
        }} 
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring ${hovered ? 'hovered' : ''}`}
        style={{ 
          position: 'fixed', top: 0, left: 0, 
          zIndex: 9999, pointerEvents: 'none' 
        }}
      />
    </>
  )
}

