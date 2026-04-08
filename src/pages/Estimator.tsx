import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/FadeIn';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator } from 'lucide-react';

const archPrices: Record<string, number> = { 'UI/UX Design': 800, 'Custom CMS': 1500, 'Full-Stack MERN': 3000 };
const scaleMult: Record<string, number> = { 'Landing Page': 0.5, 'Standard Platform': 1, 'Complex System': 2 };

export default function Estimator() {
  const [arch, setArch] = useState('');
  const [scale, setScale] = useState('');
  const [seo, setSeo] = useState(false);
  const [payment, setPayment] = useState(false);

  const estimate = useMemo(() => {
    if (!arch || !scale) return null;
    let base = (archPrices[arch] || 0) * (scaleMult[scale] || 1);
    if (seo) base += 499;
    if (payment) base += 399;
    return base;
  }, [arch, scale, seo, payment]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-start justify-center">
      <FadeIn className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter font-['Outfit'] mb-4">Spatial Project Estimator</h1>
          <p className="text-muted-foreground">Configure your project parameters to generate a budget estimate.</p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Architecture</label>
            <Select onValueChange={setArch}>
              <SelectTrigger className="bg-secondary/50 border-border/60 focus:ring-primary">
                <SelectValue placeholder="Select architecture type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(archPrices).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Project Scale</label>
            <Select onValueChange={setScale}>
              <SelectTrigger className="bg-secondary/50 border-border/60 focus:ring-primary">
                <SelectValue placeholder="Select project scale" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(scaleMult).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Add-Ons</label>
            <div className="flex items-center gap-3">
              <Checkbox id="seo" checked={seo} onCheckedChange={(v) => setSeo(!!v)} />
              <label htmlFor="seo" className="text-sm text-muted-foreground cursor-pointer">Technical SEO Setup (+$499)</label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="pay" checked={payment} onCheckedChange={(v) => setPayment(!!v)} />
              <label htmlFor="pay" className="text-sm text-muted-foreground cursor-pointer">Payment Gateway Logic (+$399)</label>
            </div>
          </div>

          {estimate !== null && (
            <div className="text-center pt-4 border-t border-border/40">
              <p className="text-sm text-muted-foreground mb-1">Estimated Budget</p>
              <p className="text-5xl font-black text-primary font-['Outfit']">${estimate.toLocaleString()}</p>
            </div>
          )}

          <Button className="w-full" size="lg" disabled={!estimate}>
            <Calculator size={16} className="mr-2" /> Request Formal Proposal
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
