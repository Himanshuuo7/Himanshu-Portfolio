import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 8

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x0066FF, 2)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // High-Performance Minimalist Geometry
    const shapes = []
    const geometry = new THREE.OctahedronGeometry(1, 0)
    // MeshPhongMaterial is much lighter than PhysicalMaterial
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      shininess: 100,
      specular: 0x0066FF,
    })

    for (let i = 0; i < 12; i++) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
        )
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
        const scale = 0.5 + Math.random() * 2
        mesh.scale.set(scale, scale, scale)
        
        mesh.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.005,
            floatSpeed: (Math.random() - 0.5) * 0.002
        }
        
        shapes.push(mesh)
        scene.add(mesh)
    }

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const mouse = { x: 0, y: 0 }
    const targetMouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
        targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2
        targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      const time = performance.now() * 0.001
      
      // Smooth mouse follow
      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05
      
      camera.position.x = mouse.x
      camera.position.y = -mouse.y
      camera.lookAt(0, 0, 0)

      shapes.forEach((mesh, i) => {
          mesh.rotation.x += mesh.userData.rotationSpeed
          mesh.rotation.y += mesh.userData.rotationSpeed
          mesh.position.y += Math.sin(time + i) * mesh.userData.floatSpeed
      })

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

