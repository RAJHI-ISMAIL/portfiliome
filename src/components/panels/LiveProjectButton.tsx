import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface LiveProjectButtonProps {
  href?: string
}

export function LiveProjectButton({ href = '#' }: LiveProjectButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-full border-2 border-mist/80 px-8 py-3 text-sm font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      Live Project
      <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </motion.a>
  )
}