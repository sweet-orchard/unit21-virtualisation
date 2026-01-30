import React from 'react';
import { motion } from 'framer-motion';

export function ConnectionLine({ className = '' }) {
  return (
    <svg className={`absolute ${className}`} width="100" height="50" viewBox="0 0 100 50">
      <motion.path
        d="M0 25 Q50 0, 100 25"
        stroke="rgba(56, 189, 248, 0.3)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.circle
        cx="0"
        cy="25"
        r="4"
        fill="#38bdf8"
        animate={{ cx: [0, 100, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

export function DataFlowAnimation({ className = '' }) {
  return (
    <div className={`relative h-2 bg-slate-800 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
        animate={{ x: ['-80px', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function NetworkNode({ label, icon: Icon, active = false, className = '' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={`w-16 h-16 rounded-xl flex items-center justify-center ${
          active ? 'bg-sky-400/20 border-sky-400' : 'bg-slate-800/50 border-slate-700'
        } border-2`}
        animate={active ? {
          boxShadow: [
            '0 0 0 0 rgba(56, 189, 248, 0)',
            '0 0 0 10px rgba(56, 189, 248, 0.1)',
            '0 0 0 0 rgba(56, 189, 248, 0)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className={`w-8 h-8 ${active ? 'text-sky-400' : 'text-slate-500'}`} />
      </motion.div>
      <p className="text-center text-xs text-slate-400 mt-2">{label}</p>
    </motion.div>
  );
}

export function AnimatedArrow({ direction = 'right', className = '' }) {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };

  return (
    <motion.div 
      className={`flex items-center justify-center ${className}`}
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <svg width="40" height="20" viewBox="0 0 40 20">
        <motion.path
          d="M0 10 L30 10 M25 5 L30 10 L25 15"
          stroke="rgba(56, 189, 248, 0.5)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <motion.circle
          cx="0"
          cy="10"
          r="3"
          fill="#38bdf8"
          animate={{ cx: [0, 30, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
}

export function PulseRing({ className = '', color = 'sky' }) {
  return null;
}