import React from 'react';
import { motion } from 'framer-motion';
const styles = `
  @keyframes dashScroll {
    to {
      stroke-dashoffset: -24;
    }
  }
  .dash-animate {
    animation: dashScroll 3s linear infinite;
  }
`;

export default function HypervisorDiagram() {
  return (
    <div className="p-6 md:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl">
      <style>{styles}</style>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Type 1 (Bare-Metal) */}
        <div className="text-center">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em] mb-6 block font-mono">
            Type 1: Native (Bare-Metal)
          </span>
          <svg className="mx-auto w-full max-w-[280px]" viewBox="0 0 320 320">
            <defs>
              <filter id="neon-blue" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Flow paths */}
            <path 
              d="M160,280 V160 M160,160 L60,50 M160,160 L160,50 M160,160 L260,50" 
              stroke="#38bdf8" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="6 6"
              className="dash-animate"
            />
            
            {/* Animated data packets */}
            <circle r="5" fill="#fff" filter="url(#neon-blue)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M160,280 V160" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#38bdf8" filter="url(#neon-blue)">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M160,160 L60,50" begin="0.5s" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle r="4" fill="#38bdf8" filter="url(#neon-blue)">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M160,160 L160,50" begin="0.8s" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="1.5s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle r="4" fill="#38bdf8" filter="url(#neon-blue)">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M160,160 L260,50" begin="1.1s" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="1.5s" repeatCount="indefinite" begin="1.1s" />
            </circle>

            {/* VM Nodes */}
            <rect x="20" y="10" width="80" height="40" rx="6" fill="rgba(15,23,42,0.9)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="60" y="34" fill="#38bdf8" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace">VM 1</text>
            
            <rect x="120" y="10" width="80" height="40" rx="6" fill="rgba(15,23,42,0.9)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="160" y="34" fill="#38bdf8" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace">VM 2</text>
            
            <rect x="220" y="10" width="80" height="40" rx="6" fill="rgba(15,23,42,0.9)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="260" y="34" fill="#38bdf8" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace">VM 3</text>

            {/* Hypervisor Layer */}
            <rect x="20" y="130" width="280" height="60" rx="10" fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
            <text x="160" y="155" fill="#fff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace">TYPE 1 HYPERVISOR</text>
            <text x="160" y="172" fill="#38bdf8" textAnchor="middle" fontSize="8" fontFamily="monospace">DIRECT HARDWARE ACCESS</text>

            {/* Hardware Layer */}
            <rect x="20" y="250" width="280" height="50" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <text x="160" y="280" fill="#64748b" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace">PHYSICAL HARDWARE</text>
          </svg>
          
          <p className="text-slate-400 text-xs mt-4 max-w-[280px] mx-auto">
            Data flows directly from hardware →  hypervisor → VMs – minimal latency(faster). 
          </p>
        </div>

        {/* Type 2 (Hosted) */}
        <div className="text-center">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-6 block font-mono">
            Type 2: Hosted Architecture
          </span>
          <svg className="mx-auto w-full max-w-[280px]" viewBox="0 0 320 320">
            <defs>
              <filter id="neon-purple" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Flow paths - showing the longer path through Host OS */}
            <path 
              d="M160,280 V35" 
              stroke="#c084fc" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="6 6"
              className="dash-animate"
            />
            
            {/* Animated data packets - smoother, slower path */}
            <circle r="5" fill="#fff" filter="url(#neon-purple)">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M160,280 V35" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="4.5s" repeatCount="indefinite" />
              <animate
                attributeName="fill"
                dur="4.5s"
                repeatCount="indefinite"
                values="#ffffff;#ffffff;#38bdf8;#38bdf8;#c084fc;#c084fc;#c084fc;#c084fc"
                keyTimes="0;0.12;0.31;0.55;0.67;0.90;0.95;1"
              />
            </circle>
            <circle r="4" fill="#c084fc" filter="url(#neon-purple)">
              <animateMotion dur="5.5s" repeatCount="indefinite" path="M160,280 V35" begin="1.8s" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="5.5s" repeatCount="indefinite" begin="1.8s" />
              <animate
                attributeName="fill"
                dur="5.5s"
                repeatCount="indefinite"
                begin="1.8s"
                values="#c084fc;#c084fc;#38bdf8;#38bdf8;#c084fc;#c084fc;#c084fc;#c084fc"
                keyTimes="0;0.12;0.31;0.55;0.67;0.90;0.95;1"
              />
            </circle>

            {/* Guest VM */}
            <rect x="60" y="10" width="200" height="35" rx="6" fill="rgba(15,23,42,0.9)" stroke="#c084fc" strokeWidth="1.5" />
            <text x="160" y="32" fill="#c084fc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace">GUEST VM</text>

            {/* Type 2 Hypervisor */}
            <rect x="40" y="60" width="240" height="55" rx="10" fill="rgba(192,132,252,0.1)" stroke="#c084fc" strokeWidth="2" />
            <text x="160" y="85" fill="#fff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace">TYPE 2 HYPERVISOR</text>
            <text x="160" y="102" fill="#c084fc" textAnchor="middle" fontSize="8" fontFamily="monospace">VirtualBox / VMware Workstation</text>

            {/* Host OS */}
            <rect x="40" y="145" width="240" height="60" rx="10" fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="170" fill="#fff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace">HOST OS</text>
            <text x="160" y="186" fill="#38bdf8" textAnchor="middle" fontSize="8" fontFamily="monospace">WINDOWS / LINUX / MACOS</text>

            {/* Hardware Layer */}
            <rect x="40" y="250" width="240" height="50" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <text x="160" y="278" fill="#64748b" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace">PHYSICAL HARDWARE</text>
          </svg>
          
          <p className="text-slate-400 text-xs mt-4 max-w-[280px] mx-auto">
            It has more steps (hardware → host OS → hypervisor → VMs) so it’s slower but it’s easier to install and set up.
          </p>
        </div>

      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          <span className="text-slate-400">Data packet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-sky-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #38bdf8 0, #38bdf8 6px, transparent 6px, transparent 12px)' }} />
          <span className="text-slate-400">Data flow path</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded border border-sky-400 bg-sky-400/10" />
          <span className="text-slate-400">Virtualisation layer</span>
        </div>
      </div>
    </div>
  );
}
