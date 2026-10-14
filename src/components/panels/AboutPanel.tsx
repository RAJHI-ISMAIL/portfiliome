import { motion } from 'framer-motion'
import { User, Code2 } from 'lucide-react'
import { ABOUT_TEXT, SKILLS } from '../../data/about'

export function AboutPanel() {
  const chars = ABOUT_TEXT.split('')

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-3">
        <User className="h-6 w-6 text-mist/70" />
        <h2 className="hero-heading text-3xl font-black uppercase tracking-tight">
          About Me
        </h2>
      </div>

      <p className="max-w-[560px] text-center font-medium leading-relaxed text-mist sm:text-left"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.02, 1.2),
              ease: 'easeOut',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </p>

      <div className="flex flex-col items-center gap-4 sm:items-start">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-mist/70" />
          <span className="text-mist/70 text-xs font-medium uppercase tracking-widest">
            Skills
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          {SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              className="rounded-full border border-mist/25 bg-room/50 px-4 py-1.5 text-sm font-medium text-mist"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.4 + i * 0.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}