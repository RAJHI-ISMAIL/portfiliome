import { motion } from 'framer-motion'
import { ClipboardList } from 'lucide-react'
import { SERVICES } from '../../data/services'

export function ServicesPanel() {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <ClipboardList className="h-8 w-8 text-mist/70" />
      <h2 className="hero-heading text-3xl font-black uppercase tracking-tight">
        Services
      </h2>

      <div className="w-full max-w-3xl">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.number}
            className="flex flex-col gap-3 border-b border-mist/15 py-6 sm:flex-row sm:items-start sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            <span className="hero-heading text-[clamp(2.5rem,8vw,3.5rem)] font-black leading-none text-mist/90">
              {service.number}
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-base font-medium uppercase tracking-wide text-mist sm:text-lg">
                {service.name}
              </span>
              <p className="max-w-2xl font-light leading-relaxed text-mist/70"
                style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}