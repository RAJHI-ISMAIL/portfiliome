import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useStation } from '../hotspots/StationContext'

export function BackButton() {
  const { closePanel } = useStation()

  return (
    <motion.button
      type="button"
      onClick={closePanel}
      className="group flex items-center gap-2 rounded-full border border-mist/25 bg-room/60 px-5 py-2.5 backdrop-blur-md transition-colors duration-200 hover:border-mist/50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      aria-label="Back to the room"
    >
      <ArrowLeft className="h-4 w-4 text-mist transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span className="text-mist text-xs font-medium uppercase tracking-widest">
        Back
      </span>
    </motion.button>
  )
}