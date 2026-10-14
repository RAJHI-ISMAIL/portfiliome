import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { StationId } from '../../data/stations'

interface StationContextValue {
  activeStation: StationId | null
  panelOpen: boolean
  selectStation: (id: StationId | null) => void
  closePanel: () => void
}

const StationContext = createContext<StationContextValue | null>(null)

export function StationProvider({ children }: { children: ReactNode }) {
  const [activeStation, setActiveStation] = useState<StationId | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)

  const selectStation = useCallback((id: StationId | null) => {
    if (id === null) {
      setActiveStation(null)
      setPanelOpen(false)
      return
    }
    setActiveStation(id)
    setPanelOpen(true)
  }, [])

  const closePanel = useCallback(() => {
    setPanelOpen(false)
  }, [])

  const value = useMemo(
    () => ({ activeStation, panelOpen, selectStation, closePanel }),
    [activeStation, panelOpen, selectStation, closePanel],
  )

  return (
    <StationContext.Provider value={value}>{children}</StationContext.Provider>
  )
}

export function useStation() {
  const ctx = useContext(StationContext)
  if (!ctx) {
    throw new Error('useStation must be used within StationProvider')
  }
  return ctx
}