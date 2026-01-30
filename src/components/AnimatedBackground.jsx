import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <>
      {/* Base layer */}
      <div className="fixed inset-0 z-[-10] bg-[#020617]" />
      
      {/* Animated grid */}
      <div 
        className="fixed inset-0 z-[-5]"
        style={{
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
        }}
      />
      
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 z-[-8] overflow-hidden">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-sky-500/20 blur-[120px]"
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '-10%', left: '-10%' }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]"
          animate={{
            x: [0, -80, -40, 0],
            y: [0, -60, -120, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '-10%', right: '-10%' }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px]"
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '40%', left: '30%' }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 z-[-6] overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -20, 20, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>


    </>
  );
}
