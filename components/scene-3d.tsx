"use client"

import { useRef, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Trail } from "@react-three/drei"
import * as THREE from "three"

// Mouse-reactive particle field
function Particles({ count = 600 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const [positions, velocities, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 3
      const y = (Math.random() - 0.5) * viewport.height * 3
      const z = (Math.random() - 0.5) * 8 - 2
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
      velocities[i * 3] = 0
      velocities[i * 3 + 1] = 0
      velocities[i * 3 + 2] = 0
    }
    return [positions, velocities, originalPositions]
  }, [count, viewport.width, viewport.height])

  // Track mouse in 3D space
  useFrame((state) => {
    if (!mesh.current) return

    const mx = state.pointer.x * viewport.width * 0.5
    const my = state.pointer.y * viewport.height * 0.5
    mouseRef.current = { x: mx, y: my }

    const posAttr = mesh.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      // Distance to mouse
      const dx = arr[ix] - mx
      const dy = arr[iy] - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Repulsion from mouse
      if (dist < 2.5) {
        const force = (2.5 - dist) * 0.015
        velocities[ix] += (dx / dist) * force
        velocities[iy] += (dy / dist) * force
      }

      // Return to original position
      velocities[ix] += (originalPositions[ix] - arr[ix]) * 0.008
      velocities[iy] += (originalPositions[iy] - arr[iy]) * 0.008
      velocities[iz] += (originalPositions[iz] - arr[iz]) * 0.005

      // Damping
      velocities[ix] *= 0.96
      velocities[iy] *= 0.96
      velocities[iz] *= 0.96

      arr[ix] += velocities[ix]
      arr[iy] += velocities[iy]
      arr[iz] += velocities[iz]
    }

    posAttr.needsUpdate = true
    mesh.current.rotation.z = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#4F8EF7"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Connected mesh lines between nearby particles  
function ConnectedLines({ count = 100 }: { count?: number }) {
  const linesRef = useRef<THREE.LineSegments>(null!)
  const { viewport } = useThree()

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * viewport.width * 2,
          (Math.random() - 0.5) * viewport.height * 2,
          (Math.random() - 0.5) * 4 - 1
        )
      )
    }
    return pts
  }, [count, viewport.width, viewport.height])

  useFrame((state) => {
    if (!linesRef.current) return
    const positions: number[] = []
    const t = state.clock.elapsedTime

    for (let i = 0; i < points.length; i++) {
      points[i].x += Math.sin(t * 0.3 + i) * 0.001
      points[i].y += Math.cos(t * 0.2 + i * 0.5) * 0.001

      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j])
        if (dist < 1.5) {
          positions.push(points[i].x, points[i].y, points[i].z)
          positions.push(points[j].x, points[j].y, points[j].z)
        }
      }
    }

    const geo = linesRef.current.geometry
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    geo.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color="#4F8EF7"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

// Interactive icosahedron that follows mouse slowly
function InteractiveIcosahedron() {
  const ref = useRef<THREE.Mesh>(null!)
  const target = useRef({ x: -3, y: 1.5 })

  useFrame((state) => {
    if (!ref.current) return
    target.current.x = -3 + state.pointer.x * 0.5
    target.current.y = 1.5 + state.pointer.y * 0.3
    ref.current.position.x += (target.current.x - ref.current.position.x) * 0.02
    ref.current.position.y += (target.current.y - ref.current.position.y) * 0.02
    ref.current.rotation.x = state.clock.elapsedTime * 0.3
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Trail width={1} length={4} color="#4F8EF7" attenuation={(t) => t * t}>
        <mesh ref={ref} position={[-3, 1.5, -2]} scale={0.9}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#4F8EF7"
            transparent
            opacity={0.12}
            wireframe
            distort={0.4}
            speed={3}
          />
        </mesh>
      </Trail>
    </Float>
  )
}

// Pulsing torus that scales on mouse proximity
function PulsingTorus() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.2
    ref.current.rotation.z = t * 0.15
    // Pulse scale
    const pulse = 1 + Math.sin(t * 2) * 0.08
    ref.current.scale.setScalar(0.7 * pulse)
  })

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={ref} position={[3.5, -1, -3]} scale={0.7}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <MeshWobbleMaterial
          color="#1A3C6E"
          transparent
          opacity={0.18}
          wireframe
          factor={0.5}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

// Spinning octahedron with glow
function SpinningOctahedron() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.4
    ref.current.rotation.z = state.clock.elapsedTime * 0.15
    ref.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
  })

  return (
    <mesh ref={ref} position={[2, 2.5, -4]} scale={0.55}>
      <octahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial
        color="#4F8EF7"
        transparent
        opacity={0.15}
        wireframe
        distort={0.25}
        speed={4}
      />
    </mesh>
  )
}

// Large background ring
function BackgroundRing() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.05
    ref.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <mesh ref={ref} position={[0, 0, -6]} scale={3}>
      <torusGeometry args={[1.5, 0.02, 16, 100]} />
      <meshBasicMaterial color="#4F8EF7" transparent opacity={0.08} />
    </mesh>
  )
}

function DodecahedronFloat() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.15
    ref.current.rotation.y = state.clock.elapsedTime * 0.35
    ref.current.position.x = -2.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={ref} position={[-2.5, -2, -2.5]} scale={0.55}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial
          color="#3366CC"
          transparent
          opacity={0.1}
          wireframe
          factor={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4F8EF7" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#1A3C6E" />
        <pointLight position={[0, 5, 5]} intensity={0.2} color="#ffffff" />
        <Particles count={500} />
        <ConnectedLines count={80} />
        <InteractiveIcosahedron />
        <PulsingTorus />
        <SpinningOctahedron />
        <BackgroundRing />
        <DodecahedronFloat />
      </Canvas>
    </div>
  )
}
