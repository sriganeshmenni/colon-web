import React, { useEffect, useRef } from 'react';
import { 
  Terminal, Play, Cpu, 
  Download, ChevronRight, Monitor, Apple, MonitorSmartphone,
  Zap, Shield, FileCode2, Video
} from 'lucide-react';

// --- Data (Adapted from your provided content) ---
const featureBlocks = [
  { icon: <Video className="w-6 h-6 text-teal-400" />, title: 'Code-to-Animation Engine', text: 'Converts real source code into a precise execution storyboard. Variables, branches, and loops are animated in sync.' },
  { icon: <Cpu className="w-6 h-6 text-amber-400" />, title: 'Local Compiler Hub', text: 'Detects installed toolchains and installs missing compilers inside the IDE. Students never leave the app to download GCC, Rust, or Node.' },
  { icon: <Zap className="w-6 h-6 text-purple-400" />, title: 'Execution Timeline', text: 'Follow state changes across time with a visual timeline that highlights current line, value deltas, and stack depth.' },
  { icon: <Film className="w-6 h-6 text-pink-400" />, title: 'Manim Studio Pipeline', text: 'LLM prompts generate Manim scenes that adhere to pacing rules, producing cinematic MP4 renders every rerun.' },
  { icon: <Terminal className="w-6 h-6 text-green-400" />, title: 'IDE-Native Terminal', text: 'Run programs inside the integrated terminal, capture stdout and stderr, and see logs appear beside the animation timeline.' },
  { icon: <Shield className="w-6 h-6 text-blue-400" />, title: 'Offline-Ready Architecture', text: 'All compilation and rendering happens locally. Classrooms can run Colon offline while still delivering instant animations.' },
];

const workflows = [
  { step: '01', title: 'Write', detail: 'Open a project, code in the Monaco editor. Colon tracks tabs and context automatically.' },
  { step: '02', title: 'Run', detail: 'Execute locally. Capture output in the terminal panel while errors remain visible.' },
  { step: '03', title: 'Analyze', detail: 'Generate the Manim scene, validate for safety, and stream rendering progress.' },
  { step: '04', title: 'Learn', detail: 'Watch step-by-step animations tied to your exact code, with synchronized variable overlays.' },
];

const downloads = [
  { os: 'Windows', icon: <Monitor className="w-8 h-8" />, tag: 'Win 11 / 10', action: 'Download .exe', platform: 'windows' },
  { os: 'macOS', icon: <Apple className="w-8 h-8" />, tag: 'Apple Silicon + Intel', action: 'Download .dmg', platform: 'mac' },
  { os: 'Linux', icon: <MonitorSmartphone className="w-8 h-8" />, tag: 'Ubuntu / Fedora', action: 'Download .AppImage', platform: 'linux' },
];

function Film(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}

// --- Faux 3D Node Network Canvas (Lusion Inspired) ---
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    const numParticles = 100;
    
    // Virtual 3D space camera
    const fov = 250;
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, z: 0 };
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      color: string;

      constructor() {
        this.x = (Math.random() - 0.5) * window.innerWidth * 2;
        this.y = (Math.random() - 0.5) * window.innerHeight * 2;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.vz = (Math.random() - 0.5) * 2;
        this.color = Math.random() > 0.5 ? '#2ee6d6' : '#ff9e2c'; // Teal & Amber
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.z < 0) this.z = 1000;
        if (this.z > 1000) this.z = 0;
        
        // Gentle rotation around center
        const angle = 0.001;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const nx = this.x * cos - this.z * sin;
        const nz = this.z * cos + this.x * sin;
        this.x = nx;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.z < 0 || !canvas) return;
        const scale = fov / (fov + this.z);
        const x2d = (this.x * scale) + canvas.width / 2;
        const y2d = (this.y * scale) + canvas.height / 2;
        
        const size = Math.max(0.5, 3 * scale);
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Connect to mouse if close
        const dx = x2d - mouse.x;
        const dy = y2d - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(46, 230, 214, ${1 - dist/150})`;
          ctx.lineWidth = scale;
          ctx.stroke();
        }
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) particles.push(new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 15, 25, 0.3)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        
        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < 150) {
            const scaleI = fov / (fov + particles[i].z);
            const scaleJ = fov / (fov + particles[j].z);
            const xi = (particles[i].x * scaleI) + canvas.width / 2;
            const yi = (particles[i].y * scaleI) + canvas.height / 2;
            const xj = (particles[j].x * scaleJ) + canvas.width / 2;
            const yj = (particles[j].y * scaleJ) + canvas.height / 2;

            ctx.beginPath();
            ctx.moveTo(xi, yi);
            ctx.lineTo(xj, yj);
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.15 * (1 - dist/150)})`;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

