import { motion } from 'framer-motion'
import { useStation } from './StationContext'
import { STATIONS } from '../../data/stations'

export function HotspotTooltip() {
  const { activeStation } = useStation()
  const station = STATIONS.find((s) => s.id === activeStation)

  if (!station) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 top-6 z-40 -translate-x-1/2 rounded-full border border-mist/20 bg-room/70 px-4 py-2 backdrop-blur-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <span className="text-mist text-xs font-medium uppercase tracking-widest">
        {station.label}
      </span>
    </motion.div>
  )
}