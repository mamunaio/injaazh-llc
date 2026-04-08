import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/FadeIn';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Check, Rocket, Clock, Shield, Zap, ArrowRight, Star, Users, Headphones, FileCode, BarChart3, Globe, Layers, GitBranch, Database, Lock } from 'lucide-react';

const packages = [
  {
    title: 'Technical SEO Audit',
    price: '$499',
    period: 'one-time',
    features: ['Core Web Vitals Optimization', 'Schema Markup Implementation', 'Redirect Mapping & Cleanup', 'Sitemap & Crawl Analysis', 'Competitor Gap Report'],
    highlighted: false,
    icon: BarChart3,
    deliveryTime: '5-7 Business Days',
    extras: [
      { icon: Globe, label: 'Multi-language SEO support' },
      { icon: FileCode, label: 'Custom schema generation' },
      { icon: BarChart3, label: 'Monthly ranking reports (3 mo)' },
      { icon: Shield, label: 'Google Search Console setup' },
    ],
    description: 'A deep-dive technical audit that uncovers every performance bottleneck, crawl issue, and ranking opportunity across your digital presence.',
  },
  {
    title: 'MERN MVP Build',
    price: '$2,499',
    period: 'one-time',
    features: ['Custom React UI/UX', 'Node.js + Express Backend', 'MongoDB Architecture', 'JWT Auth System', 'Deployment & CI/CD Setup'],
    highlighted: true,
    icon: Layers,
    deliveryTime: '3-4 Weeks',
    extras: [
      { icon: GitBranch, label: 'GitHub repo with CI/CD pipeline' },
      { icon: Database, label: 'Database architecture & seeding' },
      { icon: Lock, label: 'Role-based access control' },
      { icon: Headphones, label: '30-day post-launch support' },
    ],
    description: 'End-to-end MVP development with production-grade code, modern UI, robust backend, and deployment-ready infrastructure.',
  },
  {
    title: 'Agency Retainer',
    price: '$3,999',
    period: '/month',
    features: ['Dedicated Lead Developer', 'Priority Task Queue', 'Weekly Strategy Calls', 'Unlimited Revisions', '24/7 Emergency Support'],
    highlighted: false,
    icon: Users,
    deliveryTime: 'Ongoing',
    extras: [
      { icon: Zap, label: 'Same-day hotfix deployments' },
      { icon: Star, label: 'Quarterly performance reviews' },
      { icon: Globe, label: 'Multi-project management' },
      { icon: Shield, label: 'SLA-backed uptime guarantee' },
    ],
    description: 'A full-service engineering partnership with a dedicated team, strategic guidance, and unlimited development bandwidth.',
  },
];

const addOns = [
  { label: 'Payment Gateway Integration', price: '+$399', icon: Lock },
  { label: 'Advanced Analytics Dashboard', price: '+$599', icon: BarChart3 },
  { label: 'Multi-language (i18n) Support', price: '+$349', icon: Globe },
  { label: 'Real-time Notifications System', price: '+$449', icon: Zap },
];

export default function Packages() {
  const [selectedPkg, setSelectedPkg] = useState<typeof packages[0] | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<number>>(new Set());

  const toggleAddOn = (i: number) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const openPackage = (pkg: typeof packages[0]) => {
    setSelectedPkg(pkg);
    setSelectedAddOns(new Set());
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter font-['Outfit'] mb-4">Architecture & Protocols</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Deploying deep technical expertise across modern technology ecosystems.</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.title} delay={i * 150} className={`glass rounded-2xl p-8 flex flex-col transition-all hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)] ${pkg.highlighted ? 'border-primary/60 ring-1 ring-primary/30 scale-[1.03]' : ''}`}>
              {pkg.highlighted && <span className="text-xs font-semibold text-primary mb-4 uppercase tracking-widest">Most Popular</span>}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <pkg.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold font-['Outfit']">{pkg.title}</h3>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-black text-primary font-['Outfit']">{pkg.price}</span>
                <span className="text-muted-foreground text-sm ml-1">{pkg.period}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                <Clock size={12} /> {pkg.deliveryTime}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={() => openPackage(pkg)} className={pkg.highlighted ? '' : ''} variant={pkg.highlighted ? 'default' : 'outline'}>
                <Rocket size={16} className="mr-2" /> Start Project
              </Button>
            </FadeIn>
          ))}
        </div>

        {/* Comparison strip */}
        <FadeIn delay={500} className="mt-16">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold font-['Outfit'] mb-6 text-center">All Plans Include</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: 'Production-Grade Code' },
                { icon: Zap, label: 'Performance Optimized' },
                { icon: GitBranch, label: 'Version Controlled' },
                { icon: Headphones, label: 'Dedicated Support' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <item.icon size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Package Detail Dialog */}
      <Dialog open={!!selectedPkg} onOpenChange={(open) => !open && setSelectedPkg(null)}>
        <DialogContent className="glass-strong border-border/50 sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPkg && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selectedPkg.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-black font-['Outfit']">{selectedPkg.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-black text-primary font-['Outfit']">{selectedPkg.price}</span>
                      <span className="text-muted-foreground text-sm">{selectedPkg.period}</span>
                      <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1"><Clock size={10} />{selectedPkg.deliveryTime}</span>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-muted-foreground pt-2">{selectedPkg.description}</DialogDescription>
              </DialogHeader>

              {/* Core deliverables */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Core Deliverables</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedPkg.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-secondary/30">
                      <Check size={14} className="text-primary shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus extras */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Included Extras</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedPkg.extras.map(e => (
                    <div key={e.label} className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                      <e.icon size={14} className="text-primary shrink-0" /> {e.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Optional Add-Ons</h4>
                <div className="space-y-2">
                  {addOns.map((a, i) => (
                    <button
                      key={a.label}
                      onClick={() => toggleAddOn(i)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all border ${
                        selectedAddOns.has(i)
                          ? 'bg-primary/10 border-primary/40 text-foreground'
                          : 'bg-secondary/20 border-border/30 text-muted-foreground hover:border-border/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <a.icon size={14} className={selectedAddOns.has(i) ? 'text-primary' : ''} />
                        {a.label}
                      </span>
                      <span className="font-semibold text-primary">{a.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="flex-1" size="lg">
                  <Link to="/estimator">
                    <Rocket size={16} className="mr-2" /> Get Custom Estimate <ArrowRight size={14} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1" size="lg">
                  <Link to="/contact">
                    <Headphones size={16} className="mr-2" /> Talk to an Engineer
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
