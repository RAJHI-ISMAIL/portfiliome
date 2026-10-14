import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { CameraRig } from './CameraRig'
import { Hotspots } from '../hotspots/Hotspots'
import { Suspense } from 'react'
import * as THREE from 'three'

useGLTF.preload('/models/room.glb')

export default function RoomScene() {
  const { scene } = useGLTF('/models/room.glb')

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 55, position: [8, -10, 11], near: 0.1, far: 60 }}
      gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 1.0 }}
      className="absolute inset-0"
    >
      <fog attach="fog" args={['#0C0C0C', 12, 30]} />
      <Suspense fallback={null}>
        <primitive object={scene} />
      </Suspense>
      <CameraRig />
      <Hotspots />
    </Canvas>
  )
}