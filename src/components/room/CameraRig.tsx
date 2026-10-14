import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStation } from '../hotspots/StationContext'
import { STATIONS, ROOM_OVERVIEW, type StationId } from '../../data/stations'

const FLY_DURATION = 1.1
const OVERVIEW_DURATION = 0.9

export function CameraRig() {
  const { camera } = useThree()
  const { activeStation } = useStation()

  const targetPos = useRef(new THREE.Vector3(0, 2.4, 7.5))
  const targetLook = useRef(new THREE.Vector3(0, 1.9, 0))
  const currentPos = useRef(new THREE.Vector3(0, 2.4, 7.5))
  const currentLook = useRef(new THREE.Vector3(0, 1.9, 0))
  const progress = useRef(1)
  const fromPos = useRef(new THREE.Vector3(0, 2.4, 7.5))
  const fromLook = useRef(new THREE.Vector3(0, 1.9, 0))
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const prevStation = useRef<StationId | null>(null)

  const getTarget = (id: StationId | null) => {
    if (id === null) return ROOM_OVERVIEW
    return STATIONS.find((s) => s.id === id) ?? ROOM_OVERVIEW
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (activeStation !== prevStation.current) {
      prevStation.current = activeStation
      fromPos.current.copy(currentPos.current)
      fromLook.current.copy(currentLook.current)
      const tgt = getTarget(activeStation)
      targetPos.current.set(...tgt.cameraPosition)
      targetLook.current.set(...tgt.lookAt)
      progress.current = 0
    }

    if (reducedMotion.current) {
      currentPos.current.lerp(targetPos.current, 1)
      currentLook.current.lerp(targetLook.current, 1)
    } else {
      const dur =
        activeStation === null ? OVERVIEW_DURATION : FLY_DURATION
      progress.current = Math.min(1, progress.current + delta / dur)
      const e = Math.min(1, progress.current * 2.2)
      const ease = 1 - Math.pow(1 - e, 3)
      currentPos.current.lerpVectors(
        fromPos.current,
        targetPos.current,
        ease,
      )
      currentLook.current.lerpVectors(
        fromLook.current,
        targetLook.current,
        ease,
      )
    }

    if (!reducedMotion.current) {
      const drift = activeStation === null ? 1 : 0
      currentPos.current.x += Math.sin(t * 0.12) * 0.4 * drift
      currentPos.current.y += Math.sin(t * 0.18) * 0.1 * drift
    }

    camera.position.copy(currentPos.current)
    camera.lookAt(currentLook.current)
  })

  return null
}