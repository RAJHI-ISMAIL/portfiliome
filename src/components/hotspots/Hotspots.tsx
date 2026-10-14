import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStation } from './StationContext'
import { STATIONS, type StationId } from '../../data/stations'

const HOVER_DISTANCE = 2.2

export function Hotspots() {
  const { activeStation, selectStation } = useStation()
  const ringRefs = useRef<Record<string, THREE.Mesh | null>>({})

  const [hovered, setHovered] = useState<string | null>(null)

  useFrame((_state, delta) => {
    const targetScale = hovered ? 1.35 : 1
    for (const id of Object.keys(ringRefs.current)) {
      const mesh = ringRefs.current[id]
      if (!mesh) continue
      const current = mesh.scale.x
      const next = THREE.MathUtils.lerp(current, targetScale, Math.min(1, delta * 12))
      mesh.scale.setScalar(next)
      const mat = mesh.material as THREE.MeshStandardMaterial
      const targetEmissive = hovered === id ? 0.55 : 0.05
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        targetEmissive,
        Math.min(1, delta * 8),
      )
    }
  })

  return (
    <group>
      {STATIONS.map((s) => (
        <HotspotRing
          key={s.id}
          id={s.id}
          position={s.position}
          isActive={activeStation === s.id}
          isHovered={hovered === s.id}
          onHover={setHovered}
          onClick={selectStation}
          ringRef={(m) => {
            ringRefs.current[s.id] = m
          }}
        />
      ))}
    </group>
  )
}

interface HotspotRingProps {
  id: StationId
  position: [number, number, number]
  isActive: boolean
  isHovered: boolean
  onHover: (id: string | null) => void
  onClick: (id: StationId | null) => void
  ringRef: (m: THREE.Mesh | null) => void
}

function HotspotRing({
  id,
  position,
  isActive,
  isHovered,
  onHover,
  onClick,
  ringRef,
}: HotspotRingProps) {
  return (
    <group position={position}>
      <mesh
        ref={ringRef}
        onPointerOver={() => onHover(id)}
        onPointerOut={() => onHover(null)}
        onClick={() => onClick(id)}
      >
        <ringGeometry args={[0.6, 0.68, 0.6, 0.68, 0.5, 0.62]} />
        <meshStandardMaterial
          color="#D7E2EA"
          emissive="#D7E2EA"
          emissiveIntensity={isActive ? 0.55 : 0.05}
          transparent
          opacity={isActive ? 0.95 : isHovered ? 0.85 : 0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <pointLight
        position={[0, 0.35, 0]}
        intensity={isActive ? 1.4 : isHovered ? 0.9 : 0.35}
        color="#D7E2EA"
        distance={HOVER_DISTANCE}
      />
    </group>
  )
}