// --- CSS 3D Floating IDE Mockup ---
const FloatingIDE = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto perspective-1000 mt-16 md:mt-0 z-10 group cursor-pointer">
      {/* Glow behind the IDE */}
      <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full group-hover:bg-teal-400/30 transition-all duration-700"></div>
      
      <div className="relative w-full rounded-xl border border-slate-700/50 bg-[#0d1117]/90 backdrop-blur-xl shadow-2xl transform-3d rotate-ide transition-transform duration-700 overflow-hidden flex flex-col h-[500px]">
        {/* IDE Title Bar */}
        <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-slate-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 text-center text-xs text-slate-400 font-mono">Colon IDE - sort.py</div>
        </div>

        {/* IDE Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-slate-800 bg-[#0d1117] p-4 hidden md:block">
            <div className="text-xs font-bold text-slate-500 tracking-wider mb-4">EXPLORER</div>
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-2 cursor-pointer hover:text-teal-400">
              <ChevronRight className="w-4 h-4" /> src
            </div>
            <div className="flex items-center gap-2 text-sm text-teal-400 ml-4 mb-2">
              <FileCode2 className="w-4 h-4" /> sort.py
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 ml-4">
              <FileCode2 className="w-4 h-4" /> main.js
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex flex-col border-r border-slate-800 bg-[#0a0c10]">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-slate-800 bg-[#161b22] text-sm">
              <span className="text-teal-400 border-b-2 border-teal-400 pb-1">sort.py</span>
              <span className="text-slate-500 pb-1">main.js</span>
            </div>
            <div className="p-4 font-mono text-sm leading-relaxed flex-1 text-slate-300">
              <div className="flex"><span className="text-slate-600 w-8">1</span> &nbsp;<span className="text-pink-400">def</span>&nbsp;<span className="text-blue-400">bubble_sort</span>(arr):</div>
              <div className="flex"><span className="text-slate-600 w-8">2</span> &nbsp;&nbsp;&nbsp;&nbsp;n = <span className="text-teal-400">len</span>(arr)</div>
              <div className="flex"><span className="text-slate-600 w-8">3</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> i <span className="text-pink-400">in</span> <span className="text-teal-400">range</span>(n):</div>
              <div className="flex bg-teal-500/10"><span className="text-slate-600 w-8">4</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> j <span className="text-pink-400">in</span> <span className="text-teal-400">range</span>(0, n-i-<span className="text-orange-400">1</span>):</div>
              <div className="flex"><span className="text-slate-600 w-8">5</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">if</span> arr[j] &gt; arr[j+<span className="text-orange-400">1</span>]:</div>
              <div className="flex"><span className="text-slate-600 w-8">6</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+<span className="text-orange-400">1</span>] = arr[j+<span className="text-orange-400">1</span>], arr[j]</div>
              <div className="flex"><span className="text-slate-600 w-8">7</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> arr</div>
            </div>
          </div>

          {/* Animation Player Panel */}
          <div className="w-80 bg-[#0d1117] flex-col hidden lg:flex relative overflow-hidden">
             {/* Fake 3D Elements rendering in Manim Panel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-teal-500/30 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
               <div className="w-32 h-32 border border-amber-500/40 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
            </div>
            
            <div className="p-3 border-b border-slate-800 text-xs font-bold text-slate-500 tracking-wider flex justify-between items-center bg-[#161b22] z-10">
              <span>MANIM RENDER</span>
              <span className="text-teal-400 flex items-center gap-1"><Zap className="w-3 h-3"/> Live</span>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center relative z-10">
              {/* Visualization Array Mockup */}
              <div className="flex items-end gap-2 h-32 mt-auto">
                <div className="w-6 bg-slate-700 h-16 rounded-t-sm"></div>
                <div className="w-6 bg-teal-500 h-24 rounded-t-sm shadow-[0_0_15px_rgba(46,230,214,0.5)]"></div>
                <div className="w-6 bg-amber-500 h-12 rounded-t-sm shadow-[0_0_15px_rgba(255,158,44,0.5)]"></div>
                <div className="w-6 bg-slate-700 h-32 rounded-t-sm"></div>
                <div className="w-6 bg-slate-700 h-8 rounded-t-sm"></div>
              </div>
              <div className="mt-8 text-center bg-slate-800/80 px-4 py-2 rounded-lg backdrop-blur-md border border-slate-700 text-sm">
                Swapping <span className="text-teal-400">arr[j]</span> and <span className="text-amber-400">arr[j+1]</span>
              </div>
            </div>
            {/* Player Controls */}
            <div className="p-4 border-t border-slate-800 flex justify-center gap-4 bg-[#161b22] z-10">
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"><Play className="w-4 h-4 fill-current"/></div>
               <div className="flex-1 h-1 bg-slate-800 rounded-full my-auto overflow-hidden">
                 <div className="w-1/3 h-full bg-teal-500 rounded-full shadow-[0_0_10px_rgba(46,230,214,0.8)]"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="h-32 bg-[#0a0c10] border-t border-slate-800 p-4 font-mono text-sm">
        <div className="text-slate-500 mb-1">TERMINAL</div>
        <div className="text-green-400">~/project $ <span className="text-slate-300">colon run sort.py --visualize</span></div>
        <div className="text-slate-400 mt-1">[Info] Compiling with local Python 3.10...</div>
        <div className="text-teal-400">[Success] AST generated. Streaming Manim scene...</div>
      </div>
    </div>
  </div>
  );
};

