"use client"

import { useRef, useMemo, useCallback, useLayoutEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, MeshWobbleMaterial, Environment, Center } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
        color="#2dd4bf"
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
        color="#2dd4bf"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

// Refractive Crystal / Monolith that reacts to scroll
function RefractiveCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const innerMeshRef = useRef<THREE.Mesh>(null!)
  const scrollProgress = useRef(0)

  // Sync scroll with GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollProgress.current = self.progress
        },
      })
    })
    return () => ctx.revert()
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const progress = scrollProgress.current

    // Position and Rotation Keyframes based on scroll progress
    // Hero (0): Center
    // About (0.2): Slant left
    // Experience (0.4): Slant right
    // Projects (0.6): Deep Z (small)
    // Contact (0.9): Center, large, intense glow

    const targetPos = new THREE.Vector3()
    const targetRot = new THREE.Euler()
    let targetScale = 1

    if (progress < 0.2) {
      // Hero
      const localP = progress / 0.2
      targetPos.set(2, 0, -1)
      targetRot.set(t * 0.2, t * 0.3, 0)
      targetScale = 1.2
    } else if (progress < 0.4) {
      // About
      const localP = (progress - 0.2) / 0.2
      targetPos.set(-3, 0.5, -2)
      targetRot.set(t * 0.3, t * 0.1, Math.PI / 4)
      targetScale = 0.9
    } else if (progress < 0.7) {
      // Experience & Projects
      const localP = (progress - 0.4) / 0.3
      targetPos.set(3, -1, -3)
      targetRot.set(t * 0.4, t * 0.2, -Math.PI / 6)
      targetScale = 0.7
    } else {
      // Contact
      const localP = (progress - 0.7) / 0.3
      targetPos.set(0, 0, -1)
      targetRot.set(t * 0.5, t * 0.5, t * 0.2)
      targetScale = 1.5
    }

    // Mouse parallax effect
    const mx = state.pointer.x * 0.5
    const my = state.pointer.y * 0.5
    targetPos.x += mx
    targetPos.y += my

    // Lerp values for smoothness
    meshRef.current.position.lerp(targetPos, 0.05)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRot.x, 0.05)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRot.y, 0.05)
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRot.z, 0.05)
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05))

    // Inner core animation
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.5
      innerMeshRef.current.rotation.z = -t * 0.3
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={1.5}
            thickness={2}
            samples={8}
            transmission={1}
            clearcoat={1}
            clearcoatRoughness={0}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.5}
            ior={1.5}
            color="#2dd4bf"
            roughness={0}
            attenuationDistance={0.5}
            attenuationColor="#2dd4bf"
          />
        </mesh>

        <mesh ref={innerMeshRef} scale={0.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#2dd4bf" />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#2dd4bf" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#0d9488" />
        <spotLight position={[0, 5, 0]} intensity={0.6} angle={0.15} penumbra={1} />

        <Particles count={400} />
        <ConnectedLines count={50} />

        <RefractiveCrystal />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
