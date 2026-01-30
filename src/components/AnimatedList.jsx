import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

export function StaggeredList({ items, className = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    },
  };

  return (
    <motion.div
      className={`space-y-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ 
            x: 8, 
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            borderColor: 'rgba(56, 189, 248, 0.5)',
          }}
          className="bg-sky-400/5 border border-sky-400/10 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors"
        >
          <motion.div
            whileHover={{ rotate: 90, scale: 1.2 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0" />
          </motion.div>
          <span className="text-slate-300 text-sm">{item}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function AnimatedChecklist({ items, className = '' }) {
  return (
    <motion.ul
      className={`space-y-3 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
          }}
          className="flex items-start gap-3"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 + 0.3, type: "spring", stiffness: 500 }}
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          </motion.div>
          <span className="text-slate-300">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function CounterAnimation({ value, suffix = '', className = '' }) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {count}{suffix}
    </motion.span>
  );
}