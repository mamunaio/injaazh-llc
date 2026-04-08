import { useParams, Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, Calendar, User, Share2, BookOpen } from 'lucide-react';

const postsData: Record<string, {
  category: string; title: string; date: string; readTime: string; author: string;
  excerpt: string; content: { type: 'p' | 'h2' | 'code' | 'list'; text: string; items?: string[] }[];
}> = {
  'mern-stack-2026': {
    category: 'Engineering', title: 'Building Scalable MERN Applications in 2026',
    date: 'Mar 28, 2026', readTime: '8 min read', author: 'Md Mamun Hossain',
    excerpt: 'A deep dive into microservice patterns, horizontal scaling strategies, and the modern MERN toolkit that powers enterprise-grade platforms.',
    content: [
      { type: 'p', text: 'The MERN stack has evolved far beyond its humble beginnings. In 2026, building a scalable MERN application means embracing microservice architectures, event-driven systems, and infrastructure-as-code from day one.' },
      { type: 'h2', text: 'The Modern MERN Architecture' },
      { type: 'p', text: 'Gone are the days of monolithic Express servers handling everything. Today\'s production MERN apps use a layered approach: API Gateway → Microservices → Message Queue → Database Cluster. Each layer scales independently.' },
      { type: 'code', text: '// Example: Service mesh configuration\nconst gateway = createAPIGateway({\n  rateLimit: { window: "1m", max: 100 },\n  services: [\n    { path: "/auth", target: "auth-service:3001" },\n    { path: "/api", target: "core-service:3002" },\n  ],\n});' },
      { type: 'h2', text: 'Horizontal Scaling Strategies' },
      { type: 'p', text: 'Vertical scaling hits a ceiling. The real power lies in horizontal scaling — running multiple instances behind a load balancer with shared-nothing architecture. MongoDB\'s sharding capabilities pair perfectly with stateless Node.js services.' },
      { type: 'list', text: '', items: ['Containerize every service with Docker', 'Use Kubernetes for orchestration at scale', 'Implement Redis for session management across instances', 'Deploy read replicas for heavy-read workloads'] },
      { type: 'h2', text: 'Performance at Scale' },
      { type: 'p', text: 'At Injaazh, we\'ve benchmarked our MERN architectures handling 50,000+ concurrent connections with sub-200ms response times. The key? Aggressive caching, connection pooling, and strategic denormalization in MongoDB.' },
      { type: 'p', text: 'The future of MERN is modular, observable, and resilient. Every decision — from schema design to deployment topology — should optimize for horizontal growth.' },
    ],
  },
  'technical-seo-audit': {
    category: 'SEO', title: 'The Complete Technical SEO Audit Checklist',
    date: 'Mar 15, 2026', readTime: '12 min read', author: 'Md Mamun Hossain',
    excerpt: 'From Core Web Vitals to schema markup — a comprehensive framework for diagnosing and resolving technical SEO bottlenecks that kill rankings.',
    content: [
      { type: 'p', text: 'Technical SEO is the foundation that determines whether your content can even compete. Without it, the best content in the world remains invisible to search engines.' },
      { type: 'h2', text: 'Core Web Vitals: The Non-Negotiables' },
      { type: 'p', text: 'Google\'s Core Web Vitals — LCP, FID (now INP), and CLS — are direct ranking signals. We target LCP under 2.5s, INP under 200ms, and CLS below 0.1 for every client project.' },
      { type: 'list', text: '', items: ['Audit largest contentful paint element and optimize delivery', 'Minimize JavaScript execution time for better INP', 'Set explicit dimensions on all media elements for CLS', 'Implement resource hints: preconnect, prefetch, preload'] },
      { type: 'h2', text: 'Schema Markup Strategy' },
      { type: 'p', text: 'Structured data transforms your search listings from plain blue links into rich results. We implement Organization, Product, FAQ, HowTo, and Article schemas depending on the page type.' },
      { type: 'code', text: '// JSON-LD Organization Schema\n{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Injaazh Pvt. Ltd.",\n  "url": "https://injaazh.com",\n  "sameAs": ["linkedin", "github"]\n}' },
      { type: 'h2', text: 'Crawl Budget Optimization' },
      { type: 'p', text: 'Large sites waste crawl budget on parameter URLs, faceted navigation, and duplicate content. A clean robots.txt, strategic canonicalization, and XML sitemaps ensure Google crawls what matters.' },
      { type: 'p', text: 'Technical SEO isn\'t a one-time fix — it\'s a discipline. Regular audits catch regressions before they impact rankings.' },
    ],
  },
  'react-performance': {
    category: 'Performance', title: 'React Performance Patterns That Actually Matter',
    date: 'Feb 28, 2026', readTime: '10 min read', author: 'Md Mamun Hossain',
    excerpt: 'Forget premature optimization. Here are the 7 React patterns that deliver measurable performance gains in production applications.',
    content: [
      { type: 'p', text: 'Most React performance advice is noise. Wrapping everything in React.memo or useMemo without profiling is cargo-cult optimization. Here are the patterns that actually move the needle.' },
      { type: 'h2', text: '1. Code Splitting at Route Level' },
      { type: 'p', text: 'The single highest-impact optimization. Using React.lazy with Suspense at the route level can reduce initial bundle size by 60-80%. Every page the user hasn\'t visited yet is code they shouldn\'t download.' },
      { type: 'code', text: 'const Dashboard = lazy(() => import("./pages/Dashboard"));\n\n<Suspense fallback={<Skeleton />}>\n  <Route path="/dash" element={<Dashboard />} />\n</Suspense>' },
      { type: 'h2', text: '2. Virtualize Long Lists' },
      { type: 'p', text: 'Rendering 10,000 DOM nodes kills performance. Libraries like react-window render only visible items. We\'ve seen 95% reduction in DOM nodes for data-heavy dashboards.' },
      { type: 'h2', text: '3. State Colocation' },
      { type: 'p', text: 'The biggest performance killer isn\'t slow renders — it\'s unnecessary renders. Moving state as close to where it\'s used as possible prevents entire subtrees from re-rendering.' },
      { type: 'list', text: '', items: ['Colocate state with the component that uses it', 'Use context sparingly and split providers', 'Prefer composition over prop drilling', 'Profile before you optimize — React DevTools Profiler is your friend'] },
      { type: 'p', text: 'Performance is a feature. Ship fast, measure, and optimize what matters.' },
    ],
  },
  'devops-zero-downtime': {
    category: 'DevOps', title: 'Zero-Downtime Deployments with Docker & AWS',
    date: 'Feb 10, 2026', readTime: '7 min read', author: 'Md Mamun Hossain',
    excerpt: 'How we achieve 99.99% uptime for client platforms using blue-green deployments, health checks, and automated rollback strategies.',
    content: [
      { type: 'p', text: 'Downtime is unacceptable. Every minute of downtime costs revenue, trust, and SEO rankings. At Injaazh, we\'ve engineered deployment pipelines that achieve true zero-downtime releases.' },
      { type: 'h2', text: 'Blue-Green Deployment Pattern' },
      { type: 'p', text: 'The concept is simple: maintain two identical production environments (Blue and Green). Deploy to the inactive environment, verify health, then switch traffic. If anything fails, instant rollback by switching back.' },
      { type: 'h2', text: 'Health Checks Are Everything' },
      { type: 'p', text: 'A deployment isn\'t successful just because the container started. Deep health checks verify database connectivity, external API availability, and application-specific readiness before traffic is routed.' },
      { type: 'code', text: '# Docker health check\nHEALTHCHECK --interval=10s --timeout=3s --retries=3 \\\n  CMD curl -f http://localhost:3000/health || exit 1' },
      { type: 'list', text: '', items: ['Implement liveness and readiness probes', 'Use rolling updates with maxUnavailable: 0', 'Automate database migrations with backward compatibility', 'Monitor error rates post-deploy and auto-rollback on spikes'] },
      { type: 'p', text: 'Zero-downtime deployment is not a luxury — it\'s a baseline requirement for any production system in 2026.' },
    ],
  },
  'design-systems': {
    category: 'Design', title: 'Why Every Startup Needs a Design System from Day One',
    date: 'Jan 25, 2026', readTime: '6 min read', author: 'Md Mamun Hossain',
    excerpt: "Design systems aren't just for large teams. Learn how implementing tokens, components, and patterns early saves thousands in technical debt.",
    content: [
      { type: 'p', text: 'The common objection: "We\'re too small for a design system." The reality: you\'re too small to afford the debt of not having one. Every inconsistent button, mismatched color, and duplicated component compounds into weeks of refactoring later.' },
      { type: 'h2', text: 'Start with Tokens, Not Components' },
      { type: 'p', text: 'Design tokens — colors, spacing, typography scales, shadows — are the atomic units of your visual language. Define them once in CSS custom properties and reference them everywhere.' },
      { type: 'code', text: ':root {\n  --color-primary: 270 91% 65%;\n  --space-unit: 0.25rem;\n  --radius-lg: 1rem;\n  --shadow-card: 0 4px 24px -8px hsl(var(--color-primary) / 0.15);\n}' },
      { type: 'h2', text: 'Component Libraries Save Weeks' },
      { type: 'p', text: 'Using a foundation like shadcn/ui or Radix primitives gives you accessible, composable components out of the box. Customize the theme layer — don\'t rebuild from scratch.' },
      { type: 'list', text: '', items: ['Define a token layer before writing any component code', 'Use semantic naming (--color-primary, not --purple-500)', 'Document variants and usage guidelines', 'Enforce consistency with ESLint rules and PR reviews'] },
      { type: 'p', text: 'A design system is an investment that pays dividends on every feature you ship.' },
    ],
  },
  'api-security-best-practices': {
    category: 'Security', title: 'API Security: Beyond Authentication',
    date: 'Jan 12, 2026', readTime: '9 min read', author: 'Md Mamun Hossain',
    excerpt: "Rate limiting, input validation, CORS policies, and the security layers most developers forget until it's too late.",
    content: [
      { type: 'p', text: 'Authentication is the front door, but most API breaches happen through side windows. Once a user is authenticated, the real security work begins: authorization, validation, and rate limiting.' },
      { type: 'h2', text: 'Input Validation Is Non-Negotiable' },
      { type: 'p', text: 'Every API endpoint must validate every input. Use schema validation libraries like Zod or Joi to define strict contracts. Never trust client-side validation alone.' },
      { type: 'code', text: 'const createUserSchema = z.object({\n  email: z.string().email().max(255),\n  name: z.string().min(1).max(100),\n  role: z.enum(["user", "admin"]),\n});\n\napp.post("/users", validate(createUserSchema), handler);' },
      { type: 'h2', text: 'Rate Limiting Strategies' },
      { type: 'p', text: 'Without rate limiting, your API is a DDoS target. Implement tiered rate limits: global (1000 req/min), per-user (100 req/min), and per-endpoint (sensitive operations at 10 req/min).' },
      { type: 'h2', text: 'CORS: Least Privilege' },
      { type: 'p', text: 'Never use Access-Control-Allow-Origin: *. Whitelist only the domains that should access your API. Restrict methods and headers to the minimum required.' },
      { type: 'list', text: '', items: ['Validate all inputs with strict schemas', 'Implement rate limiting at multiple levels', 'Use parameterized queries — never string interpolation', 'Log security events and set up real-time alerts', 'Rotate API keys and secrets regularly'] },
      { type: 'p', text: 'Security isn\'t a feature you add later. It\'s a practice you embed into every line of code from the start.' },
    ],
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postsData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <FadeIn className="text-center">
          <h1 className="text-4xl font-black font-['Outfit'] mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">This article doesn't exist or has been moved.</p>
          <Button asChild variant="outline"><Link to="/blog"><ArrowLeft size={16} className="mr-2" /> Back to Blog</Link></Button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <FadeIn>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Engineering Log
          </Link>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-primary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-['Outfit'] leading-tight mb-6">{post.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </div>

          <div className="flex items-center justify-between glass rounded-xl p-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={10} /> {post.date}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Share2 size={18} />
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <article className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'h2') return <h2 key={i} className="text-2xl font-bold font-['Outfit'] pt-4">{block.text}</h2>;
              if (block.type === 'code') return (
                <pre key={i} className="glass rounded-xl p-5 overflow-x-auto text-sm font-mono leading-relaxed text-muted-foreground border border-border/30">
                  <code>{block.text}</code>
                </pre>
              );
              if (block.type === 'list') return (
                <ul key={i} className="space-y-2 pl-1">
                  {block.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <BookOpen size={14} className="text-primary mt-1.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              );
              return <p key={i} className="text-muted-foreground leading-relaxed">{block.text}</p>;
            })}
          </article>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="glass rounded-2xl p-8 mt-14 text-center">
            <h3 className="text-xl font-bold font-['Outfit'] mb-2">Need engineering expertise?</h3>
            <p className="text-sm text-muted-foreground mb-5">Let's discuss how Injaazh can architect your next project.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild><Link to="/estimator">Get a Quote</Link></Button>
              <Button asChild variant="outline"><Link to="/contact">Contact Us</Link></Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
