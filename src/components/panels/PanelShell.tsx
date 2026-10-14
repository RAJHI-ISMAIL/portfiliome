import { motion, AnimatePresence } from 'framer-motion'
import { useStation } from '../hotspots/StationContext'
import { BackButton } from '../hud/BackButton'
import { ProjectsPanel } from './ProjectsPanel'
import { AboutPanel } from './AboutPanel'
import { ContactPanel } from './ContactPanel'
import { GamingPanel } from './GamingPanel'
import { ServicesPanel } from './ServicesPanel'

export function PanelShell() {
  const { panelOpen, activeStation } = useStation()

  const renderContent = () => {
    switch (activeStation) {
      case 'laptop':
        return <ProjectsPanel />
      case 'poster':
        return <AboutPanel />
      case 'phone':
        return <ContactPanel />
      case 'playstation':
        return <GamingPanel />
      case 'whiteboard':
        return <ServicesPanel />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {panelOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-room/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[40px] border border-mist/20 bg-room/90 p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl shadow-black/50"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center justify-between">
              <BackButton />
            </div>
            <div className="mt-6 flex-1 overflow-y-auto">
              {renderContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}