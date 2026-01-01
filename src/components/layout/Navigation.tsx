'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'InvoiceFlow',
  brandHref: '#hero',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaText: 'Get Started',
  ctaHref: '#hero',
  mobileMenuLabel: 'Open navigation menu',
  closeMenuLabel: 'Close navigation menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleBrandClick = () => {
    navigate(config.brandHref);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="navigation" className="bg-background text-foreground border-b border-border">
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/90 p-2 h-auto"
              onClick={handleBrandClick}
              data-editable-href="brandHref"
              data-href={config.brandHref}
              aria-label="Webline - Go to homepage"
            >
              <svg
                className="h-8 w-auto md:h-10"
                viewBox="0 0 200 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 15L35 45L50 15M50 15L65 45L80 15M90 15V45M90 15H110C115.523 15 120 19.477 120 25V35C120 40.523 115.523 45 110 45H90M90 30H110M130 15V45M130 15L155 45M155 15V45M165 15V45M165 15H185C190.523 15 195 19.477 195 25V35C195 40.523 190.523 45 185 45H165M165 30H185"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="15" cy="30" r="3" fill="currentColor" />
                <circle cx="85" cy="30" r="3" fill="currentColor" />
                <circle cx="160" cy="30" r="3" fill="currentColor" />
              </svg>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {config.navItems.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
                  onClick={() => handleNavClick(item.href)}
                  data-editable-href={`navItems[${idx}].href`}
                  data-href={item.href}
                >
                  <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hover:bg-accent"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground border-border">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Navigation Items */}
                  <div className="flex flex-col space-y-4">
                    {config.navItems.map((item, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        className="justify-start text-lg text-foreground hover:text-primary hover:bg-accent"
                        onClick={() => handleNavClick(item.href)}
                        data-editable-href={`navItems[${idx}].href`}
                        data-href={item.href}
                      >
                        <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleCtaClick}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
