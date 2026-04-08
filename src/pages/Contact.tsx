import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/FadeIn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MapPin, Mail, Clock, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const offices = [
  { city: 'Dhaka', address: 'Banani, Block-F, Road 11', timezone: 'GMT+6' },
  { city: 'Dubai', address: 'Business Bay, Tower A', timezone: 'GMT+4' },
  { city: 'London', address: 'Canary Wharf, Level 18', timezone: 'GMT+0' },
];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent', description: 'We\'ll respond within 24 hours.' });
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">Contact</span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">Open a Channel</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Ready to start a project or have questions? We respond within 24 hours.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8">
          {/* Info */}
          <div className="space-y-6">
            <FadeIn className="glass rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <Mail size={20} className="text-primary" />
                <h3 className="font-bold">Email Us</h3>
              </div>
              <p className="text-sm text-muted-foreground">hello@injaazh.com</p>
            </FadeIn>

            <FadeIn delay={100} className="glass rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-primary" />
                <h3 className="font-bold">Response Time</h3>
              </div>
              <p className="text-sm text-muted-foreground">Under 24 hours for all inquiries. Priority support for retainer clients.</p>
            </FadeIn>

            <FadeIn delay={200}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><MapPin size={18} className="text-primary" /> Our Nodes</h3>
              <div className="space-y-3">
                {offices.map(o => (
                  <div key={o.city} className="glass rounded-xl p-5">
                    <p className="font-semibold text-sm">{o.city}</p>
                    <p className="text-xs text-muted-foreground">{o.address}</p>
                    <p className="text-xs text-primary mt-1">{o.timezone}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn delay={150} className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare size={20} className="text-primary" />
              <h3 className="text-lg font-bold">Send a Transmission</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" required className="bg-secondary/50 border-border/60 focus:ring-primary focus:border-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@company.com" required className="bg-secondary/50 border-border/60 focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Subject</label>
                <Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Project inquiry" required className="bg-secondary/50 border-border/60 focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Message</label>
                <Textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your project..." rows={5} required className="bg-secondary/50 border-border/60 focus:ring-primary focus:border-primary resize-none" />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send size={16} className="mr-2" /> Send Message
              </Button>
            </form>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
