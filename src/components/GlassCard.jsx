import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', delay = 0, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { 
        scale: 1.01,
        boxShadow: "0 0 40px rgba(56, 189, 248, 0.1)",
      } : {}}
      className={`relative rounded-2xl overflow-hidden magic-card ${className}`}
      style={{
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), transparent, rgba(129, 140, 248, 0.2))',
        }}
      />
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '100%', opacity: 0.1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'linear-gradient(90deg, transparent, white, transparent)',
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
