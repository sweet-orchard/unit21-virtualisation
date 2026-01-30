import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedTitle({ children, className = '', delay = 0 }) {
  const words = children.split(' ');
  
  return (
    <motion.h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: delay + i * 0.03,
            ease: "easeOut"
          }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function AnimatedParagraph({ children, className = '', delay = 0 }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function TypewriterText({ text, className = '', speed = 30 }) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [started, setStarted] = React.useState(false);
  
  React.useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, started]);
  
  return (
    <motion.span 
      className={className}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-sky-400"
      >
        |
      </motion.span>
    </motion.span>
  );
}

export function GlitchText({ children, className = '' }) {
  return (
    <motion.span 
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <motion.span
        className="absolute inset-0 text-red-500/50"
        variants={{
          hover: {
            x: [-2, 2, -2, 0],
            transition: { duration: 0.3, repeat: Infinity }
          }
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-cyan-500/50"
        variants={{
          hover: {
            x: [2, -2, 2, 0],
            transition: { duration: 0.3, repeat: Infinity }
          }
        }}
      >
        {children}
      </motion.span>
      <span className="relative">{children}</span>
    </motion.span>
  );
}