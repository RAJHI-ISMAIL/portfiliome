import { motion } from 'framer-motion'
import { FolderOpen } from 'lucide-react'
import { PROJECTS } from '../../data/projects'
import { LiveProjectButton } from './LiveProjectButton'

export function ProjectsPanel() {
  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-3">
        <FolderOpen className="h-6 w-6 text-mist/70" />
        <h2 className="hero-heading text-3xl font-black uppercase tracking-tight">
          Projects
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            className="flex flex-col gap-6 rounded-3xl border border-mist/15 bg-room/40 p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-mist/50 text-xs font-medium uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="hero-heading text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  {project.title}
                </h3>
                <span className="text-mist/60 text-sm">
                  {project.client} ·{' '}
                  <span className="uppercase tracking-wider">
                    {project.tag}
                  </span>
                </span>
              </div>
              <LiveProjectButton />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
              <div className="flex flex-col gap-3 sm:col-span-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={project.images.leftTop}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={project.images.leftBottom}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:col-span-3">
                <img
                  src={project.images.right}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}