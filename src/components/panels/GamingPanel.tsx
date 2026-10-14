import { motion } from 'framer-motion'
import { Gamepad2, MonitorPlay } from 'lucide-react'
import { GAMES } from '../../data/gaming'

export function GamingPanel() {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Gamepad2 className="h-8 w-8 text-mist/70" />
      <h2 className="hero-heading text-3xl font-black uppercase tracking-tight">
        Gaming
      </h2>
      <p className="max-w-md font-light leading-relaxed text-mist/70">
        Gaming is also part of my life — here is what I play on the PlayStation.
      </p>

      <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
        {GAMES.map((game, i) => (
          <motion.div
            key={game.title}
            className="flex items-center justify-between gap-3 rounded-2xl border border-mist/15 bg-room/40 px-5 py-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
          >
            <span className="font-medium text-mist">{game.title}</span>
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-mist/50">
              <MonitorPlay className="h-3.5 w-3.5" />
              {game.platform}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}