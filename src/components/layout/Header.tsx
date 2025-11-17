'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, UserCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/submit', label: 'Submit Deed', icon: PlusCircle },
  { href: '/profile', label: 'My Aura', icon: UserCircle },
  { href: '/karma-index', label: 'Karma Index', icon: Sparkles },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between rounded-full p-2 bg-background/50 backdrop-blur-lg border border-border/20 shadow-md">
          <Link href="/" className="flex items-center gap-2 pl-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block font-bold text-lg font-headline">Karma Ledger</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Button
                  key={href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    'flex items-center gap-2 rounded-full',
                    isActive && 'bg-primary/20 text-primary'
                  )}
                >
                  <Link href={href} aria-label={label}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
          <Button className="rounded-full shadow-lg bg-gradient-to-br from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
