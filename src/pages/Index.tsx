import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/FadeIn';
import {
  ArrowRight, Zap, Code2, Search, Palette, Globe, Server, Shield,
  TrendingUp, Users, Award, Clock, CheckCircle2, Star, ArrowUpRight,
  Cpu, Database, Layers, GitBranch, ChevronDown, ChevronUp, Sparkles,
  MessageSquare, Rocket, BarChart3, Lock, Headphones, Play, ExternalLink,
  Workflow, Target, Eye, MousePointerClick, Smartphone, CircuitBoard
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════
   1. HERO — Cinematic, full-viewport
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-10 relative overflow-hidden">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <FadeIn className="flex flex-col items-center text-center max-w-6xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass border-primary/20 text-xs font-semibold text-primary mb-10 tracking-wider uppercase">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Digital Agency Node — Active
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-[-0.04em] leading-[0.85] mb-8">
          ENGINEERING<br />
          <span className="text-gradient">GLOBAL</span><span className="text-primary">.</span>DOMINANCE
        </h1>

        <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mb-12 leading-relaxed">
          From complete MERN architectures to algorithmic technical SEO, we build
          high-performance digital ecosystems that empower global entities.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Button asChild size="lg" className="px-10 h-13 text-base gap-3 group">
            <Link to="/packages">
              View Packages
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-10 h-13 text-base gap-3 border-border/60 hover:border-primary/50">
            <Link to="/estimator">
              <Sparkles size={16} />
              Calculate Custom Quote
            </Link>
          </Button>
        </div>

        {/* Mini trust indicators */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-primary" /> ISO 27001</span>
          <span className="w-px h-3 bg-border" />
          <span className="flex items-center gap-1.5"><Shield size={12} className="text-primary" /> SOC 2 Ready</span>
          <span className="w-px h-3 bg-border" />
          <span className="flex items-center gap-1.5"><Globe size={12} className="text-primary" /> 3 Global Nodes</span>
        </div>
      </FadeIn>

      <div className="absolute bottom-8 animate-bounce text-muted-foreground/30">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   2. ANIMATED COUNTER + STATS
   ═══════════════════════════════════════════════════ */
function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const trigger = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for a snappy feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start, hasStarted]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger(); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return { count, ref };
}

function AnimatedStat({ numericValue, suffix, prefix, label, icon: Icon, delay, border }: {
  numericValue: number; suffix: string; prefix: string; label: string; icon: typeof Rocket; delay: number; border: boolean;
}) {
  const { count, ref } = useCountUp(numericValue, 2200);
  return (
    <FadeIn delay={delay}>
      <div ref={ref} className={`flex items-center gap-4 p-6 ${border ? 'lg:border-r border-border/30' : ''}`}>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon size={20} className="text-primary" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-foreground tracking-tight tabular-nums">
            {prefix}{count.toLocaleString()}{suffix}
          </div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    </FadeIn>
  );
}

const stats = [
  { numericValue: 150, suffix: '+', prefix: '', label: 'Deployments', icon: Rocket },
  { numericValue: 50, suffix: '+', prefix: '', label: 'Global Clients', icon: Globe },
  { numericValue: 98, suffix: '%', prefix: '', label: 'Satisfaction', icon: Award },
  { numericValue: 99, suffix: '.9%', prefix: '', label: 'Uptime SLA', icon: Shield },
];

