import FadeIn from '@/components/FadeIn';
import { Badge } from '@/components/ui/badge';
import {
  Quote, Globe, Target, Rocket, Users, Award, Sparkles,
  Code2, Cpu, Layers, ArrowRight, CheckCircle2, Building2,
  Linkedin, Twitter, Mail, Heart, Zap, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const team = [
  {
    name: 'Md Mamun Hossain',
    role: 'Founder & CEO',
    initial: 'M',
    gradient: 'from-primary to-blue-400',
    bio: 'Visionary technologist and serial entrepreneur leading Injaazh\'s global expansion across Dhaka, Dubai, and London. Specializes in full-stack architecture, technical SEO, and building scalable digital ecosystems for enterprise clients.',
    skills: ['Strategic Leadership', 'MERN Architecture', 'Technical SEO', 'Product Strategy'],
    quote: 'We engineer solutions that don\'t just look good, but perform relentlessly under pressure. Precision is our standard.',
    socials: { linkedin: '#', twitter: '#', email: 'mamun@injaazh.com' },
  },
  {
    name: 'Imtiaz Ahmed',
    role: 'Full-Stack Developer',
    initial: 'I',
    gradient: 'from-emerald-500 to-teal-400',
    bio: 'Versatile full-stack engineer with expertise in modern JavaScript frameworks and cloud infrastructure. Drives frontend innovation and backend reliability across multiple client platforms.',
    skills: ['React / Next.js', 'Node.js', 'AWS / Docker', 'TypeScript'],
    quote: 'Clean code is not a luxury — it\'s the foundation every scalable product deserves.',
    socials: { linkedin: '#', twitter: '#', email: 'imtiaz@injaazh.com' },
  },
  {
    name: 'Ismail Hossain',
    role: 'PHP Developer',
    initial: 'I',
    gradient: 'from-violet-500 to-purple-400',
    bio: 'Backend specialist with deep expertise in PHP ecosystems, WordPress architecture, and custom plugin development. Powers high-traffic platforms with optimized server-side solutions.',
    skills: ['PHP / Laravel', 'WordPress', 'MySQL', 'REST APIs'],
    quote: 'The best backend is the one your users never have to think about — it just works.',
    socials: { linkedin: '#', twitter: '#', email: 'ismail@injaazh.com' },
  },
];

const values = [
  { icon: Target, title: 'Precision Engineering', desc: 'Every line of code is deliberate. We build systems that perform under pressure.' },
  { icon: Zap, title: 'Relentless Speed', desc: 'Fast iteration, rapid deployment. We ship production-grade solutions on aggressive timelines.' },
  { icon: Shield, title: 'Security First', desc: 'Enterprise-grade security baked into every layer — from auth to infrastructure.' },
  { icon: Heart, title: 'Client Obsession', desc: 'Your success is our KPI. We go beyond deliverables to drive real business outcomes.' },
];

const milestones = [
  { year: '2021', title: 'Founded in Dhaka', desc: 'Started as a boutique web agency with 2 engineers.' },
  { year: '2022', title: 'First Enterprise Client', desc: 'Secured ThemesJet — scaled to 12K+ active users.' },
  { year: '2023', title: 'Dubai Office', desc: 'Expanded to UAE, serving Middle East & SE Asia markets.' },
  { year: '2024', title: '50+ Global Clients', desc: 'Crossed 50 active clients across 13 countries.' },
  { year: '2025', title: 'London Node', desc: 'Opened UK presence for European enterprise clients.' },
  { year: '2026', title: '150+ Deployments', desc: 'Surpassed 150 production systems with 99.9% uptime.' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Hero */}
        <FadeIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">About Injaazh</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter font-['Outfit'] mb-6">
            The Team Behind<br /><span className="text-gradient">Global Precision</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A tight-knit engineering team operating across three continents, building high-performance digital systems for forward-thinking organizations.
          </p>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={100} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-20">
          {[
            { icon: Globe, value: '3', label: 'Global Offices' },
            { icon: Users, value: '50+', label: 'Clients Served' },
            { icon: Rocket, value: '150+', label: 'Deployments' },
            { icon: Award, value: '99.9%', label: 'Uptime SLA' },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-5 text-center group hover:border-primary/30 transition-all">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2.5 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-black text-foreground font-['Outfit']">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </FadeIn>

        {/* Mission */}
        <FadeIn delay={150} className="mb-20">
          <div className="glass-strong rounded-2xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-5" />
              <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                To empower businesses worldwide with precision-engineered digital platforms that scale relentlessly,
                perform flawlessly, and drive measurable growth — from startups to enterprise.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Team */}
        <FadeIn delay={200} className="mb-20">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="text-primary mb-3">Leadership & Engineering</Badge>
            <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight">Meet the Team</h2>
          </div>

          <div className="space-y-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="h-1.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
                <div className="p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                  {/* Avatar & basic info */}
                  <div className="flex flex-col items-center lg:items-start shrink-0 lg:w-56">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-3xl font-bold font-['Outfit'] text-white mb-4 shadow-lg`}>
                      {member.initial}
                    </div>
                    <h3 className="text-xl font-bold font-['Outfit'] text-center lg:text-left">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                    <div className="flex items-center gap-2">
                      <a href={member.socials.linkedin} className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
                      </a>
                      <a href={member.socials.twitter} className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Twitter className="w-3.5 h-3.5 text-muted-foreground" />
                      </a>
                      <a href={`mailto:${member.socials.email}`} className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      </a>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {member.skills.map(s => (
                        <span key={s} className="text-[11px] px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium">{s}</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative glass rounded-xl p-4">
                      <Quote className="w-4 h-4 text-primary/40 absolute top-3 left-3" />
                      <p className="text-sm text-muted-foreground italic pl-6 leading-relaxed">"{member.quote}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Core Values */}
        <FadeIn delay={250} className="mb-20">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="text-primary mb-3">What Drives Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight">Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold font-['Outfit'] mb-1.5">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Timeline */}
        <FadeIn delay={300} className="mb-20">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="text-primary mb-3">Our Journey</Badge>
            <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight">Milestones</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-border/40 sm:-translate-x-px" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} sm:text-${i % 2 === 0 ? 'right' : 'left'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-14 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-10' : 'sm:pl-10'}`}>
                    <div className="glass rounded-xl p-5 hover:border-primary/30 transition-all">
                      <span className="text-xs font-bold text-primary">{m.year}</span>
                      <h3 className="text-base font-bold font-['Outfit'] mt-1">{m.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 mt-6 z-10 shadow-md shadow-primary/30" />
                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={350}>
          <div className="glass-strong rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] mb-3">Ready to Build Together?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                Let's engineer your next digital breakthrough. Our team is ready to turn your vision into production-grade reality.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" className="px-8 rounded-xl gap-2 group">
                  <Link to="/contact">
                    Start a Conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 rounded-xl border-border/60 hover:border-primary/50">
                  <Link to="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
