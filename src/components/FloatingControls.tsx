import { useState, useEffect } from 'react';
import { ArrowUp, Sun, Moon, Monitor } from 'lucide-react';

type ThemeMode = 'system' | 'dark' | 'light';

function getSystemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove('light');
  if (mode === 'light') {
    root.classList.add('light');
  } else if (mode === 'system' && getSystemTheme() === 'light') {
    root.classList.add('light');
  }
}

export default function FloatingControls() {
  const [showTop, setShowTop] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('injaazh-theme') as ThemeMode) || 'system';
  });
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('injaazh-theme', theme);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      const handler = () => applyTheme('system');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const themes: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
    { mode: 'system', icon: Monitor, label: 'System' },
    { mode: 'dark', icon: Moon, label: 'Dark' },
    { mode: 'light', icon: Sun, label: 'Light' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className={`group flex items-center justify-center w-11 h-11 rounded-full glass-strong border border-primary/30 shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary hover:border-primary hover:shadow-primary/30 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
      </button>

      {/* Theme switcher */}
      <div className="relative">
        {themeOpen && (
          <div className="absolute bottom-14 right-0 glass-strong rounded-xl p-2 flex flex-col gap-1 min-w-[130px] shadow-xl shadow-primary/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {themes.map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => { setTheme(mode); setThemeOpen(false); }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  theme === mode
                    ? 'bg-primary/20 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setThemeOpen(!themeOpen)}
          className="group flex items-center justify-center w-11 h-11 rounded-full glass-strong border border-primary/30 shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary hover:border-primary hover:shadow-primary/30"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Sun className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
          ) : theme === 'dark' ? (
            <Moon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
          ) : (
            <Monitor className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}
