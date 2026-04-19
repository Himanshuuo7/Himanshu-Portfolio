import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

export default function SmoothScroll({ children, isLocked }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: true, // Enabled for "liquid" mobile feel
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Connect to ScrollTrigger
    const tickerHandler = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerHandler)

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerHandler)
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current) {
      if (isLocked) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
  }, [isLocked])

  return <>{children}</>
}

