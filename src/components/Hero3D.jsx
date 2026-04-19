import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
    camera.position.z = 5

    // Wireframe Octahedron (Developer/Engineering Theme)
    const geometry = new THREE.OctahedronGeometry(2, 0)
    const material = new THREE.MeshPhongMaterial({
      color: 0x0066FF,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
    
    // Inner solid core
    const coreGeometry = new THREE.OctahedronGeometry(0.5, 0)
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x0066FF,
      emissive: 0x0066FF,
      emissiveIntensity: 2
    })
    
    const octahedron = new THREE.Mesh(geometry, material)
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    
    const group = new THREE.Group()
    group.add(octahedron)
    group.add(core)
    scene.add(group)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0x0066FF, 10)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const onMouseMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 1.5
      target.y = (e.clientY / window.innerHeight - 0.5) * 1.5
    }

    const onResize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const width = parent.clientWidth
      const height = parent.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
    onResize()

    const animate = () => {
      requestAnimationFrame(animate)
      
      mouse.x += (target.x - mouse.x) * 0.05
      mouse.y += (target.y - mouse.y) * 0.05

      group.rotation.y += 0.005
      group.rotation.x += 0.003
      
      group.position.x = mouse.x
      group.position.y = -mouse.y
      
      octahedron.rotation.z += 0.01

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', right: 0, top: 0, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
