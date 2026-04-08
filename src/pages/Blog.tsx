import { Link } from 'react-router-dom';
import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import { Clock, ArrowRight, BookOpen, TrendingUp, Sparkles, Search, User, Calendar, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const posts = [
  {
    slug: 'mern-stack-2026',
    category: 'Engineering',
    title: 'Building Scalable MERN Applications in 2026',
    excerpt: 'A deep dive into microservice patterns, horizontal scaling strategies, and the modern MERN toolkit that powers enterprise-grade platforms.',
    date: 'Mar 28, 2026',
    readTime: '8 min',
    author: 'Md Mamun Hossain',
    featured: true,
    tags: ['MERN', 'Microservices', 'Scaling'],
  },
  {
    slug: 'technical-seo-audit',
    category: 'SEO',
    title: 'The Complete Technical SEO Audit Checklist',
    excerpt: 'From Core Web Vitals to schema markup — a comprehensive framework for diagnosing and resolving technical SEO bottlenecks that kill rankings.',
    date: 'Mar 15, 2026',
    readTime: '12 min',
    author: 'Md Mamun Hossain',
    featured: true,
    tags: ['SEO', 'Core Web Vitals', 'Schema'],
  },
  {
    slug: 'react-performance',
    category: 'Performance',
    title: 'React Performance Patterns That Actually Matter',
    excerpt: 'Forget premature optimization. Here are the 7 React patterns that deliver measurable performance gains in production applications.',
    date: 'Feb 28, 2026',
    readTime: '10 min',
    author: 'Md Mamun Hossain',
    featured: false,
    tags: ['React', 'Optimization', 'Hooks'],
  },
  {
    slug: 'devops-zero-downtime',
    category: 'DevOps',
    title: 'Zero-Downtime Deployments with Docker & AWS',
    excerpt: 'How we achieve 99.99% uptime for client platforms using blue-green deployments, health checks, and automated rollback strategies.',
    date: 'Feb 10, 2026',
    readTime: '7 min',
    author: 'Md Mamun Hossain',
    featured: false,
    tags: ['Docker', 'AWS', 'CI/CD'],
  },
  {
    slug: 'design-systems',
    category: 'Design',
    title: 'Why Every Startup Needs a Design System from Day One',
    excerpt: "Design systems aren't just for large teams. Learn how implementing tokens, components, and patterns early saves thousands in technical debt.",
    date: 'Jan 25, 2026',
    readTime: '6 min',
    author: 'Md Mamun Hossain',
    featured: false,
    tags: ['Design System', 'UI/UX', 'Tokens'],
  },
  {
    slug: 'api-security-best-practices',
    category: 'Security',
    title: 'API Security: Beyond Authentication',
    excerpt: "Rate limiting, input validation, CORS policies, and the security layers most developers forget until it's too late.",
    date: 'Jan 12, 2026',
    readTime: '9 min',
    author: 'Md Mamun Hossain',
    featured: false,
    tags: ['Security', 'API', 'Auth'],
  },
];

const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = posts.filter(p => p.featured);
  const showFeatured = activeCategory === 'All' && !searchQuery;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <FadeIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Engineering Insights</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter font-['Outfit'] mb-5">
            Ideas & <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technical deep-dives, case studies, and battle-tested strategies from our engineering team.
          </p>
        </FadeIn>

        {/* Search & Filters */}
        <FadeIn delay={100} className="mb-12">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 bg-card/60 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Featured articles — 2-column hero layout */}
        {showFeatured && (
          <FadeIn delay={150} className="mb-14">
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map((p, i) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group glass rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  {/* Gradient visual */}
                  <div className={`h-48 relative overflow-hidden ${
                    i === 0
                      ? 'bg-gradient-to-br from-primary/20 via-primary/5 to-transparent'
                      : 'bg-gradient-to-br from-accent/15 via-accent/5 to-transparent'
                  }`}>
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }} />
                    <div className="absolute bottom-4 left-5">
                      <Badge className="bg-primary/90 text-primary-foreground text-[10px] px-2.5 py-0.5 mb-2">
                        <Sparkles className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="text-[11px]">{p.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold font-['Outfit'] group-hover:text-primary transition-colors mb-2">{p.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{p.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {p.author}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
                      </div>
                      <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Divider with count */}
        <FadeIn delay={200} className="mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold font-['Outfit'] shrink-0">
              {showFeatured ? 'Latest Articles' : `${filtered.length} Article${filtered.length !== 1 ? 's' : ''}`}
            </h2>
            <div className="h-px flex-1 bg-border/40" />
          </div>
        </FadeIn>

        {/* Article list */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
              >
                <Link
                  to={`/blog/${p.slug}`}
                  className="group glass rounded-2xl p-6 flex flex-col sm:flex-row gap-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 block"
                >
                  {/* Left: visual thumbnail */}
                  <div className="sm:w-56 h-32 sm:h-auto rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                    }} />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-[10px] font-medium">{p.category}</Badge>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="flex-1 flex flex-col justify-between min-h-[120px]">
                    <div>
                      <h3 className="text-lg font-bold font-['Outfit'] group-hover:text-primary transition-colors mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {p.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.readTime}</span>
                      </div>
                      <span className="hidden sm:flex items-center gap-1.5 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/80 text-muted-foreground font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <FadeIn className="text-center py-20">
              <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-sm text-primary mt-2 hover:underline">
                Clear filters
              </button>
            </FadeIn>
          )}
        </div>

        {/* Newsletter CTA */}
        <FadeIn delay={300} className="mt-16">
          <div className="glass-strong rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-['Outfit'] mb-2">Stay Ahead of the Curve</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Get weekly engineering insights, performance tips, and industry trends delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-card/80 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground/50 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
