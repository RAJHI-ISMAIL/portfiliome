import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import { Phone, Mail, Github, Linkedin, Instagram, Link } from 'lucide-react'
import { CONTACT_LINKS } from '../../data/contact'

const ICON_MAP: Record<string, ComponentType> = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
}

export function ContactPanel() {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Phone className="h-8 w-8 text-mist/70" />
      <h2 className="hero-heading text-3xl font-black uppercase tracking-tight">
        Contact
      </h2>
      <p className="max-w-md font-light leading-relaxed text-mist/70">
        Say hello or reach out for collaborations and commissions.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {CONTACT_LINKS.map((link, i) => {
          const Icon = ICON_MAP[link.icon] ?? Link
          return (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-mist/25 bg-room/50 px-5 py-2.5 text-sm font-medium text-mist transition-colors duration-200 hover:border-mist/50 hover:bg-mist/10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}