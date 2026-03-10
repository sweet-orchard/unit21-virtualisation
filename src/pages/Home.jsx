import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server,
  Monitor,
  Cpu,
  HardDrive,
  Users,
  User,
  Building2,
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
    const sections = ['overview', 'p1', 'p2', 'm1', 'd1'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            if (b.intersectionRatio !== a.intersectionRatio) {
              return b.intersectionRatio - a.intersectionRatio;
            }
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { root: null, rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.3, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
                
                <AnimatedParagraph className="text-slate-400 text-lg mb-3 max-w-3xl" delay={0.3}>
                 Welcome to my comprehensive report! 👋
                </AnimatedParagraph>
                <AnimatedParagraph className="text-slate-400 text-lg mb-8 max-w-3xl" delay={0.3}>
                  This webpage will talk about virtualisation and how it can be used in a real company, GamesTek. I will explain, compare, analyse and evaluate different virtualisation technologies.

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
                    <PulsingIcon icon={User} color="amber" />
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
                  Table of Contents
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
                    In a world full of technologies, there’s one unique company with 12 employees: GamesTek. This organisation tests games on different platforms. Recently, they signed a contract with a Canadian game development company (Top-game-shack) and have been asked to test children’s games. 
                  </AnimatedParagraph>
                  
                  <AnimatedParagraph className="text-slate-300 text-base leading-relaxed" delay={0.2}>
                       The contract brings new challenges as testers need to test games on different hardware setups (CPUs, RAM, graphic memory), and they must measure performance such as FPS, load times and stability. Plus, they need to share documents and use video calls with Top-game-shack.               
                  </AnimatedParagraph>

                  <AnimatedParagraph className="text-slate-300 text-base leading-relaxed" delay={0.3}>
                       The problem is that the Managing Director thinks the current computer systems that they have right now might be not good enough to perform this task. Later, Network Manager suggested to use virtualisation in this case. This report will support Network Manager and give valuable reasons why the choice of virtualisation will be a good decision.                
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
                    { icon: User, label: 'Focus', value: "Kids'" },
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
                  Virtualisation is a concept that allows to run different kinds of virtual computers inside a single physical machine. It can contain hypervisors, virtual machines, virtual networks, virtual storage, etc. For example, an employee from GamesTek has one laptop but needs to test a game on Windows 10, Windows 11 and Linux. That’s many operating systems and they cost a lot of money. The employee doesn’t need to play the game continuously, he just needs to test it. That’s why he can use virtualisation to run the game on different hardware characteristics inside only one single laptop, saving both cost and time.
                </AnimatedParagraph>

                {/* 2.1 Characteristics of Virtualisation (P1) */}
                <div id="p1" className="mb-12 scroll-mt-8">
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
                      P1
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
                      Hypervisors: Type 1 and Type 2
                    </motion.h4>
                    
                    <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                      A <span className="text-sky-400 font-semibold">hypervisor</span> (may be also known as Virtual Monitor) is specialised software that creates and manages virtual machines. It allocates resources to each VM (decides how much CPU or RAM each one can get) and  keeps VMs isolated from each other so they can’t communicate or interfere with one another. There are 2 types of hypervisors:
                    </AnimatedParagraph>

                    {/* Hypervisor Diagram */}
                    <motion.div
                      className="mb-6"
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
                          Runs directly from hardware (CPU, RAM, storage). This architecture provides robust performance and security. When a VM needs to access data from hardware, the request goes straight to the VM to the hypervisor and then to hardware. This is why it has minimal latency and it’s fast as there’s no extra layer in between (clear access). 
                        </p>
                        <div className="space-y-2 text-sm">
                          {[
                            'Direct hardware access - minimal latency',
                            'Better security, completely isolated from other computers',
                            'Best for: enterprise, business applications (databases, email servers, file storage) combining servers',
                            'Examples: VMware ESXi, Microsoft Hyper-V, Citrix XenServer'
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
                          Runs as software on top of a normal OS. It can be installed like any other application (one of the famous app is VirtualBox on Windows). When a VM needs hardware access, the request goes: VM → hypervisor → host OS → and then hardware.
                        </p>
                        <div className="space-y-2 text-sm">
                          {[
                            'Easier installation and management',
                            'Flexible - can be run alongside normal applications',
                            'Less secure due to dependency on host OS',
                            'Good for learning and experimenting',
                            'Slower as extra layer creates delay',
                            'Best for: development, testing, personal use, learning',
                            'Examples: Oracle Virtual Box, VMware Workstation, Parallels Desktop'
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
                      Hardware Virtualisation
                    </motion.h4>

                    <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                      Hardware virtualisation is the process of creating virtual versions of physical computer hardware components so that multiple virtual machines can share the same physical resources. The hypervisor creates a virtual layer that makes each VM think it has its own CPU, RAM or storage, but in action the hypervisor redirects them, so the actual hardware machine doesn’t consume all the energy needed.
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
                          The Virtual Machine gets a complete virtual copy of the hardware. It doesn’t know it’s virtual, it performs tasks as it’s only 1 computer with 1 operating system. The hypervisor translates all hardware requests from the VM to the real physical hardware and then any OS can run without changes. However, it has slight performance issues from translation.
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
                          In this case, the guest OS is aware it’s running in a virtual environment and that it’s not alone. Instead of pretending to be real hardware the hypervisor and guest OS communicate directly through special interfaces. It significantly improves performance as it uses less translation.                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Better performance', 'Requires OS modification'].map((tag, i) => (
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
                          Only some hardware components are virtualised (such as memory or storage). Some resources are shared, others are given directly to the VM. It’s not a full virtualisation neither no virtualisation, something in the middle.  
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
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6 relative overflow-hidden flex flex-col"
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
                          It can be used to run software that is completely different from the  hardware. The emulator translates every single instruction from the guest OS into instructions the physical hardware understands. For example, playing old console games on PC using and emulator or running apps that were designed for old phone interfaces (it’s not specifically for old cases, for any situation where the software and hardware are completely different from each other). It is very flexible because it can emulate almost any system but also very slow as every instruction requires translation in real time and consumes high CPU usage.                        </p>
                        <p className="text-slate-500 text-xs mt-auto pt-4">Flexible, compatible, but very slow and resource-intensive</p>
                      </motion.div>

                      <motion.div 
                        className="bg-slate-800/30 border border-white/5 rounded-xl magic-card p-6 relative overflow-hidden flex flex-col"
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
                          Modern CPUs have built-in features that help hypervisors run VMs much faster. The CPU itself handles some virtualisation tasks instead of hypervisor doing all the work in software. The hypervisor uses special CPU instructions that help to run VMs almost at perfect native speed. It allows to run many VMs efficiently. Also, it uses less overhead and is better for security and isolation because the CPU physically prevents it. But it requires a compatible modern CPU and Guest OS must be designed for the same CPU architecture. 
                        </p>
                        <p className="text-slate-500 text-xs mt-auto pt-4">Fast, efficient, secure but requires proper hardware to be able to run</p>
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
                               It captures a specific point in time, including its memory, disk, and settings allowing to come back to this point later in case if something goes wrong. It’s really good for testing where testers can quickly revert to a clean installation after each game version test. Plus, multiple testers can start from the same clean snapshot.
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
                            Move a working virtual machine from one physical server to another while it continues running. It’s working this way because the switch happens so quickly that applications inside the VM don’t notice. It helps maintain the server without stopping VMs and it can balance workload across servers (move VMs from busy server to less busy ones).
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
                      Desktop Virtualisation
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
                         Virtual Machines can run directly on the user’s laptop using its hardware and type 2 hypervisor such as Oracle VirtualBox. The VM thinks it has its own dedicated CPU, RAM and memory. When the VM needs CPU power, the hypervisor shares some of the laptop’s CPU time with it. This gives the users complete control over their virtual environment and allows to work offline. 
                        </p>
                        <p className="text-slate-400 text-sm">
                          <span className="text-amber-400">For GamesTek:</span>  testers can test games on different operating systems using their own laptops, but each laptop should be powerful enough to run multiple virtual machines and this makes it difficult to ensure all testers are using the same configurations.
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
                          Processing happens inside centralised servers, and gathers all the data, and users can connect to them remotely over network using a client device (thick client, thin client, zero client, or regular PC). The user’s device only displays the screen and sends keyboard /mouse input. The server does all the heavy computing (CPU, RAM, storage). Users can access their virtual desktop from anywhere with internet and they don’t powerful local hardware. However, it requires network connection to be able to connect to the remote VMs.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            { type: 'Thick Client', icon: Monitor, char: 'It’s the most expensive client device because it is similar to a regular PC with its own operating system and local processing power. It can run applications locally but can also connect to remote virtual desktops.', resources: 'High', color: 'sky' },
                            { type: 'Thin Client', icon: Layers, char: 'This is a lightweight device with minimal local OS and resources. It’s designed specifically to connect to remote desktops and it’s cheaper than a thick client, as it consumes less power.', resources: 'Low', color: 'amber' },
                            { type: 'Zero Client', icon: Box, char: 'The simplest device with almost no local operating system. Just displays what the server sends and captures user input. Cheapest option, very secure because nothing is stored locally.', resources: 'None', color: 'purple' },
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
                            Virtual Desktop Infrastructure (VDI) is a system that connects many individual virtual desktops on servers as a centralised unit. Each user has its own personal virtual desktop that they can access remotely. Users can keep their files, settings, installed between sessions. The desktop runs on the server where the user’s device just displays it. It’s faster to deploy similar configurations to many users and it stays consistent throughout all devices. VDI is really good for large organisations or education (in schools, colleges, universities) where users need to have a centralised system for many people. It makes the data secure as it stays on the server, not on local devices. However, it requires reliable network connection to run the server and many people rely on the server and in case if network has some issues, it will affect the whole organisation. 
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
                      Memory Virtualisation
                    </motion.h4>

                    <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                                Memory virtualisation takes all the physical RAM from one or more servers and combines it into one big shared pool that can be split between virtual machines. Instead of each VM getting a fixed amount of RAM that can't be changed, the hypervisor manages all the memory smartly and gives it to VMs when they need it. This makes RAM usage much more efficient because the memory is shared and distributed based on demand.          
                    </AnimatedParagraph>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {[
                        { title: 'Memory Overcommit', color: 'sky', desc: 'Allocate more total virtual memory than physical RAM available, because VMs rarely use all their allocated memory at the same time. For example, a server with 32GB RAM can allocate 50GB total across all VMs.' },
                        { title: 'Memory Sharing', color: 'amber', desc: 'When multiple VMs run the same OS, the hypervisor stores identical pages just once and shares them. Instead of storing Windows files 10 times for 10 VMs, it stores them once, saving lots of RAM.' },
                        { title: 'Memory Ballooning', color: 'purple', desc: 'Takes back unused RAM from VMs that aren\'t using it and gives it to VMs that need more. If one VM has 8GB allocated but is only using 2GB, the hypervisor can take that extra 6GB and give it to a busy VM that\'s running out of memory.' },
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
                          <p className="text-slate-300 text-sm">
                            Explore and interact with the live memory management diagram.
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
                        aria-label="Open ement Interactive"
                      >
                        <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
                          <img
                            src={`${process.env.PUBLIC_URL}/memory-management-interactive-view.png`}
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
                <div id="p2" className="scroll-mt-8">
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
                      P2
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Solutions for GamesTek</h3>
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
                      GamesTek's Computing Requirements
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
                      Recommended Virtualised Solution
                    </motion.h4>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-sky-400/10 via-purple-400/5 to-transparent border border-sky-400/20 rounded-xl magic-card p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="space-y-4">
                        {[
                          {
                            title: "Type 2 Hypervisor",
                            desc: "Each employee of GamesTek can install VirtualBox on their machines and test games with different CPU and RAM configurations. It will be safer to test the games because it won't affect the main hardware, only the virtual machines. When a tester finds a bug, they can share the same virtual machine where the bug was found and investigate it together as a team. This saves money on buying many physical machines because employees can test games on the machines GamesTek already has. However, computers must be powerful enough to perform all the required tests.",
                          },
                          {
                            title: "Virtual Desktop Infrastructure (VDI) and Thick client",
                            desc: "GamesTek can set up a centralised place for servers that can run type 1 hypervisors to host all testing virtual machines. Instead of giving each tester a powerful workstation for every test scenario, employees can use thick clients (full PCs with their own operating system and local processing power) to connect to the VDI environment over the network. All the heavy testing environments still run on the central servers, while the thick client mainly displays the remote desktop and sends keyboard and mouse input. However, unlike thin clients, thick clients can also run some tools locally (for example, documentation apps, browsers, or light testing utilities) if needed. Once the testing team receives a new game build, it can be installed on the server and all employees can test the game identically. This reduces the risk that the game works for one tester but not another, because everyone uses the same central VM configurations. Test reports and documentation are stored on the server and can be shared with Top-game-shack during video calls. This approach still supports remote work and centralised security, but it usually costs more than thin clients because thick clients require stronger hardware, full OS management, patching, and higher power usage. It also still depends on a reliable network. GamesTek should have a backup server in case the primary server fails or becomes damaged.",
                          },
                          {
                            title: "Full Virtualisation",
                            desc: "GamesTek needs to test games on different hardware and operating systems. Full virtualisation creates full virtual copies of different hardware types without needing those exact physical machines. The hypervisors can simulate various CPU and RAM configurations by translating hardware requests. This is important because Top-game-shack's children's games must work in schools, often on Windows 10, Windows 11, or Linux (Ubuntu). Instead of buying separate machines for each OS, testers can run all three at once. Each VM thinks it is the only one, which adds strong isolation so one failed test doesn't affect the others. A limitation is that translating every hardware request can create delays and slow down performance.",
                          },
                          {
                            title: "Hardware Assistance",
                            desc: "To reduce delays and lag when testing games, hardware assistance can help virtual machines run much faster. GamesTek must provide accurate performance data for clients, including FPS, load analysis, and stability testing. Without hardware assistance, VMs run slower due to translation, and results can be misleading. That could damage GamesTek's reputation and risk contract termination. Hardware assistance helps provide more accurate test results.",
                          },
                          {
                            title: "Emulation of Android",
                            desc: "GamesTek might also be asked to test games on Android devices. Unlike desktop operating systems that can use hardware-assisted virtualisation, mobile operating systems require emulation with full translation of every instruction because they use different CPU architectures. Performance will be slower, so testers should inform clients that performance metrics may vary. The focus should be on functionality: button response, menu display, and crash-free launch. Emulation saves cost on buying actual mobile hardware and allows testing multiple Android versions quickly, with potential for automation.",
                          },
                          {
                            title: "Snapshots",
                            desc: "Before testing each new game build from Top-game-shack, testers create a snapshot (a checkpoint that can be returned to) with all necessary tools. After running tests that require installing files or changing settings, they can revert to the checkpoint in seconds instead of reinstalling Windows, creating clean testing environments. This reduces downtime and keeps setups consistent. If a game crashes the VM or damages the system, the snapshot enables fast recovery.",
                          },
                          {
                            title: "Teleportation",
                            desc: "Sometimes GamesTek will need urgent maintenance of the physical server while testing is in progress. Teleportation (live migration) moves a running test to another server without stopping or losing progress. It also allows moving tests that need more CPU or RAM without interrupting testing. During peak times, teleportation supports load balancing by moving tests to less busy servers and reducing bottlenecks that could affect FPS and load time testing. This requires stable network connections between servers and shared storage, so careful planning is needed.",
                          },
                        ].map((item, i) => (
                          <motion.div 
                            key={i}
                            className="p-4 bg-white/5 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                          >
                            <h6 className="font-semibold text-white mb-2">{item.title}</h6>
                            <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
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
                  Positive and negative analyse with a final judgement for evaluation in the end
                </AnimatedParagraph>

                {/* 3.1 Company Aims */}
                <div className="mb-10">
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    
                    <h3 className="text-2xl font-bold text-white">Company Aims and Goals</h3>
                  </motion.div>

                

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
                            { title: 'Contract Success', desc: 'Successfully deliver on the Top-game-shack contract to make people trust the company more, leading to good reputation more contracts in the future.', color: 'sky' },
                            { title: 'Testing Excellence', desc: 'Test games efficiently across multiple platforms and hardware configurations while maintaining  high quality standards and delivering accurate, consistent results within agreed deadlines', color: 'amber' },
                            { title: 'Quality Assurance', desc: 'Maintain comprehensive QA documentation (via video calls and emails) about test results, bug reports, and quality check to keep the clients informed throughout the testing process ', color: 'purple' },
                            { title: 'Employee Support', desc: 'Stay competitive in the games testing market by offering testing capabilities that match or exceed competitors. This way be on-track with modern technologies and obtain a maximum number of profitable contracts.', color: 'green' },
                            { title: 'Competitive Edge', desc: 'Competitive Edge. Stay competitive in the games testing market by offering testing capabilities that match or exceed competitors. This way be on-track with modern technologies and obtain a maximum number of profitable contracts.', color: 'red' },
                            { title: 'Scalable Infrastructure', desc: 'GamesTek’s computing systems need to be flexible enough to handle their current workload with the Top-game-shack contract, but also be able to grow and expand their size when they take on more clients or bigger projects in the future.', color: 'blue' },
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
                <div id="m1" className="mb-10 scroll-mt-8">
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
                      M1
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Analysis of Impact</h3>
                    <span className="ml-auto text-xs text-amber-400 font-mono">(M1)</span>
                  </motion.div>

                  <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                      This section will discuss the benefits and drawbacks of implementing VMs for GamesTek.                  </AnimatedParagraph>

                  {/* Analysis Sections */}
                  {[
                    { 
                      title: 'Technical Impact', 
                      color: 'sky',
                      items: [
                        { title: 'One powerful server can host multiple testing environments simultaneously', desc: 'Instead of buying many separate physical computers for different configuration tests, GamesTek can use virtualisation to create multiple testing environments on just one server. For example, if GamesTek needs to test a game on three different setups, they can create three virtual machines on one server rather than purchasing three separate computers. This means better hardware utilisation and reduced physical footprint.', positive: true },
                        { title: 'Ability to switch between different CPU, RAM and GPU configurations without hardware changes.', desc: 'GamesTek’s contract requires to test games on different hardware configurations and virtualisation allows it to happen by testing different amount of CPU cores, RAM and graphic memory without touching any physical hardware. Therefore, testers can do their testing faster and provide accurate information across various hardware setups.', positive: true },
                        { title: 'All testers depend on centralised servers', desc: "As everything is stored in servers and every virtual machine is connected to the servers, if the system fails, the whole project process will be to stopped and no one will be able to work. This creates a single point of failure that could impact GamesTek's ability to meet deadlines and fulfill their contract requirements with Top-game-shack.", positive: false },
                        { title: 'Disaster Recovery with backup servers', desc: 'Though the whole project depends on one system, there’s a way to make it more secure by adding backup servers. GamesTek could also add automated backups that can easily swap the servers and keep it running even if one of the main servers fails. This will help the company feel more protected and prevent uncontrollable data loss.', positive: true },
                        { title: 'Depends on network connection', desc: 'GamesTek network connection affects not only the testing phase but also communication between the clients. They had one of the requirements to have video calls but without internet connection they won’t be able to perform this task. Additionally, due to poor network connection the games might lag during testing phase or give not accurate information for the testing. This means the company needs a reliable internet infrastructure to ensure the workflow is smooth and efficient.', positive: false },
                      ]
                    },
                    { 
                      title: 'Organisational Impact', 
                      color: 'amber',
                      items: [
                        { title: 'Overall cost savings', desc: 'There are a couple of reasons why it will have a positive impact on budget for GamesTek. First, with virtualisation it will require fewer PCs for each tester, then it will reduce the amount of electricity bills  and lower cooling costs in the office.', positive: true },
                        { title: 'Business Scalability', desc: 'GamesTek can quickly accept new contracts beyond Top-game-shack by bringing up more VMs. It doesn’t require waiting for delivery and setup like with physical hardware, they can simply allocate additional virtual machines by using previous testing templates with all the necessary testing tools and operating systems that are already installed. This will make increase the revenue and the overall efficient of the whole team.', positive: true },
                        { title: 'Better communication with the clients', desc: 'Testers can easily share their VMs and testing results when communication with the clients via video calls. It will allow both the company and the clients to review the same data in real-time. It’s faster to share it this way rather than sending actual files, because the testing can be accessed directly through screen sharing, removing the need for large files transfers, that can cause slower communication.', positive: true },
                        { title: 'Need for specialised IT virtualisation expert ', desc: 'GamesTek may need to hire an IT specialist or train existing stuff on hypervisor management. This can cause training costs or higher salary requirements for qualified IT staff.', positive: false },
                      ]
                    },
                    { 
                      title: 'Impact on Testers (Users)', 
                      color: 'purple',
                      items: [
                        { title: 'Flexibility to work remotely (even from home)', desc: 'With VDI and thick clients, testers can access their testing environments from home or anywhere with internet connection. This allows employees to save commuting time and work from home. This means employees can continue testing even when away from the office. It might encourage them to spend more hours on the project and feel more comfortable with their environment.', positive: true },
                        { title: 'Consistent Tools and Setup', desc: 'All testers receive identical pre-designed environments, this will help testers to follow the same testing requirements to reduce different opinions in the documentation reports. This means everyone will use the same versions of testing software and configurations, making sure the results are the same and reliable across the team.', positive: true },
                        { title: 'Learning & Adaptation Period', desc: 'New features and a new way to test the games might be frustrating for testers, because some of them might not know about it. How to connect to VMs, using thick clients, managing snapshots - there are many things to learn for the employees and it might temporarily drop productivity while learning the new system.', positive: false },
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
                            className={`border-l-4 ${item.positive ? 'border-green-400' : 'border-red-400'} pl-4`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ x: 5 }}
                          >
                            <p className="text-white font-semibold mb-1">{item.title}</p>
                            <p className="text-slate-300 text-sm">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 3.3 Evaluation (D1) */}
                <div id="d1" className="scroll-mt-8">
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
                      D1
                    </motion.span>
                    <h3 className="text-2xl font-bold text-white">Evaluation of Impact</h3>
                    <span className="ml-auto text-xs text-purple-400 font-mono">(D1)</span>
                  </motion.div>

                  <AnimatedParagraph className="text-slate-300 mb-6 leading-relaxed" delay={0.1}>
                     This section provides a critical judgement on whether virtualisation is the right solution for GamesTek by weighing the benefits against the drawbacks in relation to the company's aims.
                  </AnimatedParagraph>

                  {/* Business Infrastructure and Service Delivery Model */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-bold text-sky-400 mb-4">Business Infrastructure and Service Delivery Model</h4>
                    <div className="bg-sky-400/5 border border-sky-400/20 rounded-xl magic-card p-6 space-y-4">
                      <AnimatedParagraph className="text-slate-300 leading-relaxed" delay={0.1}>
                        GamesTek works from a central office where all the main servers will be kept. They need to set up a dedicated server room to store the Type 1 hypervisors and VDI infrastructure. This way, all 12 employees can either work in the office using thick clients or work from home by connecting remotely through the internet.
                      </AnimatedParagraph>
                      <div>
                        <p className="text-white font-semibold mb-2">How GamesTek delivers their services:</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          When testers finish testing, they write reports and store all documentation on the central servers. Then these files can be shared with Top-game-shack using secure file transfers. For <strong className="text-white">video calls</strong>, testers can use the VDI system to screen-share their virtual testing environments directly, so the client can see exactly what's happening during testing in real-time. When Top-game-shack sends new game builds, GamesTek downloads them to the central servers and then installs them on all testing VMs at once. This means all 12 testers get the same game version to test, making sure everyone tests identically.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Physical equipment GamesTek needs:</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          The server room needs good cooling systems because multiple VMs running at the same time can overheat the physical servers. Plus, they need Uninterruptible Power Supply (UPS) systems to protect against sudden power cuts that might corrupt testing data or damage the hardware. The office also needs high-speed internet with backup connections so testers can access VMs remotely and do video calls with Top-game-shack without any interruptions.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Legal, Ethical, and Licensing Considerations */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-bold text-amber-400 mb-4">Legal, Ethical, and Licensing Considerations</h4>
                    <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl magic-card p-6 space-y-4">
                      <div>
                        <p className="text-white font-semibold mb-2">Software Licensing</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          GamesTek needs to buy proper licenses for every single virtual machine they create. If they want to run Windows 10, Windows 11, and Linux on multiple VMs, they need to get volume licensing agreements with Microsoft. Here's the thing - each VM counts as a separate computer. So if GamesTek runs 20 Windows VMs, they need 20 valid licenses, not just one. They could use Microsoft Volume Licensing or Windows Server with Remote Desktop Services to stay legal. The same goes for testing software and performance monitoring tools - they all need licenses that allow virtualised environments. If GamesTek doesn't follow these rules, they could face <strong className="text-white">legal penalties</strong>, <strong className="text-white">lose the contract</strong> with Top-game-shack, or damage their reputation badly.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Data Security and Protecting Game Builds</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Top-game-shack's unreleased games are valuable property. GamesTek has a responsibility to keep them safe from hackers, leaks, or theft. The company needs strong security: <strong className="text-white">encrypted storage</strong> for all game builds and test data, <strong className="text-white">strong passwords</strong> (maybe even two-factor authentication) for accessing VMs, and <strong className="text-white">network firewalls</strong> to stop external attacks. All the data should be encrypted when it's stored on servers and also when it's being transferred to Top-game-shack. This way, even if someone tries to steal the data, they won't be able to read it.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">GDPR and Privacy Laws</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Because the games are for children, GamesTek needs to be extra careful about data protection. If any games collect user data during testing, this falls under <strong className="text-white">GDPR</strong> and children's privacy laws like <strong className="text-white">COPPA</strong>. GamesTek needs clear policies about what test data they collect, how long they keep it, who can access it, and how they delete it securely after the contract ends. Testers should be trained on privacy rules so they don't accidentally share sensitive information during video calls or in their reports.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Ethical Responsibilities</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Testing children's games means GamesTek has extra ethical duties. They should check that games have age-appropriate content and report any concerning stuff to Top-game-shack. The company also needs to make sure their own staff don't see inappropriate content while testing. Plus, GamesTek should have <strong className="text-white">confidentiality agreements</strong> with all employees so they can't talk about unreleased games outside work or post screenshots on social media. This protects both the client and GamesTek's professional reputation.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Keeping Records and Audits</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          GamesTek should keep detailed logs of who accessed which VMs, when tests happened, and what data was sent. These records help prove they followed all the contract rules and can be used as evidence if there's any disputes. Regular security checks of the virtualisation system make sure everything stays compliant with industry standards and client requirements.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Requirements not suited to virtualisation */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-bold text-purple-400 mb-4">Requirements That Cannot or Should Not Be Met Using Virtualisation</h4>
                    <div className="bg-purple-400/5 border border-purple-400/20 rounded-xl magic-card p-6 space-y-4">
                      <div>
                        <p className="text-white font-semibold mb-2">Final Performance Testing</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Virtualisation is great for finding bugs and testing if games work properly, but for the <strong className="text-white">final performance checks</strong>, GamesTek should use physical hardware instead. Here's why: even with hardware assistance, VMs add a tiny bit of extra processing that can affect FPS measurements and load times. The numbers might be slightly off from what real users will experience. So for the final sign-off reports to Top-game-shack, GamesTek should keep at least 2-3 physical computers with different hardware setups to double-check that the VM results are accurate. This way, Top-game-shack can trust the data for their final product release.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Heavy Graphics Testing</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Complex 3D graphics and GPU-heavy effects don't always work well in VMs, especially on older hypervisors or systems without GPU passthrough. If Top-game-shack's games use advanced graphics features, GamesTek might need physical hardware with proper graphics cards to test these parts. The company should talk with the client to figure out which tests need exact performance numbers and which ones can be done in VMs for functional testing.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Testing with Physical Devices</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          If games need to work with game controllers, VR headsets, or other special devices, these can't be fully virtualised. USB passthrough might help connect devices to VMs, but it can cause delays or compatibility problems. GamesTek should have some physical testing stations available for these situations.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Network and Multiplayer Testing</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Testing online multiplayer or network features shouldn't only use virtualised environments. Virtual networks inside a server don't accurately show real internet conditions like packet loss or lag that actual users will experience. GamesTek needs separate equipment to test these features under realistic network conditions so they can give accurate information about how the game performs online.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Backup Systems</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Though virtualisation makes backups easier, GamesTek shouldn't virtualise the backup systems themselves. Backup servers should run on completely separate physical hardware, ideally in a different location. If both the main servers and backup run on the same physical machine and that machine breaks, all the data could be lost forever. That's a huge risk.
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-2">Security and Passwords</p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          Important security stuff like encryption keys and master passwords shouldn't be stored only inside VMs. These should be kept on dedicated physical security hardware or separate secure systems. If a VM gets hacked, the attacker shouldn't be able to access everything. This adds an extra layer of protection.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  

                  {/* Final Judgement */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 }}
                  >
                    <h4 className="text-lg font-bold text-white mb-4">Final Judgement</h4>
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
                          After carefully analysing all the positive and negatives for the organisation, testers and technical impact, <motion.span className="text-sky-400 font-semibold" whileHover={{ textShadow: '0 0 10px rgba(56, 189, 248, 0.5)' }}>virtualisation is the most suitable solution for GamesTek</motion.span>. as it has more solid benefits rather than drawbacks. The company’s specific requirements such as testing across multiple hardware configurations, sharing environments between testers, and provide video calls - can be effectively achieved by implementing virtualisation into the test company.
                          </AnimatedParagraph>
                        <AnimatedParagraph className="text-slate-200 leading-relaxed mb-4" delay={0.2}>
                          There are some negative aspects too that GamesTek need to consider, such as initial setup, training for stuff, the need for a specialist in virtualisation and the risks working without network connection or losing data when the main server fails. These are points the team should carefully review and be aware of them. 
                        </AnimatedParagraph>
                        <AnimatedParagraph className="text-slate-300 leading-relaxed mb-4" delay={0.3}>
                          However, the positives are: the ability to test games across multiple hardware configurations efficiently, support remote work for employees, and scale operations quickly for future contracts. These features (flexibility, scalability, efficiency) will bring long-term benefits that will help GamesTek to deliver perfect testing results and increase the revenue in the future.
                        </AnimatedParagraph>
                        <AnimatedParagraph className="text-slate-300 leading-relaxed italic italic" delay={0.4}> The key to success is to implement virtualisation in the right way. While there are significant risks, the team can mitigate them through proper planning, backup systems, using robust network connectivity to minimise the likelihood of these issues arising. With this implementations, virtualisation will bring a positive impact for GamesTek company, meeting all the requirements from Top-game-shack and demand of their new contracts in the future.</AnimatedParagraph>
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
                    In conclusion, <strong className="text-white">the Managing Director shouldn't worry about whether GamesTek can meet all the Top-game-shack requirements - virtualisation makes it possible.</strong> I provided a comprehensive report that proves this statement. I explained what virtualisation is and how it works with hypervisor like Type 1 and Type 2. I compared different virtualisation technologies, including full virtualisation, hardware assistance, VDI and emulation to show which ones work best for GamesTek’s needs. I analysed how virtualisation affects the company in both positive and negative ways, and provided a clear solution for the GamesTek company - use virtualisation.
                  </AnimatedParagraph>
                </div>

                <motion.div 
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 }}
                >
                  <p className="text-slate-500 text-sm">
                    Unit 21 Assignment 1: Virtualisation. Made by Vira Saienko(713784) Level 3 BTEC Extended Diploma for City of Bristol College (2026)
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
