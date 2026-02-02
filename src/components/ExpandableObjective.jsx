import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';

const objectiveDetails = {
  'Explain characteristics of different types of virtualisation (P1)': [
    'Hypervisors: Type 1 (bare metal) and Type 2 (hosted)',
    'Hardware virtualisation: full, para, and partial virtualisation',
    'Emulation vs hardware-assisted virtualisation',
    'Snapshots and teleportation (live migration)',
    'Local desktop virtualisation (client-based)',
    'Remote desktop: fat, thin, and zero clients',
    'Virtual Desktop Infrastructure (VDI)',
    'Memory virtualisation techniques'
  ],
  'Explain how virtualised solutions meet computing requirements (P2)': [
    "GamesTek's Computing Requirements",
    'Type 2 Hypervisor',
    'Virtual Desktop Infrastructure (VDI) and Thin Client',
    'Full Virtualisation',
    'Hardware Assistance',
    'Emulation of Android',
    'Snapshots',
    'Teleportation'
  ],
  'Analyse the impact of implementing virtualised solutions (M1)': [
    'Technical impact',
    'Organisation impact',
    'Impact on Testers (Users)'
  ],
  'Evaluate the impact of virtualised solutions on an organisation (D1)': [
    'Business Infrastructure and Service Delivery Model',
    'Legal, Ethical, and Licensing Considerations',
    'Requirements That Cannot or Should Not Be Met Using Virtualisation',
    'Final Judgement'
  ]
};

export default function ExpandableObjective({ text }) {
  const [expanded, setExpanded] = useState(false);
  const details = objectiveDetails[text] || [];

  return (
    <motion.div
      className="bg-sky-400/5 border border-sky-400/10 rounded-xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}
    >
      <div 
        className="p-4 flex items-center gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0" />
        </motion.div>
        <span className="text-slate-300 text-sm">{text}</span>
      </div>
      
      <AnimatePresence>
        {expanded && details.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-12 space-y-2">
              {details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex items-center gap-2 text-slate-400 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
                  {detail}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
