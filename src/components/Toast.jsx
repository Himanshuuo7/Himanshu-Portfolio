import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi'
import { useEffect } from 'react'

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25,
            opacity: { duration: 0.4 },
            filter: { duration: 0.4 }
          }}
          className="fixed bottom-8 right-1/2 translate-x-1/2 lg:right-10 lg:translate-x-0 z-[10002] flex items-center gap-4 px-6 py-4 bg-[#0B0B0B]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl min-w-[320px] max-w-[90vw]"
        >
          {/* Accent Line */}
          <div className={`absolute top-0 left-0 w-full h-[2px] rounded-t-2xl ${type === 'success' ? 'bg-blue-500' : 'bg-rose-500'}`} />

          <div className="flex-shrink-0">
            {type === 'success' ? (
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <FiCheckCircle size={22} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                <FiAlertCircle size={22} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="text-white text-sm font-medium leading-tight">
              {message}
            </p>
            <p className="text-white/40 text-[0.65rem] uppercase tracking-widest mt-1 font-mono">
              {type === 'success' ? 'Confirmation' : 'System Alert'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <FiX size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
