import React from 'react';
import { motion } from 'framer-motion';

export function PulsingIcon({ icon: Icon, className = '', color = 'sky' }) {
  const colors = {
    sky: 'bg-sky-400/20 text-sky-400',
    purple: 'bg-purple-400/20 text-purple-400',
    amber: 'bg-amber-400/20 text-amber-400',
    green: 'bg-green-400/20 text-green-400',
    red: 'bg-red-400/20 text-red-400',
  };
  
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className={`absolute inset-0 rounded-xl ${colors[color].split(' ')[0]} blur-xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className={`relative p-3 rounded-xl ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </motion.div>
  );
}

export function FloatingIcon({ icon: Icon, className = '' }) {
  return (
    <div className={className}>
      <Icon className="w-full h-full" />
    </div>
  );
}

export function RotatingIcon({ icon: Icon, className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );
}

export function OrbitingDots({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-sky-400 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.02,
            ease: "linear"
          }}
          style={{
            transformOrigin: '20px 20px',
          }}
        />
      ))}
    </div>
  );
}