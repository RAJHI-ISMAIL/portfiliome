import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface EnterScreenProps {
  onEnter: () => void
}

const ctaStyle: React.CSSProperties = {
  background:
    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow:
    '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid rgba(255, 255, 255, 0.9)',
  outlineOffset: '-3px',
}

export function EnterScreen({ onEnter }: EnterScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-room px-6"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <motion.div
        className="flex flex-col items-center gap-5 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-mist/70 text-xs font-medium uppercase tracking-[0.35em]">
          Welcome to my studio
        </p>
        <h1 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3.5rem,12vw,9rem)]">
          Ismail
        </h1>
        <p className="text-mist font-light uppercase tracking-wide text-sm sm:text-base">
          3D Creator &middot; Master&apos;s student in Computer Science
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={onEnter}
        className="group flex items-center gap-3 rounded-full px-10 py-4 text-sm font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.04] active:scale-95"
        style={ctaStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Enter the room
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </motion.button>

      <motion.p
        className="text-mist/40 text-xs font-light uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Drag to look around
      </motion.p>
    </motion.div>
  )
}