import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Code2, Palette, Server, Shield, Rocket, BarChart3, Globe, Smartphone, Cpu, Database, FileCode, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const megaMenus: Record<string, { label: string; to: string; icon: typeof Code2; desc: string }[]> = {
  Services: [
    { label: 'Web Development', to: '/services', icon: Code2, desc: 'Full-stack MERN & Next.js apps' },
    { label: 'UI/UX Design', to: '/services', icon: Palette, desc: 'Figma to production-ready interfaces' },
    { label: 'Cloud & DevOps', to: '/services', icon: Server, desc: 'AWS, Docker, CI/CD pipelines' },
    { label: 'Cybersecurity', to: '/services', icon: Shield, desc: 'Audits, pentesting & compliance' },
    { label: 'Performance Optimization', to: '/services', icon: Rocket, desc: 'Speed, SEO & Core Web Vitals' },
    { label: 'Analytics & BI', to: '/services', icon: BarChart3, desc: 'Dashboards & data engineering' },
  ],
  Solutions: [
    { label: 'SaaS Platforms', to: '/packages', icon: Globe, desc: 'Scalable multi-tenant products' },
    { label: 'Mobile Apps', to: '/packages', icon: Smartphone, desc: 'React Native cross-platform' },
    { label: 'AI & Automation', to: '/packages', icon: Cpu, desc: 'ML integrations & workflows' },
    { label: 'API Development', to: '/packages', icon: Database, desc: 'RESTful & GraphQL systems' },
    { label: 'CMS & E-Commerce', to: '/packages', icon: FileCode, desc: 'Headless commerce platforms' },
    { label: 'Enterprise Systems', to: '/packages', icon: Layers, desc: 'ERP, CRM & custom tools' },
  ],
};

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', mega: 'Services' },
  { label: 'Solutions', mega: 'Solutions' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Insights', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const navRef = useRef<HTMLDivElement>(null);

  const openMega = (key: string) => {
    clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  };

  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      {/* Main bar */}
      <div className="mx-4 mt-3 rounded-2xl glass-strong shadow-lg shadow-primary/5">
        <div className="container mx-auto flex items-center justify-between h-14 px-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 text-xl font-bold tracking-tight group">
            <span className="text-foreground group-hover:text-primary transition-colors">INJAAZH</span>
            <span className="w-2 h-2 rounded-full bg-primary inline-block group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              if (item.mega) {
                const isActive = activeMega === item.mega;
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => openMega(item.mega!)}
                    onMouseLeave={closeMega}
                    className="relative"
                  >
                    <button
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to!}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.to ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild size="sm" className="rounded-xl px-5 shadow-md shadow-primary/20">
              <Link to="/estimator">Start a Project</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-foreground p-1.5 rounded-lg hover:bg-secondary/50 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu dropdown */}
      <AnimatePresence>
        {activeMega && megaMenus[activeMega] && (
          <motion.div
            key={activeMega}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block absolute left-0 right-0 top-[72px] px-4"
            onMouseEnter={() => openMega(activeMega)}
            onMouseLeave={closeMega}
          >
            <div className="container mx-auto">
              <div className="glass-strong rounded-2xl p-6 shadow-2xl shadow-primary/10 border border-border/50">
                <div className="grid grid-cols-3 gap-2">
                  {megaMenus[activeMega].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                    >
                      <Link
                        to={item.to}
                        className="group flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-primary/10 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between"
                >
                  <span className="text-xs text-muted-foreground">Explore all our {activeMega.toLowerCase()}</span>
                  <Link to={activeMega === 'Services' ? '/services' : '/packages'} className="text-xs font-medium text-primary hover:underline">
                    View all →
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mx-4 mt-2 rounded-2xl glass-strong shadow-xl shadow-primary/10 border border-border/50 overflow-hidden">
          <div className="p-4 space-y-1">
            {navItems.map(item => {
              if (item.mega) {
                const isExpanded = mobileExpanded === item.mega;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : item.mega!)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                        isExpanded ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    {isExpanded && megaMenus[item.mega!] && (
                      <div className="pl-3 pb-2 space-y-1">
                        {megaMenus[item.mega!].map(sub => (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                          >
                            <sub.icon className="w-4 h-4 text-primary/60" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to!}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.to ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-border/30">
              <Button asChild size="sm" className="w-full rounded-xl">
                <Link to="/estimator" onClick={() => setMobileOpen(false)}>Start a Project</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
