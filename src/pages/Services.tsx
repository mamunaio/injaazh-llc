import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/FadeIn';
import {
  Code2, Search, Palette, Server, Shield, BarChart3, Globe, Database,
  ArrowRight, CheckCircle2, Layers, Cpu, Lock, TrendingUp
} from 'lucide-react';

const serviceCategories = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    desc: 'End-to-end web application engineering using the MERN stack and modern frameworks.',
    features: ['Custom React & Next.js Applications', 'RESTful & GraphQL APIs', 'Real-time WebSocket Integrations', 'Microservice Architecture', 'Database Design & Optimization', 'Third-party API Integrations'],
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Search,
    title: 'Technical SEO',
    desc: 'Algorithmic search engine optimization that generates sustainable organic traffic growth.',
    features: ['Core Web Vitals Optimization', 'Schema Markup & Structured Data', 'Site Architecture Audits', 'Redirect & Crawl Management', 'Keyword Cluster Strategy', 'Competitor Gap Analysis'],
    color: 'from-primary/15 to-primary/5',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Research-driven design that converts visitors into customers through intuitive interfaces.',
    features: ['User Research & Personas', 'Wireframing & Prototyping', 'Design System Creation', 'Responsive Design', 'Motion Design & Micro-interactions', 'Usability Testing'],
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Server,
    title: 'Cloud & DevOps',
    desc: 'Scalable infrastructure with automated deployment pipelines and monitoring.',
    features: ['AWS & GCP Deployments', 'Docker & Kubernetes', 'CI/CD Pipeline Setup', 'Load Balancing & Auto-scaling', 'Infrastructure as Code', 'Performance Monitoring'],
    color: 'from-primary/15 to-primary/5',
  },
  {
    icon: Shield,
    title: 'Security Engineering',
    desc: 'Enterprise-grade security protocols protecting your data and user privacy.',
    features: ['Penetration Testing', 'Vulnerability Assessments', 'OWASP Compliance', 'Data Encryption Strategies', 'Access Control Systems', 'Security Audit Reports'],
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Growth',
    desc: 'Data-driven growth strategies with custom dashboards and actionable insights.',
    features: ['Custom Analytics Dashboards', 'Funnel Optimization', 'A/B Testing Frameworks', 'Conversion Rate Optimization', 'User Behavior Analysis', 'Growth Strategy Consulting'],
    color: 'from-primary/15 to-primary/5',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">Services</span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">Full Spectrum<br />Engineering</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Every capability you need to build, launch, and scale — under one roof.</p>
        </FadeIn>

        <div className="space-y-6">
          {serviceCategories.map((s, i) => (
            <FadeIn key={s.title} delay={i * 100} className="glass rounded-2xl p-8 sm:p-10 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_40px_-12px_hsl(270,91%,65%,0.2)]">
              <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 items-start">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <s.icon size={26} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/estimator">Get Quote <ArrowRight size={14} /></Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {s.features.map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-16">
          <div className="glass rounded-2xl p-10 sm:p-14">
            <h3 className="text-2xl font-bold mb-3">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">Every project is unique. Let's discuss your specific requirements and build a tailored engagement.</p>
            <Button asChild size="lg">
              <Link to="/estimator">Start Your Project <ArrowRight size={16} /></Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
