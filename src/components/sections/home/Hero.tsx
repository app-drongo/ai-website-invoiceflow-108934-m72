'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Zap, Clock } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState, useEffect } from 'react';

const DEFAULT_HERO = {
  badge: 'Trusted by 10,000+ businesses',
  title: 'Invoice smarter, get paid faster',
  subtitle:
    'Streamlined invoicing that gets you paid faster and keeps you focused on growth. Professional invoices in seconds, not hours.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  features: [
    'Create professional invoices in under 30 seconds',
    'Automated payment reminders that actually work',
    'Get paid 40% faster with smart payment options',
  ],
  stats: [
    { label: 'Average payment time', value: '12 days', icon: 'clock' },
    { label: 'Invoice creation', value: '30 sec', icon: 'zap' },
    { label: 'Payment success rate', value: '98%', icon: 'check' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'zap':
        return <Zap className="h-5 w-5 text-primary" />;
      case 'check':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      default:
        return <CheckCircle className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <section
      id="hero"
      className="bg-background text-foreground min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Badge */}
          <div className="mb-8">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground px-4 py-2 text-sm font-medium"
            >
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={handlePrimaryClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Features List */}
          <div className="mb-16">
            <ul className="space-y-4 text-left max-w-2xl mx-auto">
              {config.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-lg" data-editable={`features[${idx}]`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {config.stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-card text-card-foreground rounded-lg border border-border"
              >
                <div className="flex justify-center mb-3">{getIcon(stat.icon)}</div>
                <div
                  className="text-2xl sm:text-3xl font-bold text-primary mb-2"
                  data-editable={`stats[${idx}].value`}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm text-muted-foreground"
                  data-editable={`stats[${idx}].label`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
