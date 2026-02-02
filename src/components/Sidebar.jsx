import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Layers, 
  BarChart3, 
  CheckCircle,
} from 'lucide-react';

export default function Sidebar({ activeSection, expanded, setExpanded, setActiveSection }) {
  const navItems = [
    { id: 'overview', label: 'Project Overview', icon: Home },
    { id: 'p1', label: 'P1: Explanation', icon: BookOpen },
    { id: 'p2', label: 'P2: Solution', icon: Layers },
    { id: 'm1', label: 'M1: Analysis', icon: BarChart3 },
    { id: 'd1', label: 'D1: Evaluation', icon: CheckCircle },
  ];

  return (
    <motion.aside 
      className="fixed h-screen top-0 left-0 flex flex-col items-center py-10 shadow-2xl z-50"
      initial={{ x: -100 }}
      animate={{ 
        x: 0,
        width: expanded ? 256 : 80 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        background: 'rgba(15, 23, 42, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Brand */}
      <div className="mb-14 flex flex-col items-center">
        <div className="w-12 h-12 border-2 border-sky-400 flex items-center justify-center font-black text-2xl text-sky-400 rounded-lg">
          G
        </div>
        <div className="mt-3 h-10 flex items-center">
          <motion.div
            className="flex flex-col items-center"
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : -6 }}
            transition={{ duration: 0.2 }}
            aria-hidden={!expanded}
          >
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">GamesTek Bristol</span>
            <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest mt-1 italic">UNIT 21 A1</span>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full space-y-2 flex-grow">
        {navItems.map((item, index) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            className={`w-full flex items-center ${expanded ? 'px-6 justify-start' : 'pl-5 pr-0 justify-start'} py-4 transition-all duration-200 border-l-4 relative overflow-hidden ${
              activeSection === item.id 
                ? 'border-sky-400 text-sky-400' 
                : 'border-transparent text-slate-400 hover:text-sky-400'
            }`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ 
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              borderLeftColor: 'rgba(56, 189, 248, 0.5)',
            }}
          >
            {/* Active indicator glow */}
            {activeSection === item.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-transparent pointer-events-none"
                layoutId="activeNav"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <div className="flex-shrink-0 relative z-10">
              <item.icon className="w-6 h-6" />
            </div>
            
            <AnimatePresence>
              {expanded && (
                <motion.span 
                  className="ml-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap relative z-10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        ))}
      </nav>

      {/* Footer */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            className="mt-auto pt-6 border-t border-white/10 w-full px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-[9px] text-slate-500 uppercase tracking-widest text-center">Vira Saienko</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
