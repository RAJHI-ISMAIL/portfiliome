import { Suspense, lazy, useEffect, useState } from 'react'
import { MonitorOff } from 'lucide-react'
import { StationProvider } from './components/hotspots/StationContext'
import { useStation } from './components/hotspots/StationContext'
import { useWebGL } from './hooks/useWebGL'
import { EnterScreen } from './components/hud/EnterScreen'
import { PanelShell } from './components/panels/PanelShell'

const RoomScene = lazy(() => import('./components/room/RoomScene'))

function EscapeHandler() {
  const { closePanel } = useStation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closePanel])

  return null
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const webglSupported = useWebGL()

  if (!webglSupported) {
    return (
      <div className="main-wrapper flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <MonitorOff className="h-10 w-10 text-mist" />
        <h1 className="hero-heading text-4xl font-black uppercase tracking-tight">
          Ismail &mdash; 3D Creator
        </h1>
        <p className="max-w-md font-light leading-relaxed text-mist/80">
          Your browser does not support WebGL, so the 3D studio room cannot be
          rendered on this device.
        </p>
      </div>
    )
  }

  return (
    <StationProvider>
      <EscapeHandler />
      <div className="main-wrapper relative h-screen w-full overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-room" />}>
          <RoomScene />
        </Suspense>
        {!entered && <EnterScreen onEnter={() => setEntered(true)} />}
        <PanelShell />
      </div>
    </StationProvider>
  )
}