function StatsSection() {
  return (
    <section className="py-6 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="glass-strong rounded-2xl p-2">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <AnimatedStat
                key={s.label}
                {...s}
                delay={i * 80}
                border={i < stats.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   3. TRUSTED BY — Marquee-style logos
   ═══════════════════════════════════════════════════ */
const clients = ['ThemesJet', 'HostOrient', 'CloudNova', 'DataPulse', 'NexaBuild', 'CyberVault'];

function TrustedBySection() {
  return (
    <section className="py-20 px-4">
      <FadeIn className="container mx-auto max-w-5xl text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 mb-12">Trusted by Forward-Thinking Teams</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {clients.map((c, i) => (
            <FadeIn key={c} delay={i * 60}>
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-muted-foreground/15 hover:text-primary/40 transition-colors duration-500 cursor-default select-none">{c}</span>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   4. SERVICES — Bento grid layout
   ═══════════════════════════════════════════════════ */
const services = [
  { icon: Code2, title: 'Full-Stack Development', desc: 'Custom MERN applications with scalable architecture, clean code, and production-grade reliability.', accent: true },
  { icon: Search, title: 'Technical SEO', desc: 'Algorithmic optimization, schema markup, and content architecture for search dominance.', accent: false },
  { icon: Palette, title: 'UI/UX Engineering', desc: 'Conversion-focused interfaces with meticulous typography, motion, and user psychology.', accent: false },
  { icon: Server, title: 'Cloud & DevOps', desc: 'AWS, Docker, and CI/CD pipelines for zero-downtime deployments and auto-scaling.', accent: true },
  { icon: Shield, title: 'Security Hardening', desc: 'Penetration testing, vulnerability assessments, and enterprise-grade security protocols.', accent: false },
  { icon: BarChart3, title: 'Growth Analytics', desc: 'Custom dashboards, funnel optimization, A/B testing, and data-driven strategies.', accent: false },
];

function ServicesSection() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Capabilities</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em]">Core<br className="hidden sm:block" /> Services</h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed lg:text-right">
            End-to-end digital engineering across every layer of the modern technology stack.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 80} className={`rounded-2xl p-8 flex flex-col group transition-all duration-500 hover:-translate-y-1 cursor-default ${
              s.accent
                ? 'glass-strong border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.2)]'
                : 'glass hover:border-border/80 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.1)]'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                s.accent ? 'bg-primary/15 group-hover:bg-primary/25' : 'bg-secondary/60 group-hover:bg-primary/10'
              }`}>
                <s.icon size={24} className={s.accent ? 'text-primary' : 'text-muted-foreground group-hover:text-primary transition-colors'} />
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={12} />
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/services">Explore All Services <ArrowRight size={16} /></Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   5. PROCESS — Timeline with connecting line
   ═══════════════════════════════════════════════════ */
const process = [
  { step: '01', title: 'Discovery & Audit', desc: 'Deep analysis of goals, audience, and competitive landscape.', icon: Target },
  { step: '02', title: 'System Architecture', desc: 'Wireframes, tech specs, and infrastructure blueprints.', icon: Layers },
  { step: '03', title: 'Agile Engineering', desc: 'Sprint-based development with weekly demos and iteration.', icon: Code2 },
  { step: '04', title: 'Launch & Scale', desc: 'Production deployment, monitoring, and growth optimization.', icon: Rocket },
];

function ProcessSection() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Protocol</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] mb-4">How We Build</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">A battle-tested 4-phase workflow that eliminates guesswork.</p>
        </FadeIn>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <FadeIn key={p.step} delay={i * 150} className="relative">
                <div className="glass rounded-2xl p-8 text-center h-full hover:border-primary/30 transition-all duration-500 group hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.15)]">
                  <span className="text-6xl font-black text-primary/8 block mb-2 select-none">{p.step}</span>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors relative">
                    <p.icon size={22} className="text-primary" />
                    <div className="absolute inset-0 rounded-full border border-primary/20 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   6. FEATURED PROJECTS — Large showcase cards
   ═══════════════════════════════════════════════════ */
const projects = [
  {
    badge: 'E-Commerce Architecture',
    title: 'ThemesJet Platform',
    desc: 'High-performance marketplace serving 12,000+ active users with headless CMS, Stripe integration, and real-time inventory management.',
    tags: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
    metric: '+340%',
    metricLabel: 'Revenue Growth',
  },
  {
    badge: 'Infrastructure & SEO',
    title: 'HostOrient Digital',
    desc: 'Complete digital transformation delivering massive organic growth through algorithmic SEO restructuring and SSR migration.',
    tags: ['Next.js', 'SEO', 'AWS', 'MongoDB'],
    metric: '+250%',
    metricLabel: 'Organic Traffic',
  },
];

function FeaturedProjectsSection() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Portfolio</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em]">Live<br className="hidden sm:block" /> Deployments</h2>
          </div>
          <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
            <Link to="/portfolio">View all projects <ArrowUpRight size={14} /></Link>
          </Button>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 150} className="glass-strong rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.15)]">
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 via-card to-card relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={24} className="text-primary ml-1" />
                </div>
                <div className="absolute top-5 right-5 glass rounded-xl px-4 py-2.5 text-right">
                  <span className="text-2xl font-black text-primary block leading-none">{p.metric}</span>
                  <span className="text-[10px] text-muted-foreground">{p.metricLabel}</span>
                </div>
              </div>
              <div className="p-8">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em]">{p.badge}</span>
                <h3 className="text-2xl font-bold mt-2 mb-3 tracking-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map(t => <span key={t} className="text-[11px] px-3 py-1.5 rounded-lg bg-secondary/70 text-secondary-foreground font-medium">{t}</span>)}
                </div>
                <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium group/link">
                  View Case Study <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   7. PACKAGES PREVIEW — Clean pricing strip
   ═══════════════════════════════════════════════════ */
const pkgPreview = [
  { title: 'Technical SEO Audit', price: '$499', period: 'one-time', features: ['Core Web Vitals', 'Schema Markup', 'Crawl Analysis'], highlighted: false, icon: Search },
  { title: 'MERN MVP Build', price: '$2,499', period: 'one-time', features: ['Custom React UI', 'Auth & API', 'Database Design'], highlighted: true, icon: Code2 },
  { title: 'Agency Retainer', price: '$3,999', period: '/month', features: ['Dedicated Dev', 'Priority Queue', 'Strategy Calls'], highlighted: false, icon: Users },
];

function PackagesPreviewSection() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Investment</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] mb-4">Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">No hidden fees. Enterprise-grade deliverables at every tier.</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-4">
          {pkgPreview.map((pkg, i) => (
            <FadeIn key={pkg.title} delay={i * 120} className={`rounded-2xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
              pkg.highlighted
                ? 'glass-strong border-primary/40 ring-1 ring-primary/15 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.25)] relative'
                : 'glass hover:border-border/80 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.1)]'
            }`}>
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground px-4 py-1 rounded-full">Most Popular</span>
              )}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <pkg.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-1">{pkg.title}</h3>
              <div className="mb-6">
                <span className="text-3xl font-black text-primary">{pkg.price}</span>
                <span className="text-muted-foreground text-sm ml-1">{pkg.period}</span>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={pkg.highlighted ? 'default' : 'outline'} className="w-full gap-2">
                <Link to="/packages">View Details <ArrowRight size={14} /></Link>
              </Button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   8. TESTIMONIALS — Stacked glass cards
   ═══════════════════════════════════════════════════ */
const testimonials = [
  { name: 'Sarah Chen', role: 'CTO, CloudNova', text: 'Injaazh delivered our entire platform in 6 weeks. The code quality was exceptional — traffic increased 180% within the first month.', stars: 5 },
  { name: 'James Morrison', role: 'Founder, DataPulse', text: 'Their technical SEO audit uncovered issues three agencies missed. Within 90 days, we moved from page 3 to position 2 for our primary keywords.', stars: 5 },
  { name: 'Anika Rahman', role: 'Director, NexaBuild', text: 'Having a dedicated senior dev who understands our codebase has accelerated release cycles by 3x. Absolutely worth every penny.', stars: 5 },
];

function TestimonialsSection() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Social Proof</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] mb-4">Client Signals</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 120} className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.1)] flex flex-col">
              <div className="flex gap-1 mb-5">
                {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} className="text-primary fill-primary" />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-border/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   9. TECH STACK — Minimal icon grid
   ═══════════════════════════════════════════════════ */
const techStack = [
  { icon: Code2, name: 'React' }, { icon: Server, name: 'Node.js' }, { icon: Database, name: 'MongoDB' },
  { icon: Database, name: 'PostgreSQL' }, { icon: Globe, name: 'Next.js' }, { icon: GitBranch, name: 'Git' },
  { icon: Cpu, name: 'Docker' }, { icon: Shield, name: 'AWS' }, { icon: Layers, name: 'TypeScript' },
  { icon: Lock, name: 'Auth0' }, { icon: CircuitBoard, name: 'Redis' }, { icon: Sparkles, name: 'Three.js' },
];

function TechStackSection() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        <FadeIn className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Infrastructure</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">Our Arsenal</h2>
        </FadeIn>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {techStack.map((t, i) => (
            <FadeIn key={t.name} delay={i * 40} className="glass rounded-xl p-5 text-center group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.2)]">
              <t.icon size={22} className="mx-auto mb-2.5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
              <span className="text-[11px] font-medium text-muted-foreground/60 group-hover:text-foreground transition-colors">{t.name}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   10. CEO / LEADERSHIP — Editorial layout
   ═══════════════════════════════════════════════════ */
function LeadershipSection() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        <FadeIn className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Leadership</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em]">Vision & Command</h2>
        </FadeIn>

        <FadeIn delay={200} className="glass-strong rounded-3xl p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-10">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-5xl font-black text-primary-foreground shrink-0 shadow-[0_20px_40px_-10px_hsl(var(--primary)/0.3)]">
              M
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Md Mamun Hossain</h3>
              <p className="text-sm text-primary mb-5 font-medium">CEO & Founder, Injaazh Pvt. Ltd.</p>
              <blockquote className="text-muted-foreground text-base leading-relaxed italic border-l-2 border-primary/30 pl-5">
                "We engineer solutions that don't just look good, but perform relentlessly under pressure. From robust code to dominating algorithmic structures, precision is our standard."
              </blockquote>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   11. FAQ — Clean accordion
   ═══════════════════════════════════════════════════ */
const faqs = [
  { q: 'What technologies do you specialize in?', a: 'Our core stack is MERN (MongoDB, Express, React, Node.js) with TypeScript, plus Next.js, PostgreSQL, AWS, Docker, and modern headless CMS platforms.' },
  { q: 'How long does a typical MVP take?', a: 'A standard MVP build takes 4-8 weeks depending on complexity. We use agile sprints with weekly demos so you see progress from day one.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Absolutely. Our Agency Retainer plan includes a dedicated lead developer, priority task queue, weekly strategy calls, and 24/7 emergency support.' },
  { q: 'What makes Injaazh different from other agencies?', a: 'We combine deep engineering expertise with algorithmic SEO knowledge. Most agencies do one or the other — we architect systems that both perform technically and dominate search rankings.' },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-2xl">
        <FadeIn className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">Support</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] mb-4">Common Queries</h2>
        </FadeIn>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 60}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full rounded-xl p-6 text-left transition-all duration-300 ${
                  openIndex === i ? 'glass-strong border-primary/30' : 'glass hover:border-border/80'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    openIndex === i ? 'bg-primary/15 text-primary' : 'bg-secondary/50 text-muted-foreground'
                  }`}>
                    {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
                {openIndex === i && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4 pr-12">{faq.a}</p>
                )}
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   12. CTA — Full-width glass panel
   ═══════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-28 px-4">
      <FadeIn className="container mx-auto max-w-5xl">
        <div className="glass-strong rounded-3xl p-12 sm:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-8">
              <Rocket size={28} className="text-primary" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] mb-5">Ready to Dominate?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-base leading-relaxed">
              Let's architect your next digital ecosystem. Get a custom quote in under 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-10 h-13 text-base gap-3 group">
                <Link to="/estimator">
                  Get Your Estimate
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-10 h-13 text-base gap-2 border-border/60 hover:border-primary/50">
                <Link to="/contact">
                  <MessageSquare size={16} /> Talk to Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <TrustedBySection />
      <ServicesSection />
      <ProcessSection />
      <FeaturedProjectsSection />
      <PackagesPreviewSection />
      <TestimonialsSection />
      <TechStackSection />
      <LeadershipSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
