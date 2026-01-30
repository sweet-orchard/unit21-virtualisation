import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Monitor, Server, Cpu, HardDrive } from 'lucide-react';

export default function DiagramPlaceholder({ title, description, type = 'default' }) {
  const icons = {
    hypervisor: [Server, Monitor, Cpu],
    memory: [HardDrive, Cpu, Server],
    default: [ImageIcon],
  };
  
  const IconSet = icons[type] || icons.default;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative bg-slate-800/50 border-2 border-dashed border-sky-400/30 rounded-xl p-8 text-center overflow-hidden"
    >
      {/* Animated corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-sky-400/50"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-sky-400/50"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.06 }}
      />
      
      {/* Scanning line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Icon animation */}
      <div className="flex justify-center gap-4 mb-4">
        {IconSet.map((Icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -5, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.03,
            }}
          >
            <Icon className="w-10 h-10 text-sky-400/50" />
          </motion.div>
        ))}
      </div>
      
      <motion.p 
        className="text-sky-400 font-semibold mb-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {title}
      </motion.p>
      <p className="text-slate-500 text-sm">{description}</p>
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
    </motion.div>
  );
}