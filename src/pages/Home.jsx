import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server,
  Monitor,
  Cpu,
  HardDrive,
  Users,
  Building2,
  Target,
  FileText,
  ChevronRight,
  CheckCircle,
  Zap,
  Globe,
  Shield,
  Clock,
  TrendingUp,
  Database,
  Network,
  Layers,
  Box,
  Cloud,
  Laptop,
  ScreenShare
} from 'lucide-react';

import AnimatedBackground from '../components/AnimatedBackground';
import Sidebar from '../components/Sidebar';
import GlassCard from '../components/GlassCard';
import HypervisorDiagram from '../components/HypervisorDiagram';
import { AnimatedTitle, AnimatedParagraph, TypewriterText, GlitchText } from '../components/AnimatedText';
import { PulsingIcon, FloatingIcon } from '../components/AnimatedIcon';
import { StaggeredList, AnimatedChecklist, CounterAnimation } from '../components/AnimatedList';
import { DataFlowAnimation, NetworkNode, AnimatedArrow } from '../components/FlowDiagram';
import ExpandableObjective from '../components/ExpandableObjective';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [termMsg, setTermMsg] = useState('');
  const [typedMsg, setTypedMsg] = useState('');

  const getTermMsg = () => {
    if (window.innerWidth < 1024) return "V_SAIENKO::SYS_STABLE_V4.1_FINAL";
    return "VIRA_SAIENKO::713784:STUDENT:LOADING_WEBPAGE_SUCCESS... VER_1";
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'introduction', 'task1', 'task2', 'conclusion'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setTermMsg(getTermMsg());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let i = 0;
    setTypedMsg('');
    const id = setInterval(() => {
      i += 1;
      setTypedMsg(termMsg.slice(0, i));
      if (i >= termMsg.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [termMsg]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.magic-card'));
    const handlers = new Map();

    const attach = (card) => {
      if (handlers.has(card)) return;
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * -4;
        const ry = (x - 0.5) * 4;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
        card.style.setProperty('--rx', `${rx}deg`);
        card.style.setProperty('--ry', `${ry}deg`);
      };
      const onEnter = () => card.classList.add('magic-active');
      const onLeave = () => {
        card.classList.remove('magic-active');
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
      };
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointerleave', onLeave);
      handlers.set(card, { onMove, onEnter, onLeave });
    };

    const detach = (card) => {
      const h = handlers.get(card);
      if (!h) return;
      card.removeEventListener('pointermove', h.onMove);
      card.removeEventListener('pointerenter', h.onEnter);
      card.removeEventListener('pointerleave', h.onLeave);
      card.classList.remove('magic-active');
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
      handlers.delete(card);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) attach(entry.target);
          else detach(entry.target);
        });
      },
      { root: null, threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      cards.forEach(detach);
    };
  }, []);

  return (
    <div className="flex min-h-screen text-slate-100">
      <AnimatedBackground />
      <Sidebar 
        activeSection={activeSection} 
        expanded={sidebarExpanded} 
        setExpanded={setSidebarExpanded}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main className="ml-20 flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* OVERVIEW SECTION */}
          <section id="overview" className="scroll-mt-8 space-y-4">
            <motion.div
              className="w-full bg-slate-950/70 border border-slate-800/80 rounded-xl px-7 py-4 flex items-center gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/70"></div>
              </div>
              <span className="font-mono text-[12px] text-emerald-400 uppercase font-bold tracking-tighter">
                {typedMsg}
                <span className="inline-block w-2.5 h-4 ml-1.5 bg-emerald-400/70 align-middle animate-pulse" />
              </span>
            </motion.div>

            <GlassCard className="p-8 lg:p-10 magic-card">
              {/* Animated scan line */}
              {/* <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              /> */}
              
              <div className="relative z-10">
                <AnimatedTitle 
                  className="text-4xl lg:text-5xl font-black text-white mb-4"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  VIRTUALISATION
                </AnimatedTitle>
                
                <AnimatedParagraph className="text-slate-400 text-lg mb-8 max-w-3xl" delay={0.3}>
                  A comprehensive report examining virtualisation technologies and their implementation for GamesTek's new contract with Top-game-shack.
                </AnimatedParagraph>

                {/* Animated Stats Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <motion.div 
                    className="bg-sky-400/5 border border-sky-400/10 rounded-xl magic-card p-4 flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 }}
                    whileHover={{ 
                      scale: 1.02, 
                      borderColor: 'rgba(56, 189, 248, 0.5)',
                      boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)'
                    }}
                  >
                    <PulsingIcon icon={FileText} color="sky" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Assignment</p>
                      <p className="text-white font-semibold">Unit 21 Assignment 1</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-amber-400/5 border border-amber-400/10 rounded-xl magic-card p-4 flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 }}
                    whileHover={{ 
                      scale: 1.02, 
                      borderColor: 'rgba(251, 191, 36, 0.5)',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.1)'
                    }}
                  >
                    <PulsingIcon icon={Target} color="amber" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Made by</p>
                      <p className="text-white font-semibold">Vira Saienko</p>
                    </div>
                  </motion.div>
                </div>

                {/* Animated Objectives */}
                <motion.p 
                  className="text-[10px] text-slate-500 uppercase tracking-widest mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.045 }}
                >
                  Report Objectives (click to expand)
                </motion.p>
                
                <div className="space-y-3">
                  {[
                    'Explain characteristics of different types of virtualisation (P1)',
                    'Explain how virtualised solutions meet computing requirements (P2)',
                    'Analyse the impact of implementing virtualised solutions (M1)',
                    'Evaluate the impact of virtualised solutions on an organisation (D1)'
                  ].map((obj, i) => (
                    <ExpandableObjective key={i} text={obj} />
                  ))}
                </div>
              </div>
            </GlassCard>
          </section>

          {/* INTRODUCTION SECTION */}
          <section id="introduction" className="scroll-mt-8">
            <GlassCard className="p-8 lg:p-10 magic-card" delay={0.1}>
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center gap-3 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="font-mono text-[10px] text-sky-400 tracking-widest">002</span>
                  <motion.span 
                    className="h-px bg-sky-400/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06, duration: 0.5 }}
                  />
                </motion.div>
                
                <AnimatedTitle className="text-3xl lg:text-4xl font-black text-white mb-6">
                  Introduction
                </AnimatedTitle>

                <div className="prose prose-invert max-w-none space-y-6">
                  <AnimatedParagraph className="text-slate-300 text-base leading-relaxed" delay={0.1}>
                    GamesTek is a thriving game testing company based in Bristol, employing 12 computer games testers who evaluate game performance across multiple platforms. The company has recently secured a significant contract with <motion.span className="text-sky-400 font-semibold" whileHover={{ textShadow: '0 0 10px rgba(56, 189, 248, 0.5)' }}>Top-game-shack</motion.span>, a Canadian games development company, to test a new range of children's games.
                  </AnimatedParagraph>
                  
                  <AnimatedParagraph className="text-slate-300 text-base leading-relaxed" delay={0.2}>
                    This contract presents unique challenges: testers must evaluate games across different hardware configurations (varying CPU cores, RAM, and VRAM), measure critical performance variables (FPS, load times, stability), and maintain seamless collaboration with the overseas client through shared documentation and video conferencing.
                  </AnimatedParagraph>

                  <AnimatedParagraph className="text-slate-300 text-base leading-relaxed" delay={0.3}>
                    The Managing Director has expressed concerns about whether GamesTek's current infrastructure can meet these demands. In response, the Network Manager has proposed implementing a <motion.span className="text-amber-400 font-semibold" whileHover={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>virtualised solution</motion.span>. This report will examine the characteristics of different virtualisation technologies, propose a suitable solution for GamesTek's requirements, and analyse and evaluate the potential impact of implementation on both the organisation and its employees.
                  </AnimatedParagraph>
                </div>

                {/* Animated company info cards */}
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 }}
                >
                  {[
                    { icon: Users, label: 'Testers', value: '12' },
                    { icon: Globe, label: 'Partner', value: 'Canada' },
                    { icon: Monitor, label: 'Platforms', value: 'Multi' },
                    { icon: Target, label: 'Focus', value: "Kids'" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-4 text-center"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(56, 189, 248, 0.3)' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.042 + i * 0.03 }}
                    >
                      <item.icon className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{item.value}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </GlassCard>
          </section>

          {/* TASK 1 SECTION */}
          <section id="task1" className="scroll-mt-8 space-y-8">
            <GlassCard className="p-8 lg:p-10 magic-card" delay={0.1}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-sky-400 tracking-widest">003</span>
                  <motion.span 
                    className="h-px bg-sky-400/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                  />
                  <motion.span 
                    className="text-[10px] text-amber-400 font-bold uppercase tracking-widest px-2 py-1 bg-amber-400/10 rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Criteria: P1, P2
                  </motion.span>
                </div>
                
                <AnimatedTitle className="text-3xl lg:text-4xl font-black text-white mb-2">
                  Task 1: Characteristics & Solution
                </AnimatedTitle>
                <AnimatedParagraph className="text-slate-400 mb-8" delay={0.1}>
                  Examining virtualisation types and proposing a solution for GamesTek
                </AnimatedParagraph>

                {/* 2.1 Characteristics of Virtualisation (P1) */}
                <div className="mb-12">
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-8 h-8 rounded-lg bg-sky-400/20 flex items-center justify-center text-sky-400 text-sm font-mono"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      2.1
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Characteristics of Different Types of Virtualisation</h3>
                    <span className="ml-auto text-xs text-sky-400 font-mono">(P1)</span>
                  </motion.div>

                  {/* 2.1.1 Hypervisors */}
                  <div className="mb-10">
                    <motion.h4 
                      className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <Server className="w-5 h-5 text-sky-400" />
                      2.1.1 Hypervisors: Type 1 and Type 2
                    </motion.h4>
                    
                    <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                      A <span className="text-sky-400 font-semibold">hypervisor</span> (also known as a Virtual Machine Monitor or VMM) is specialised software that creates and manages virtual machines by allocating physical hardware resources to multiple isolated virtual environments. There are two distinct types of hypervisors, each suited to different use cases.
                    </AnimatedParagraph>

                    {/* Hypervisor Diagram */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <HypervisorDiagram />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Type 1 Card */}
                      <motion.div 
                        className="relative bg-gradient-to-br from-sky-400/10 to-transparent border border-sky-400/20 rounded-xl magic-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          borderColor: 'rgba(56, 189, 248, 0.5)',
                          boxShadow: '0 0 30px rgba(56, 189, 248, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-sky-400/20 flex items-center justify-center">
                            <Server className="w-5 h-5 text-sky-400" />
                          </div>
                          <h5 className="text-lg font-bold text-sky-400">Type 1 (Bare Metal)</h5>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                          Runs directly on the physical server hardware without requiring a host operating system. This architecture provides superior performance and security, making it ideal for enterprise data centres and production environments.
                        </p>
                        <div className="space-y-2 text-sm">
                          {[
                            'Direct hardware access – minimal overhead',
                            'Examples: VMware ESXi, Microsoft Hyper-V, Citrix XenServer',
                            'Best for: Server consolidation, enterprise workloads'
                          ].map((text, i) => (
                            <motion.div 
                              key={i}
                              className="flex items-center gap-2 text-slate-400"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                            >
                              <ChevronRight className="w-4 h-4 text-sky-400" />
                              <span>{text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Type 2 Card */}
                      <motion.div 
                        className="relative bg-gradient-to-br from-purple-400/10 to-transparent border border-purple-400/20 rounded-xl magic-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04, duration: 0.3 }}
                        whileHover={{ 
                          borderColor: 'rgba(129, 140, 248, 0.5)',
                          boxShadow: '0 0 30px rgba(129, 140, 248, 0.1)'
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center">
                            <Monitor className="w-5 h-5 text-purple-400" />
                          </div>
                          <h5 className="text-lg font-bold text-purple-400">Type 2 (Hosted)</h5>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                          Runs on top of a conventional host operating system (Windows, Linux, macOS). While this introduces additional overhead, it offers greater flexibility and is easier to set up for individual users and development purposes.
                        </p>
                        <div className="space-y-2 text-sm">
                          {[
                            'Easier installation and management',
                            'Examples: VMware Workstation, Oracle VirtualBox, Parallels',
                            'Best for: Development, testing, personal use'
                          ].map((text, i) => (
                            <motion.div 
                              key={i}
                              className="flex items-center gap-2 text-slate-400"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                            >
                              <ChevronRight className="w-4 h-4 text-purple-400" />
                              <span>{text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    
                  </div>

                  {/* 2.1.2 Hardware Virtualisation */}
                  <div className="mb-10">
                    <motion.h4 
                      className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <Cpu className="w-5 h-5 text-sky-400" />
                      2.1.2 Hardware Virtualisation
                    </motion.h4>

                    <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                      Hardware virtualisation abstracts physical hardware resources to create virtual machines. Different approaches offer varying levels of performance, compatibility, and complexity.
                    </AnimatedParagraph>

                    <div className="space-y-6 mb-8">
                      {/* Full Virtualisation */}
                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-sky-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <h5 className="text-lg font-bold text-sky-400">Full Virtualisation</h5>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                          Each virtual machine operates with complete isolation, believing it has exclusive access to dedicated hardware. The hypervisor intercepts and translates all hardware requests, allowing unmodified guest operating systems to run without any awareness of virtualisation.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Complete OS isolation', 'No guest modification needed', 'Strong security boundaries'].map((tag, i) => (
                            <motion.span 
                              key={i}
                              className="px-3 py-1 bg-sky-400/10 text-sky-400 rounded-full text-xs"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Paravirtualisation */}
                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 }}
                        whileHover={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-amber-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.042 }}
                          />
                          <h5 className="text-lg font-bold text-amber-400">Paravirtualisation</h5>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                          The guest operating system is modified to be aware it is running in a virtualised environment. This allows direct communication with the hypervisor through specialised "hypercalls", significantly improving performance by reducing translation overhead.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Better performance', 'Requires OS modification', 'Example: Xen paravirt'].map((tag, i) => (
                            <motion.span 
                              key={i}
                              className="px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-xs"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Partial Virtualisation */}
                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        whileHover={{ borderColor: 'rgba(129, 140, 248, 0.3)' }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-purple-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.06 }}
                          />
                          <h5 className="text-lg font-bold text-purple-400">Partial Virtualisation</h5>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                          Only specific hardware components are virtualised (such as memory or storage), while other resources remain shared with the host system. This provides a middle ground between full virtualisation and no virtualisation, offering targeted isolation where needed.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Selective resource virtualisation', 'Lower overhead', 'Limited isolation'].map((tag, i) => (
                            <motion.span 
                              key={i}
                              className="px-3 py-1 bg-purple-400/10 text-purple-400 rounded-full text-xs"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Emulation vs Hardware-Assisted */}
                    <motion.h5 
                      className="text-lg font-semibold text-white mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      Emulation vs Hardware-Assisted Virtualisation
                    </motion.h5>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6 relative overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        <motion.div 
                          className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-full blur-2xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <h6 className="font-bold text-red-400 mb-2">Emulation</h6>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                          Completely simulates different hardware architectures in software, allowing operating systems designed for entirely different processors to run. While extremely flexible (e.g., running ARM software on x86), this approach is significantly slower due to the instruction-by-instruction translation required.
                        </p>
                        <p className="text-slate-500 text-xs">Example: QEMU emulating ARM on x86</p>
                      </motion.div>

                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6 relative overflow-hidden"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}
                      >
                        <motion.div 
                          className="absolute top-0 right-0 w-32 h-32 bg-green-400/5 rounded-full blur-2xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 4, repeat: Infinity, delay: 0.06 }}
                        />
                        <h6 className="font-bold text-green-400 mb-2">Hardware-Assisted Virtualisation</h6>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                          Modern processors include dedicated virtualisation extensions (Intel VT-x, AMD-V) that provide hardware-level support for running virtual machines. These features enable near-native performance by allowing the hypervisor to execute guest code directly on the CPU with hardware-enforced isolation.
                        </p>
                        <p className="text-slate-500 text-xs">CPU extensions handle VM transitions efficiently</p>
                      </motion.div>
                    </div>

                    {/* Snapshots and Teleportation */}
                    <motion.h5 
                      className="text-lg font-semibold text-white mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      Snapshots and Teleportation (Live Migration)
                    </motion.h5>
                    
                    <motion.div 
                      className="bg-gradient-to-r from-sky-400/5 to-purple-400/5 border border-white/10 rounded-xl magic-card p-6 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div 
                          className="p-4 rounded-lg bg-slate-800/30 border border-sky-400/10"
                          whileHover={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-sky-400/20 flex items-center justify-center">
                              <HardDrive className="w-5 h-5 text-sky-400" />
                            </div>
                            <h6 className="font-bold text-sky-400">Snapshots</h6>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            Capture the complete state of a virtual machine at a specific point in time, including memory, disk, and configuration. This enables instant rollback to previous states – invaluable for testing where testers can quickly revert to a clean installation after each game version test.
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>Point-in-time recovery</span>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="p-4 rounded-lg bg-slate-800/30 border border-purple-400/10"
                          whileHover={{ borderColor: 'rgba(129, 140, 248, 0.3)' }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center">
                              <Zap className="w-5 h-5 text-purple-400" />
                            </div>
                            <h6 className="font-bold text-purple-400">Teleportation (Live Migration)</h6>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            Moves a running virtual machine from one physical server to another with minimal or zero downtime. The VM's memory state is transferred while it continues executing, then the final state is synchronised and execution resumes on the destination server.
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Globe className="w-3 h-3" />
                            <span>Zero-downtime migration</span>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Visual representation of live migration */}

                    </motion.div>
                  </div>

                  {/* 2.1.3 Desktop Virtualisation */}
                  <div className="mb-10">
                    <motion.h4 
                      className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <Monitor className="w-5 h-5 text-sky-400" />
                      2.1.3 Desktop Virtualisation
                    </motion.h4>

                    <div className="space-y-6 mb-6">
                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}
                      >
                        <h5 className="text-lg font-bold text-sky-400 mb-3">Local Desktop Virtualisation (Client-Based)</h5>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                          Virtual machines run directly on the user's own PC or laptop using a Type 2 hypervisor such as VMware Workstation or Oracle VirtualBox. The local hardware (CPU, RAM, storage) provides all computing resources, giving users complete control over their virtual environments while working offline.
                        </p>
                        <p className="text-slate-400 text-sm">
                          <span className="text-amber-400">For GamesTek:</span> Testers could run different OS configurations locally, but this requires powerful individual workstations and makes environment sharing difficult.
                        </p>
                      </motion.div>

                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 }}
                        whileHover={{ borderColor: 'rgba(129, 140, 248, 0.3)' }}
                      >
                        <h5 className="text-lg font-bold text-purple-400 mb-3">Remote Desktop Virtualisation</h5>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                          Processing occurs on centralised servers, with users connecting remotely to access their desktop environments. Different client types offer varying balances of local and remote processing:
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            { type: 'Fat Client', icon: Monitor, char: 'Full local OS with significant processing power; can run applications locally or connect to remote desktops', resources: 'High', color: 'sky' },
                            { type: 'Thin Client', icon: Layers, char: 'Minimal local OS; primarily displays remote desktop session, limited local processing', resources: 'Low', color: 'amber' },
                            { type: 'Zero Client', icon: Box, char: 'No local operating system; purely a display terminal that boots directly into remote session', resources: 'None', color: 'purple' },
                          ].map((item, i) => (
                            <motion.div 
                              key={i}
                              className={`p-4 rounded-lg bg-${item.color}-400/5 border border-${item.color}-400/10`}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                              whileHover={{ 
                                borderColor: item.color === 'sky' ? 'rgba(56, 189, 248, 0.3)' : 
                                            item.color === 'amber' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(129, 140, 248, 0.3)',
                                y: -2
                              }}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg bg-${item.color}-400/20 flex items-center justify-center`}>
                                  <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                                </div>
                                <div>
                                  <h6 className={`font-bold text-${item.color}-400`}>{item.type}</h6>
                                  <span className="text-[10px] text-slate-500 uppercase">Resources: {item.resources}</span>
                                </div>
                              </div>
                              <p className="text-slate-300 text-sm leading-relaxed">{item.char}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div 
                        className="bg-gradient-to-br from-sky-400/10 to-purple-400/10 border border-sky-400/20 rounded-xl magic-card p-6 relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <motion.div
                          className="absolute -right-10 -top-10 w-40 h-40 bg-sky-400/10 rounded-full blur-3xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <h5 className="text-lg font-bold text-white mb-3 relative z-10">Virtual Desktop Infrastructure (VDI)</h5>
                        <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                          A comprehensive solution where multiple virtual desktop environments are hosted on centralised data centre servers. Each user receives their own dedicated virtual machine accessed remotely. VDI enables centralised management, consistent environments, enhanced security, and allows users to work from any device while IT maintains full control over software, updates, and configurations.
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* 2.1.4 Memory Virtualisation */}
                  <div className="mb-8">
                    <motion.h4 
                      className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <Database className="w-5 h-5 text-sky-400" />
                      2.1.4 Memory Virtualisation
                    </motion.h4>

                    <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                      Memory virtualisation abstracts physical RAM across one or more servers into a unified pool that can be dynamically allocated to virtual machines. This enables more efficient memory utilisation through several key techniques:
                    </AnimatedParagraph>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {[
                        { title: 'Memory Overcommit', color: 'sky', desc: 'Allocate more total virtual memory than physical RAM available, relying on the fact that VMs rarely use all allocated memory simultaneously.' },
                        { title: 'Memory Sharing', color: 'amber', desc: 'Identical memory pages across VMs (such as OS kernel pages) are stored once and shared, dramatically reducing total memory consumption.' },
                        { title: 'Memory Ballooning', color: 'purple', desc: 'Dynamically reclaims unused memory from VMs and redistributes it to those with higher demand, optimising overall utilisation.' },
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-5 relative overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ 
                            scale: 1.03,
                            borderColor: item.color === 'sky' ? 'rgba(56, 189, 248, 0.3)' : item.color === 'amber' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(129, 140, 248, 0.3)'
                          }}
                        >
                          <motion.div
                            className={`absolute -right-5 -bottom-5 w-20 h-20 rounded-full blur-2xl ${
                              item.color === 'sky' ? 'bg-sky-400/10' : item.color === 'amber' ? 'bg-amber-400/10' : 'bg-purple-400/10'
                            }`}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.02 }}
                          />
                          <h6 className={`font-bold mb-2 ${
                            item.color === 'sky' ? 'text-sky-400' : item.color === 'amber' ? 'text-amber-400' : 'text-purple-400'
                          }`}>{item.title}</h6>
                          <p className="text-slate-300 text-sm relative z-10">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Memory Management Interactive View */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h5 className="text-white font-bold text-lg">Memory Management Interactive View</h5>
                          <p className="text-slate-400 text-sm">
                            Explore and interact with the live memory management demo directly on this page.
                          </p>
                        </div>
                        <a
                          href="https://sweet-orchard.github.io/memory-management/"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-400/30 transition"
                        >
                          <Globe className="w-4 h-4" />
                          Open in new tab
                        </a>
                      </div>
                      <a
                        href="https://sweet-orchard.github.io/memory-management/"
                        target="_blank"
                        rel="noreferrer"
                        className="group block"
                        aria-label="Open Memory Management Interactive"
                      >
                        <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
                          <img
                            src="/interactive view.png"
                            alt="Memory management interactive preview"
                            className="w-full h-auto object-cover transition duration-300 group-hover:scale-[1.01]"
                            loading="lazy"
                          />
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 transition duration-300 group-hover:opacity-100">
                            <span className="px-4 py-2 rounded-full border border-emerald-400/50 text-emerald-200 text-sm font-semibold tracking-wide transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.35)] group-active:scale-95">
                              Interact with the diagram
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <motion.div 
                  className="border-t border-white/10 my-10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />

                {/* 2.2 Virtualised Solution for GamesTek (P2) */}
                <div>
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-mono"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      2.2
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Virtualised Solution for GamesTek</h3>
                    <span className="ml-auto text-xs text-amber-400 font-mono">(P2)</span>
                  </motion.div>

                  {/* Requirements Grid */}
                  <div className="mb-8">
                    <motion.h4 
                      className="text-lg font-bold text-white mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      2.2.1 GamesTek's Computing Requirements
                    </motion.h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {/*
                        Tailwind JIT can't see string-built class names like `bg-${card.color}-...`.
                        Use a static map so the classes are generated.
                      */}
                      {(() => {
                        const cardStyles = {
                          sky: "bg-sky-400/5 text-sky-400",
                          amber: "bg-amber-400/5 text-amber-400",
                          purple: "bg-purple-400/5 text-purple-400",
                          green: "bg-green-400/5 text-green-400",
                        };
                        const cardBorders = {
                          sky: "rgba(56, 189, 248, 0.2)",
                          amber: "rgba(251, 191, 36, 0.2)",
                          purple: "rgba(129, 140, 248, 0.2)",
                          green: "rgba(34, 197, 94, 0.2)",
                        };
                        return (
                          <>
                      {[
                        { title: 'Hardware Testing', color: 'sky', icon: Cpu, items: ['Different CPU core configurations', 'Variable RAM amounts', 'Different VRAM allocations'] },
                        { title: 'Performance Metrics', color: 'amber', icon: TrendingUp, items: ['FPS monitoring', 'Load time analysis', 'Stability testing'] },
                        { title: 'Collaboration Needs', color: 'purple', icon: Users, items: ['Shared QA documentation', 'Video conferencing with Top-game-shack', 'Easy environment sharing between testers'] },
                        { title: 'Operational Needs', color: 'green', icon: Clock, items: ['Support for long working hours', 'Multiple testers on same game builds', 'Quick environment reset capability'] },
                      ].map((card, i) => (
                        <motion.div 
                          key={i}
                          className={`${cardStyles[card.color]} border rounded-xl magic-card p-4`}
                          style={{ borderColor: cardBorders[card.color] }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                          whileHover={{ 
                            scale: 1.02,
                            borderColor: card.color === 'sky' ? 'rgba(56, 189, 248, 0.5)' : 
                                        card.color === 'amber' ? 'rgba(251, 191, 36, 0.5)' : 
                                        card.color === 'purple' ? 'rgba(129, 140, 248, 0.5)' : 'rgba(34, 197, 94, 0.5)'
                          }}
                        >
                          <h5 className="font-semibold mb-2 text-sm flex items-center gap-2">
                            <card.icon className="w-4 h-4" />
                            {card.title}
                          </h5>
                          <ul className="space-y-1 text-slate-300 text-sm">
                            {card.items.map((item, j) => (
                              <motion.li 
                                key={j}
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="w-3 h-3" />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Proposed Solution */}
                  <div className="mb-8">
                    <motion.h4 
                      className="text-lg font-bold text-white mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      2.2.2 Recommended Virtualised Solution
                    </motion.h4>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-sky-400/10 via-purple-400/5 to-transparent border border-sky-400/20 rounded-xl magic-card p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <AnimatedParagraph className="text-slate-300 leading-relaxed mb-6" delay={0.1}>
                        Based on GamesTek's requirements, I recommend implementing a <span className="text-sky-400 font-semibold">Virtual Desktop Infrastructure (VDI)</span> solution built on <span className="text-amber-400 font-semibold">Type 1 hypervisors</span> running on centralised high-performance servers. This architecture provides:
                      </AnimatedParagraph>

                      <div className="space-y-4">
                        {[
                          { icon: Server, color: 'sky', title: 'Centralised Server Infrastructure', desc: 'Deploy Type 1 hypervisors (e.g., VMware ESXi or Microsoft Hyper-V) on powerful servers to host multiple virtual machines. Each VM can be configured with specific CPU cores, RAM, and virtual GPU resources to simulate different hardware environments.' },
                          { icon: Monitor, color: 'purple', title: 'VDI for Testers', desc: "Each tester receives a dedicated virtual desktop accessible from thin clients. They can quickly switch between different hardware configurations without physical machine changes. Remote access enables flexible working hours and locations." },
                          { icon: HardDrive, color: 'amber', title: 'Snapshots and Templates', desc: 'Create golden image templates for each test configuration. Use snapshots to capture clean installation states, allowing instant rollback after testing. Clone environments so multiple testers can work on identical setups simultaneously.' },
                          { icon: Users, color: 'green', title: 'Secure Collaboration Platform', desc: 'Host QA documentation on a virtualised file server with VPN access for Top-game-shack. Integrate video conferencing tools within the VDI environment, ensuring all collaboration occurs within the secure, managed infrastructure.' },
                        ].map((item, i) => (
                          <motion.div 
                            key={i}
                            className="flex items-start gap-4 p-4 bg-white/5 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                          >
                            <PulsingIcon icon={item.icon} color={item.color} />
                            <div>
                              <h6 className="font-semibold text-white mb-1">{item.title}</h6>
                              <p className="text-slate-300 text-sm">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Impact Overview */}
                  <div>
                    <motion.h4 
                      className="text-lg font-bold text-white mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      2.2.3 Potential Impact Overview
                    </motion.h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div 
                        className="bg-green-400/5 border border-green-400/20 rounded-xl magic-card p-5"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <h5 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          Impact on Organisation
                        </h5>
                        <ul className="space-y-2 text-slate-300 text-sm">
                          {['Better resource utilisation across servers', 'Centralised management reduces IT overhead', 'Initial investment in servers and licensing required', 'Scalability for future contracts'].map((item, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                            >
                              • {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div 
                        className="bg-purple-400/5 border border-purple-400/20 rounded-xl magic-card p-5"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <h5 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Impact on Testers
                        </h5>
                        <ul className="space-y-2 text-slate-300 text-sm">
                          {['Flexible remote working capability', 'Consistent, error-free test environments', 'Dependency on network connectivity', 'Reduced time switching between configurations'].map((item, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.03 }}
                            >
                              • {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* TASK 2 SECTION */}
          <section id="task2" className="scroll-mt-8">
            <GlassCard className="p-8 lg:p-10 magic-card" delay={0.1}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-sky-400 tracking-widest">004</span>
                  <motion.span 
                    className="h-px bg-sky-400/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                  />
                  <motion.span 
                    className="text-[10px] text-purple-400 font-bold uppercase tracking-widest px-2 py-1 bg-purple-400/10 rounded"
                    whileHover={{ scale: 1.05 }}
                  >
                    Criteria: M1, D1
                  </motion.span>
                </div>
                
                <AnimatedTitle className="text-3xl lg:text-4xl font-black text-white mb-2">
                  Task 2: Analyse & Evaluate Impact
                </AnimatedTitle>
                <AnimatedParagraph className="text-slate-400 mb-8" delay={0.1}>
                  In-depth analysis and critical evaluation of virtualisation implementation
                </AnimatedParagraph>

                {/* 3.1 Company Aims */}
                <div className="mb-10">
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-8 h-8 rounded-lg bg-sky-400/20 flex items-center justify-center text-sky-400 text-sm font-mono"
                      whileHover={{ scale: 1.1 }}
                    >
                      3.1
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Company Aims and Goals</h3>
                  </motion.div>

                  <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                    Understanding GamesTek's strategic objectives is essential for evaluating whether virtualisation aligns with their business direction. The company's primary aims include:
                  </AnimatedParagraph>

                  <div className="grid md:grid-cols-2 gap-4">
                    {(() => {
                      const cardStyles = {
                        sky: "bg-sky-400/5 text-sky-400",
                        amber: "bg-amber-400/5 text-amber-400",
                        purple: "bg-purple-400/5 text-purple-400",
                        green: "bg-green-400/5 text-green-400",
                        red: "bg-red-400/5 text-red-400",
                        blue: "bg-sky-400/5 text-sky-400",
                      };
                      const cardBorders = {
                        sky: "rgba(56, 189, 248, 0.2)",
                        amber: "rgba(251, 191, 36, 0.2)",
                        purple: "rgba(129, 140, 248, 0.2)",
                        green: "rgba(34, 197, 94, 0.2)",
                        red: "rgba(248, 113, 113, 0.2)",
                        blue: "rgba(56, 189, 248, 0.2)",
                      };
                      return (
                        <>
                          {[
                            { title: 'Contract Success', desc: 'Successfully deliver on the Top-game-shack contract to establish a strong partnership and reputation for international work', color: 'sky' },
                            { title: 'Testing Excellence', desc: 'Test games efficiently across multiple platforms and hardware configurations while maintaining rigorous quality standards', color: 'amber' },
                            { title: 'Quality Assurance', desc: 'Maintain comprehensive QA documentation and transparent communication with clients throughout the testing process', color: 'purple' },
                            { title: 'Employee Support', desc: 'Provide testers with effective tools to work productively during long hours, potentially from flexible locations', color: 'green' },
                            { title: 'Competitive Edge', desc: 'Stay competitive in the games testing market and position for growth with additional contracts', color: 'red' },
                            { title: 'Infrastructure Readiness', desc: 'Ensure computing infrastructure can scale to meet current and future project demands', color: 'blue' },
                          ].map((item, i) => (
                            <motion.div 
                              key={i}
                              className={`${cardStyles[item.color]} border rounded-xl magic-card p-4`}
                              style={{ borderColor: cardBorders[item.color] }}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2 }}
                              whileHover={{ scale: 1.02, y: -2 }}
                            >
                              <h5 className="font-semibold mb-2">{item.title}</h5>
                              <p className="text-slate-300 text-sm">{item.desc}</p>
                            </motion.div>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* 3.2 Analysis (M1) */}
                <div className="mb-10">
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-mono"
                      whileHover={{ scale: 1.1 }}
                    >
                      3.2
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Analysis of Impact</h3>
                    <span className="ml-auto text-xs text-amber-400 font-mono">(M1)</span>
                  </motion.div>

                  <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                    Implementing virtualisation at GamesTek will have significant effects across multiple dimensions. The following analysis examines cause-and-effect relationships in each area:
                  </AnimatedParagraph>

                  {/* Analysis Sections */}
                  {[
                    { 
                      title: '3.2.1 Technical Impact', 
                      color: 'sky',
                      items: [
                        { title: 'Server Consolidation', desc: 'If GamesTek deploys Type 1 hypervisors on high-specification servers, then multiple virtual test environments can run simultaneously on fewer physical machines. This means better hardware utilisation (typically 60-80% vs 10-15% for dedicated machines) and reduced physical footprint.', positive: true },
                        { title: 'Environment Flexibility', desc: 'If test environments are virtualised, then testers can instantly switch between different CPU, RAM, and GPU configurations without hardware changes. Therefore, testing across the full range of target hardware becomes practical and time-efficient.', positive: true },
                        { title: 'Single Point of Failure Risk', desc: 'If all testers depend on centralised servers, then a server failure could impact multiple team members simultaneously. As a result, redundancy planning and failover systems become critical to maintain productivity.', positive: false },
                      ]
                    },
                    { 
                      title: '3.2.2 Organisational Impact', 
                      color: 'amber',
                      items: [
                        { title: 'Centralised Management', desc: 'If all virtual environments are managed from a central console, then the Network Manager gains unified control over software deployments, updates, and security policies. This means reduced administrative overhead compared to managing 12+ individual workstations.', positive: true },
                        { title: 'Cost Considerations', desc: 'If GamesTek invests in virtualisation infrastructure, then significant upfront capital is required for servers, storage, and licensing. However, long-term savings emerge from reduced hardware refresh cycles, lower energy consumption, and decreased maintenance costs – typically achieving ROI within 2-3 years.', positive: true },
                        { title: 'Training and Transition', desc: 'If staff must learn new virtualised workflows, then initial productivity may temporarily decrease during the transition period. Therefore, adequate training time and resources must be budgeted to ensure smooth adoption.', positive: false },
                      ]
                    },
                    { 
                      title: '3.2.3 Impact on Testers (Users)', 
                      color: 'purple',
                      items: [
                        { title: 'Workflow Efficiency', desc: 'If testers can use snapshots and cloning, then they can instantly revert to clean states or duplicate exact configurations. This means dramatically reduced setup time between tests and consistent, reproducible testing conditions.', positive: true },
                        { title: 'Remote Working Capability', desc: 'If VDI enables remote desktop access, then testers can work from home or other locations outside normal hours. Therefore, the long unsocial hours required by the role become more manageable with improved work-life flexibility.', positive: true },
                        { title: 'Network Dependency', desc: 'If all work occurs through remote connections, then network quality directly impacts user experience. As a result, poor connectivity could cause latency issues affecting game testing accuracy, particularly for FPS-critical evaluations.', positive: false },
                      ]
                    },
                  ].map((section, si) => (
                    <motion.div 
                      key={si}
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.03 }}
                    >
                      <h4 className={`text-lg font-bold text-${section.color}-400 mb-4`}>{section.title}</h4>
                      
                      <div className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6 space-y-4">
                        {section.items.map((item, i) => (
                          <motion.div 
                            key={i}
                            className={`border-l-4 ${item.positive ? `border-${section.color}-400` : 'border-red-400'} pl-4`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ x: 5 }}
                          >
                            <p className="text-white font-semibold mb-1">{item.title}</p>
                            <p className="text-slate-300 text-sm">
                              {item.desc.split(/(then|This means|Therefore|However|As a result)/g).map((part, pi) => 
                                ['then', 'This means', 'Therefore', 'However', 'As a result'].includes(part) 
                                  ? <span key={pi} className="text-sky-400">{part}</span> 
                                  : part
                              )}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 3.3 Evaluation (D1) */}
                <div>
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-8 h-8 rounded-lg bg-purple-400/20 flex items-center justify-center text-purple-400 text-sm font-mono"
                      whileHover={{ scale: 1.1 }}
                    >
                      3.3
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Evaluation of Impact</h3>
                    <span className="ml-auto text-xs text-purple-400 font-mono">(D1)</span>
                  </motion.div>

                  <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                    Having analysed the various impacts, this section provides a critical judgement on whether virtualisation is the appropriate solution for GamesTek, weighing benefits against drawbacks in relation to the company's aims.
                  </AnimatedParagraph>

                  {/* Benefits */}
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-bold text-green-400 mb-4">3.3.1 Overall Benefits</h4>
                    <div className="bg-green-400/5 border border-green-400/20 rounded-xl magic-card p-6">
                      <AnimatedChecklist 
                        items={[
                          <><strong className="text-white">Strong Contract Support:</strong> VDI provides the scalable, shareable test environments that Top-game-shack requires. Easy documentation sharing and consistent quality assurance processes directly address contractual expectations.</>,
                          <><strong className="text-white">Long-term Cost Efficiency:</strong> Despite initial investment, reduced hardware needs, lower energy costs, and simplified management will generate savings over time, improving profitability as the company scales.</>,
                          <><strong className="text-white">Testing Consistency:</strong> Virtualised environments eliminate hardware variability, ensuring all testers work with identical configurations. This improves test reliability and makes results directly comparable.</>,
                          <><strong className="text-white">Future Scalability:</strong> The infrastructure can easily accommodate additional testers or contracts by provisioning new VMs rather than purchasing additional hardware.</>,
                        ]}
                      />
                    </div>
                  </motion.div>

                  {/* Drawbacks */}
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.04 }}
                  >
                    <h4 className="text-lg font-bold text-red-400 mb-4">3.3.2 Overall Drawbacks and Risks</h4>
                    <div className="bg-red-400/5 border border-red-400/20 rounded-xl magic-card p-6">
                      <ul className="space-y-3 text-slate-300">
                        {[
                          <><strong className="text-white">High Initial Investment:</strong> Server hardware, storage systems, hypervisor licensing, and VDI infrastructure require significant upfront capital that must be justified against projected returns.</>,
                          <><strong className="text-white">Technical Expertise Required:</strong> Managing virtualised infrastructure demands specialised skills. GamesTek may need to train existing staff or hire personnel with virtualisation experience.</>,
                          <><strong className="text-white">Infrastructure Dependency:</strong> Centralisation creates risk – network failures or server issues could halt all testing operations simultaneously, whereas distributed workstations limit impact of individual failures.</>,
                        ].map((item, i) => (
                          <motion.li 
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                          >
                            <motion.span 
                              className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-red-400"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                            >
                              !
                            </motion.span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Final Judgement */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 }}
                  >
                    <h4 className="text-lg font-bold text-white mb-4">3.3.3 Final Judgement</h4>
                    <motion.div 
                      className="bg-gradient-to-r from-sky-400/10 via-purple-400/10 to-amber-400/10 border border-white/20 rounded-xl magic-card p-6 relative overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-sky-400/5 via-purple-400/5 to-amber-400/5"
                        animate={{ 
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      <div className="relative z-10">
                        <AnimatedParagraph className="text-slate-200 leading-relaxed mb-4" delay={0.1}>
                          After carefully weighing the benefits against the drawbacks, <motion.span className="text-sky-400 font-semibold" whileHover={{ textShadow: '0 0 10px rgba(56, 189, 248, 0.5)' }}>virtualisation is the most suitable solution for GamesTek</motion.span>. The company's specific requirements – testing across multiple hardware configurations, sharing environments between testers, and providing secure documentation access to international partners – align precisely with virtualisation's core capabilities.
                        </AnimatedParagraph>
                        <AnimatedParagraph className="text-slate-200 leading-relaxed mb-4" delay={0.2}>
                          Although the initial setup costs and risks are significant, these are outweighed by the long-term strategic benefits. The flexibility, scalability, and efficiency gains directly support GamesTek's aims of delivering excellent service to Top-game-shack while positioning for future growth.
                        </AnimatedParagraph>
                        <AnimatedParagraph className="text-slate-300 leading-relaxed italic" delay={0.3}>
                          The key to success lies in careful implementation: investing in redundant infrastructure to mitigate single-point-of-failure risks, providing thorough staff training, and ensuring robust network connectivity. With these safeguards, virtualisation will enable GamesTek to meet – and exceed – the demands of their new contract.
                        </AnimatedParagraph>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* CONCLUSION SECTION */}
          <section id="conclusion" className="scroll-mt-8">
            <GlassCard className="p-8 lg:p-10 magic-card" delay={0.1}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-sky-400 tracking-widest">005</span>
                  <motion.span 
                    className="h-px bg-sky-400/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                  />
                </div>
                
                <AnimatedTitle className="text-3xl lg:text-4xl font-black text-white mb-6">
                  Conclusion
                </AnimatedTitle>

                <div className="prose prose-invert max-w-none space-y-6">
                  <AnimatedParagraph className="text-slate-300 text-base leading-relaxed" delay={0.1}>
                    This report has comprehensively examined virtualisation technologies and their application to GamesTek's operational requirements. Task 1 explained the characteristics of different virtualisation types – from Type 1 and Type 2 hypervisors to hardware virtualisation methods, desktop virtualisation approaches, and memory virtualisation techniques. A VDI-based solution was proposed to meet the specific demands of the Top-game-shack contract.
                  </AnimatedParagraph>
                  
                  <AnimatedParagraph className="text-slate-300 text-base leading-relaxed" delay={0.2}>
                    Task 2 analysed the technical, organisational, and user impacts of implementing this solution, followed by an evaluation that weighed benefits against drawbacks. The analysis demonstrated that while virtualisation requires significant upfront investment and careful risk management, the long-term benefits in flexibility, scalability, and operational efficiency make it the optimal choice for GamesTek.
                  </AnimatedParagraph>

                  <motion.p 
                    className="text-sky-400 font-semibold text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 }}
                  >
                    In conclusion, virtualisation is not merely a suitable solution for GamesTek – it is the strategic investment that will enable the company to successfully deliver on the Top-game-shack contract while building infrastructure for continued growth in the competitive games testing market.
                  </motion.p>
                </div>

                <motion.div 
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 }}
                >
                  <p className="text-slate-500 text-sm">
                    Report prepared for Unit 21: Virtualisation | Learning Aim A | Criteria P1, P2, M1, D1
                  </p>
                </motion.div>
              </div>
            </GlassCard>
          </section>

        </div>
      </main>
    </div>
  );
}
