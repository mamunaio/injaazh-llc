import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Send, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const footerLinks = {
  Platform: [
    { label: 'Services', to: '/services' },
    { label: 'Packages', to: '/packages' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Estimator', to: '/estimator' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Cookie Policy', to: '#' },
    { label: 'GDPR', to: '#' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@injaazh.com', label: 'Email' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Subscribed!', description: 'You\'ll receive our engineering updates.' });
    setEmail('');
  };

  return (
    <footer className="border-t border-border/30 mt-10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-tight inline-block mb-4">
              INJAAZH<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Engineering global dominance through high-performance digital ecosystems. From MERN stacks to algorithmic SEO.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-secondary/50 border-border/60 focus:ring-primary focus:border-primary text-sm h-10"
              />
              <Button type="submit" size="sm" className="shrink-0 h-10 px-4">
                <Send size={14} />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground/60 mt-2">Join 2,400+ engineers. No spam, ever.</p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                      {l.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Injaazh Pvt. Ltd. | Official Nodes: Dhaka · Dubai · London
          </p>

          <div className="flex items-center gap-4">
            {socials.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <s.icon size={14} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/40">
            <Zap size={12} className="text-primary" />
            <span>Powered by Injaazh Engine v6.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
