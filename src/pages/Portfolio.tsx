import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, ExternalLink, Code2, Globe, ArrowRight, Layers, Users, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  client: string;
  tech: string[];
  desc: string;
  category: string;
  metric: string;
}

interface CountryData {
  name: string;
  code: string;
  flag: string;
  x: number;
  y: number;
  projects: Project[];
}

const countries: CountryData[] = [
  {
    name: 'Bangladesh', code: 'BD', flag: '🇧🇩', x: 72.5, y: 42,
    projects: [
      { title: 'ThemesJet Marketplace', client: 'ThemesJet Ltd.', tech: ['React', 'Node.js', 'Stripe', 'PostgreSQL'], desc: 'Premium theme marketplace with 12K+ users, headless CMS & license management.', category: 'E-Commerce', metric: '12K+ Users' },
      { title: 'EduConnect LMS', client: 'EduBangla', tech: ['Next.js', 'MongoDB', 'WebRTC', 'Redis'], desc: 'Live-class enabled learning platform serving 45K+ students with real-time assessments.', category: 'EdTech', metric: '45K+ Students' },
    ],
  },
  {
    name: 'UAE', code: 'AE', flag: '🇦🇪', x: 59, y: 40,
    projects: [
      { title: 'HostOrient Dashboard', client: 'HostOrient FZCO', tech: ['Next.js', 'AWS', 'Grafana', 'MongoDB'], desc: 'Infrastructure monitoring with +250% organic traffic growth via SEO overhaul.', category: 'SaaS', metric: '+250% Traffic' },
      { title: 'LuxeRent Platform', client: 'Dubai Luxury Motors', tech: ['React', 'Stripe', 'Supabase', 'Mapbox'], desc: 'Premium vehicle rental platform with dynamic pricing and GPS fleet tracking.', category: 'Marketplace', metric: '500+ Vehicles' },
    ],
  },
  {
    name: 'United Kingdom', code: 'GB', flag: '🇬🇧', x: 47, y: 22,
    projects: [
      { title: 'FinTrack Analytics', client: 'Meridian Capital', tech: ['React', 'Python', 'D3.js', 'PostgreSQL'], desc: 'Real-time financial analytics dashboard processing £2M+ daily transactions.', category: 'FinTech', metric: '£2M+ Daily' },
    ],
  },
  {
    name: 'United States', code: 'US', flag: '🇺🇸', x: 22, y: 32,
    projects: [
      { title: 'CloudSync SaaS', client: 'SyncWave Inc.', tech: ['React', 'Go', 'gRPC', 'Kubernetes'], desc: 'Multi-tenant cloud sync platform with 99.99% uptime serving 8K+ enterprises.', category: 'SaaS', metric: '8K+ Clients' },
      { title: 'MediBook Health', client: 'HealthFirst USA', tech: ['Next.js', 'FHIR', 'PostgreSQL', 'Docker'], desc: 'HIPAA-compliant telemedicine portal with appointment scheduling for 200+ clinics.', category: 'HealthTech', metric: '200+ Clinics' },
    ],
  },
  {
    name: 'Canada', code: 'CA', flag: '🇨🇦', x: 18, y: 20,
    projects: [
      { title: 'GreenHarvest App', client: 'AgriNorth Co.', tech: ['React Native', 'Node.js', 'IoT', 'AWS'], desc: 'Smart agriculture app with IoT sensor integration for 500+ farms.', category: 'AgriTech', metric: '500+ Farms' },
    ],
  },
  {
    name: 'Germany', code: 'DE', flag: '🇩🇪', x: 50, y: 24,
    projects: [
      { title: 'AutoParts Hub', client: 'Berliner Automotive', tech: ['React', 'ElasticSearch', 'Node.js', 'Redis'], desc: 'B2B automotive parts marketplace with AI-driven search across 2M+ SKUs.', category: 'E-Commerce', metric: '2M+ SKUs' },
    ],
  },
  {
    name: 'Japan', code: 'JP', flag: '🇯🇵', x: 86, y: 32,
    projects: [
      { title: 'PixelForge Studio', client: 'Tokyo Creative Labs', tech: ['Three.js', 'React', 'WebGL', 'GSAP'], desc: 'Interactive 3D product configurator with AR preview for furniture brand.', category: 'Creative Tech', metric: '50K+ Views' },
    ],
  },
  {
    name: 'Singapore', code: 'SG', flag: '🇸🇬', x: 77, y: 52,
    projects: [
      { title: 'PayFlow Gateway', client: 'FinAsia Pte.', tech: ['Node.js', 'Kafka', 'PostgreSQL', 'Docker'], desc: 'Payment orchestration layer processing $5M+ monthly across SE Asia.', category: 'FinTech', metric: '$5M+ Monthly' },
    ],
  },
  {
    name: 'Australia', code: 'AU', flag: '🇦🇺', x: 84, y: 68,
    projects: [
      { title: 'PropView 360', client: 'RealtyTech AU', tech: ['React', 'Three.js', 'Node.js', 'S3'], desc: 'Virtual property tours platform with 360° imagery for 300+ listings.', category: 'PropTech', metric: '300+ Listings' },
    ],
  },
  {
    name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', x: 56, y: 38,
    projects: [
      { title: 'HajjGuide Digital', client: 'Riyadh Tech Ministry', tech: ['React Native', 'Firebase', 'Maps SDK', 'i18n'], desc: 'Multi-lingual pilgrimage navigation app with offline-first architecture.', category: 'GovTech', metric: '1M+ Downloads' },
    ],
  },
  {
    name: 'India', code: 'IN', flag: '🇮🇳', x: 67, y: 42,
    projects: [
      { title: 'QuickCart Delivery', client: 'SpeedKart Logistics', tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'], desc: 'Last-mile delivery platform with real-time driver tracking & route optimization.', category: 'Logistics', metric: '10K+ Deliveries/day' },
    ],
  },
  {
    name: 'Nigeria', code: 'NG', flag: '🇳🇬', x: 48, y: 50,
    projects: [
      { title: 'LearnAfrica Hub', client: 'EduAfrica Foundation', tech: ['Next.js', 'Supabase', 'Cloudflare', 'PWA'], desc: 'Offline-capable education platform reaching 20K+ students in low-connectivity areas.', category: 'EdTech', metric: '20K+ Students' },
    ],
  },
  {
    name: 'Brazil', code: 'BR', flag: '🇧🇷', x: 30, y: 58,
    projects: [
      { title: 'EventosPro', client: 'São Paulo Events Co.', tech: ['React', 'Stripe', 'Node.js', 'PostgreSQL'], desc: 'Event management & ticketing SaaS with QR check-in for 150+ venues.', category: 'Events', metric: '150+ Venues' },
    ],
  },
];

// Detailed SVG world map
function WorldMapSVG({ activeCountry, onHover, onClick }: {
  activeCountry: string | null;
  onHover: (code: string | null) => void;
  onClick: (code: string) => void;
}) {
  return (
    <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(217 91% 60% / 0.06)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="markerGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="continentShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="hsl(217 91% 60%)" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Background glow */}
      <rect width="1000" height="500" fill="url(#mapGlow)" />

      {/* Latitude/longitude grid */}
      {Array.from({ length: 17 }, (_, i) => (
        <line key={`lat${i}`} x1="0" y1={i * 30 + 10} x2="1000" y2={i * 30 + 10}
          stroke="hsl(217 91% 60% / 0.035)" strokeWidth="0.5" strokeDasharray="4 8" />
      ))}
      {Array.from({ length: 25 }, (_, i) => (
        <line key={`lon${i}`} x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2="500"
          stroke="hsl(217 91% 60% / 0.035)" strokeWidth="0.5" strokeDasharray="4 8" />
      ))}
      {/* Equator */}
      <line x1="0" y1="250" x2="1000" y2="250" stroke="hsl(217 91% 60% / 0.08)" strokeWidth="0.7" strokeDasharray="6 4" />

      {/* Realistic continent paths */}
      <g filter="url(#continentShadow)">
        {/* North America */}
        <path d="M50,80 L80,60 L120,55 L160,50 L200,55 L230,70 L250,90 L270,110 L280,140 L275,170 L260,190 L240,200 L220,195 L200,180 L180,170 L160,175 L140,190 L120,200 L110,215 L105,230 L115,240 L130,245 L140,235 L155,230 L165,240 L170,260 L160,270 L145,265 L130,260 L110,255 L95,245 L80,225 L70,200 L60,180 L50,160 L45,140 L40,120 L42,100Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="1" strokeLinejoin="round" />
        {/* Greenland */}
        <path d="M260,30 L300,25 L330,35 L340,55 L330,70 L310,75 L280,70 L265,55 L260,40Z"
          fill="hsl(217 91% 60% / 0.06)" stroke="hsl(217 91% 60% / 0.15)" strokeWidth="0.8" />
        {/* Central America */}
        <path d="M155,230 L165,240 L175,255 L185,265 L195,270 L200,280 L195,290 L185,295 L175,290 L168,280 L160,275 L155,265 L150,250Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.18)" strokeWidth="0.8" />
        {/* South America */}
        <path d="M220,290 L240,280 L260,275 L290,280 L310,295 L325,315 L335,340 L340,365 L335,390 L325,410 L310,425 L295,435 L280,440 L265,435 L255,420 L250,400 L245,380 L240,360 L230,340 L220,325 L215,310 L215,295Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="1" strokeLinejoin="round" />
        {/* Europe */}
        <path d="M440,60 L460,55 L480,50 L510,55 L530,65 L540,80 L545,95 L540,110 L530,120 L520,130 L505,135 L490,138 L475,140 L465,135 L455,125 L445,115 L435,105 L430,90 L435,75Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="1" strokeLinejoin="round" />
        {/* Scandinavia */}
        <path d="M470,25 L485,20 L500,25 L510,40 L505,55 L495,50 L480,45 L470,35Z"
          fill="hsl(217 91% 60% / 0.06)" stroke="hsl(217 91% 60% / 0.15)" strokeWidth="0.8" />
        {/* UK/Ireland */}
        <path d="M430,70 L440,65 L448,72 L445,82 L435,85 L428,78Z"
          fill="hsl(217 91% 60% / 0.08)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="0.8" />
        {/* Africa */}
        <path d="M440,160 L460,150 L485,148 L510,155 L535,165 L555,180 L565,200 L570,225 L568,250 L560,275 L548,300 L535,320 L520,335 L505,345 L490,350 L475,345 L462,335 L452,320 L445,300 L440,275 L435,250 L432,225 L430,200 L432,180Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="1" strokeLinejoin="round" />
        {/* Madagascar */}
        <path d="M575,310 L582,305 L588,315 L585,330 L578,335 L572,325Z"
          fill="hsl(217 91% 60% / 0.06)" stroke="hsl(217 91% 60% / 0.15)" strokeWidth="0.7" />
        {/* Middle East */}
        <path d="M540,130 L560,125 L580,135 L590,150 L585,170 L575,180 L560,175 L545,165 L535,150Z"
          fill="hsl(217 91% 60% / 0.06)" stroke="hsl(217 91% 60% / 0.18)" strokeWidth="0.8" />
        {/* Central/South Asia */}
        <path d="M590,100 L620,90 L660,95 L700,105 L720,120 L730,140 L725,160 L710,175 L690,185 L665,190 L640,185 L620,175 L605,160 L595,140 L590,120Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="1" strokeLinejoin="round" />
        {/* East Asia */}
        <path d="M700,60 L740,50 L780,55 L810,70 L830,90 L840,115 L835,140 L820,155 L800,160 L780,158 L760,150 L740,140 L725,125 L715,105 L705,85Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="1" strokeLinejoin="round" />
        {/* Japan */}
        <path d="M845,100 L852,90 L858,100 L860,115 L855,130 L848,135 L842,125 L840,110Z"
          fill="hsl(217 91% 60% / 0.08)" stroke="hsl(217 91% 60% / 0.22)" strokeWidth="0.8" />
        {/* Southeast Asia */}
        <path d="M730,190 L750,185 L770,192 L785,205 L790,220 L780,230 L765,225 L750,218 L738,210 L732,200Z"
          fill="hsl(217 91% 60% / 0.06)" stroke="hsl(217 91% 60% / 0.18)" strokeWidth="0.8" />
        {/* Indonesia */}
        <path d="M740,260 L760,255 L780,258 L800,262 L815,268 L810,278 L790,275 L770,272 L750,270 L740,268Z"
          fill="hsl(217 91% 60% / 0.05)" stroke="hsl(217 91% 60% / 0.15)" strokeWidth="0.7" />
        {/* Australia */}
        <path d="M780,310 L810,300 L845,305 L875,315 L895,335 L900,360 L890,385 L870,395 L845,400 L820,395 L800,380 L785,360 L778,340 L775,325Z"
          fill="hsl(217 91% 60% / 0.07)" stroke="hsl(217 91% 60% / 0.2)" strokeWidth="1" strokeLinejoin="round" />
        {/* New Zealand */}
        <path d="M920,380 L928,375 L932,385 L930,400 L924,405 L918,395Z"
          fill="hsl(217 91% 60% / 0.06)" stroke="hsl(217 91% 60% / 0.15)" strokeWidth="0.7" />
      </g>

      {/* Connection lines between Dhaka/Dubai/London (HQ nodes) */}
      {[
        { x1: 725, y1: 210, x2: 555, y2: 175 }, // BD → UAE
        { x1: 555, y1: 175, x2: 438, y2: 76 },  // UAE → UK
        { x1: 438, y1: 76, x2: 725, y2: 210 },  // UK → BD
      ].map((l, i) => (
        <line key={`conn${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="hsl(217 91% 60% / 0.12)" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="3s" repeatCount="indefinite" />
        </line>
      ))}

      {/* Country markers */}
      {countries.map(c => {
        const isActive = activeCountry === c.code;
        const cx = c.x / 100 * 1000;
        const cy = c.y / 100 * 500;
        const isHQ = ['BD', 'AE', 'GB'].includes(c.code);
        return (
          <g key={c.code}
            onMouseEnter={() => onHover(c.code)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(c.code)}
            className="cursor-pointer"
            filter={isActive ? 'url(#markerGlow)' : undefined}
          >
            {/* Outer pulse ring */}
            <circle cx={cx} cy={cy} r={isHQ ? 16 : 12} fill="none" stroke="hsl(217 91% 60% / 0.3)" strokeWidth="0.8">
              <animate attributeName="r" values={isHQ ? '14;22;14' : '10;16;10'} dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            {/* Glow circle */}
            <circle cx={cx} cy={cy} r={isActive ? 10 : isHQ ? 7 : 5}
              fill={isActive ? 'hsl(217 91% 60% / 0.25)' : 'hsl(217 91% 60% / 0.1)'}
              className="transition-all duration-300" />
            {/* Core dot */}
            <circle cx={cx} cy={cy} r={isActive ? 5 : isHQ ? 4 : 3}
              fill={isActive ? 'hsl(217 91% 75%)' : isHQ ? 'hsl(217 91% 65%)' : 'hsl(217 91% 60%)'}
              stroke="hsl(217 91% 80% / 0.6)" strokeWidth={isActive ? 1.5 : 0.5}
              className="transition-all duration-300" />
            {/* Country label */}
            {isActive && (
              <text x={cx} y={cy - 16} textAnchor="middle" fill="hsl(217 91% 80%)" fontSize="11" fontWeight="600" fontFamily="Outfit, sans-serif">
                {c.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const totalProjects = countries.reduce((sum, c) => sum + c.projects.length, 0);

export default function Portfolio() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const selectedData = countries.find(c => c.code === selectedCountry);

  const categories = ['All', ...Array.from(new Set(countries.flatMap(c => c.projects.map(p => p.category))))];

  const allProjects = countries.flatMap(c => c.projects.map(p => ({ ...p, country: c.name, flag: c.flag, code: c.code })));
  const filteredProjects = activeFilter === 'All' ? allProjects : allProjects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Global Deployments</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter font-['Outfit'] mb-5">
            Our Work, <span className="text-gradient">Worldwide</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {totalProjects} production systems deployed across {countries.length} countries. Click any location to explore our engineering footprint.
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={100} className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-14">
          {[
            { icon: Globe, label: 'Countries', value: `${countries.length}+` },
            { icon: Layers, label: 'Projects', value: `${totalProjects}+` },
            { icon: Building2, label: 'Industries', value: '12+' },
            { icon: Users, label: 'Users Served', value: '500K+' },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-4 text-center group hover:border-primary/30 transition-all">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl font-bold text-foreground font-['Outfit']">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </FadeIn>

        {/* Map */}
        <FadeIn delay={200}>
          <div className="relative glass rounded-2xl overflow-hidden" style={{ perspective: '1400px' }}>
            <div className="p-4 sm:p-6">
              <div
                className="relative transition-transform duration-700 ease-out"
                style={{ transform: 'rotateX(8deg)', transformStyle: 'preserve-3d' }}
              >
                <WorldMapSVG
                  activeCountry={hoveredCountry}
                  onHover={setHoveredCountry}
                  onClick={setSelectedCountry}
                />
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-3 border-t border-border/30 flex items-center justify-between bg-card/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">HQ Nodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary/60" />
                  <span className="text-xs text-muted-foreground">Deployment Sites</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Click a marker to explore</span>
            </div>
          </div>
        </FadeIn>

        {/* All Deployments */}
        <FadeIn delay={300} className="mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black font-['Outfit'] tracking-tight">All Deployments</h2>
              <p className="text-sm text-muted-foreground mt-1">{filteredProjects.length} projects across {countries.length} countries</p>
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeFilter === cat
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={`${p.code}-${p.title}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className="group glass rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
                  onClick={() => setSelectedCountry(p.code)}
                >
                  {/* Gradient header strip */}
                  <div className="h-1.5 bg-gradient-to-r from-primary/60 via-primary to-primary/40" />

                  <div className="p-5">
                    {/* Location & category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{p.flag}</span>
                        <span className="text-xs text-muted-foreground font-medium">{p.country}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] px-2.5 py-0.5 font-medium">{p.category}</Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold font-['Outfit'] group-hover:text-primary transition-colors mb-1.5">{p.title}</h3>
                    <p className="text-xs text-muted-foreground/80 mb-1">Client: {p.client}</p>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-2">{p.desc}</p>

                    {/* Metric badge */}
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 border border-primary/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[11px] font-semibold text-primary">{p.metric}</span>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/30">
                      {p.tech.map(t => (
                        <span key={t} className="text-[10px] px-2.5 py-1 rounded-md bg-secondary/80 text-muted-foreground font-medium">{t}</span>
                      ))}
                    </div>

                    {/* View link */}
                    <div className="flex items-center gap-1.5 mt-4 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View details <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>

      {/* Country detail modal */}
      <Dialog open={!!selectedData} onOpenChange={() => setSelectedCountry(null)}>
        <DialogContent className="glass-strong border-border/50 max-w-lg sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedData && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl">{selectedData.flag}</span>
                  <div>
                    <span className="text-xs text-muted-foreground block">Deployments in</span>
                    <DialogTitle className="text-xl font-black font-['Outfit']">{selectedData.name}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {selectedData.projects.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl bg-secondary/40 border border-border/30 overflow-hidden"
                  >
                    <div className="h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/30" />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="secondary" className="text-primary text-[10px] mb-2">{p.category}</Badge>
                          <h3 className="text-lg font-bold font-['Outfit']">{p.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">Client: {p.client}</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[11px] font-semibold text-primary">{p.metric}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/20">
                        <Code2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <div className="flex flex-wrap gap-1.5">
                          {p.tech.map(t => (
                            <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