// --- Main App Component ---
export default function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleDownload = (platform) => {
    window.open(`${backendUrl}/download/${platform}`);
  };

  return (
    <>
      {/* All required custom CSS for this design is embedded here 
        to prevent conflicts and ensure a clean, single-file setup.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          background: radial-gradient(1200px 600px at 20% 10%, rgba(46, 230, 214, 0.08), transparent 60%),
                      radial-gradient(800px 600px at 80% 0%, rgba(255, 107, 74, 0.12), transparent 55%),
                      linear-gradient(180deg, #070b13 0%, #0f1524 60%, #101a33 100%);
          color: #f5f7ff;
          font-family: 'Inter', sans-serif;
          margin: 0;
          min-height: 100vh;
        }

        html { scroll-behavior: smooth; }

        .perspective-1000 { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        .rotate-ide { transform: rotateX(8deg) rotateY(-12deg) rotateZ(2deg); }
        .group:hover .rotate-ide { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        
        .glass-panel {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .glass-nav {
          background: rgba(10, 15, 25, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .text-gradient-accent {
          background: linear-gradient(135deg, #2ee6d6 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glow-hover:hover {
          box-shadow: 0 0 30px rgba(46, 230, 214, 0.2);
          border-color: rgba(46, 230, 214, 0.4);
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0f19; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
        ::selection { background: rgba(46, 230, 214, 0.3); }
      `}</style>

      <div className="min-h-screen text-slate-200 font-sans overflow-x-hidden">
        <ParticleNetwork />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(46,230,214,0.4)]">
                :
              </div>
              <span className="font-bold text-xl tracking-wide">COLON</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
              <a href="#downloads" className="hover:text-white transition-colors">Download</a>
              <a href="#docs" className="hover:text-white transition-colors">Docs</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                GitHub
              </button>
              <a href="#downloads" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 border border-white/10 backdrop-blur-md flex items-center gap-2">
                <Download className="w-4 h-4" /> Get Colon
              </a>
            </div>
          </div>
        </nav>

        <main className="relative z-10 pt-32 pb-20">
          
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                AI-Powered Desktop IDE
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                Watch code come alive in <br />
                <span className="text-gradient-accent">cinematic 3D.</span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Colon turns real code into interactive visual narratives. Run, analyze, and render step-by-step animations with local compilers, blazing speed, and zero setup. See exactly why your code behaves the way it does.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a href="#downloads" className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(46,230,214,0.3)] transition-all hover:-translate-y-1 flex items-center gap-3">
                  <Monitor className="w-5 h-5" /> Download for Windows
                </a>
                <button className="glass-panel hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-white transition-all flex items-center gap-2">
                  View Documentation
                </button>
              </div>
            </div>

            {/* 3D IDE Mockup */}
            <FloatingIDE />
          </section>

          {/* Features Section */}
          <section id="features" className="max-w-7xl mx-auto px-6 py-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See Algorithms, Not Just Text</h2>
              <p className="text-slate-400 text-lg">Everything learners need to understand execution context, locally powered by modern LLMs and Manim rendering.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureBlocks.map((feature, i) => (
                <div key={i} className="glass-panel p-8 rounded-2xl glow-hover transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow Section */}
          <section id="workflow" className="border-y border-slate-800/50 bg-[#0d1117]/50 backdrop-blur-xl py-32 relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">A Predictable Execution Loop</h2>
                <p className="text-slate-400 text-lg">Four steps that keep students in context without ever leaving the application window.</p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {workflows.map((wf, i) => (
                  <div key={i} className="relative group">
                    <div className="text-7xl font-black text-slate-800/50 absolute -top-8 -left-4 -z-10 group-hover:text-teal-500/20 transition-colors">
                      {wf.step}
                    </div>
                    <div className="glass-panel p-8 rounded-2xl h-full border-t border-white/10 hover:border-teal-500/50 transition-colors bg-gradient-to-b from-white/[0.02] to-transparent">
                      <h3 className="text-2xl font-bold mb-4 text-white">{wf.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{wf.detail}</p>
                    </div>
                    {/* Arrow connector for desktop */}
                    {i < workflows.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-6 text-slate-600">
                        <ChevronRight className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Downloads Section */}
          <section id="downloads" className="py-20 px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Animate Your Code?</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Download the Colon prototype for your operating system. It's free, open-source, and runs completely offline.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {downloads.map((item) => (
                <div key={item.os} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center hover:border-teal-500 transition-colors glow-hover">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white mt-4">{item.os}</h3>
                  <p className="text-slate-400 text-sm mb-4">{item.tag}</p>
                  <button 
                    onClick={() => handleDownload(item.platform)}
                    className="text-teal-400 font-semibold hover:text-teal-300"
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 bg-[#0a0f19] relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-teal-500 flex items-center justify-center font-bold text-slate-900 text-xs">
                  :
                </div>
                <span className="font-bold text-lg">Colon</span>
                <span className="text-slate-500">| AI-Powered Code Animation Studio</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
                <a href="#" className="hover:text-teal-400 transition-colors">GitHub</a>
                <a href="#" className="hover:text-teal-400 transition-colors">Documentation</a>
                <a href="#" className="hover:text-teal-400 transition-colors">Educator Playbooks</a>
                <a href="#" className="hover:text-teal-400 transition-colors">Enterprise</a>
                <a href="mailto:mennisriganesh@gmail.com" className="hover:text-teal-400 transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-800/50 text-center text-sm text-slate-600 flex flex-col items-center gap-2">
              <p>© {new Date().getFullYear()} Colon Project. Open Source.</p>
              <p>Designed for learning environments and offline-first classrooms.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}