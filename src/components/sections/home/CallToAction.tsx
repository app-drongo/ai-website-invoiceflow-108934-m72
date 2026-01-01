'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle, Users, Shield, Zap } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_CALLTOACTION = {
  headline: 'Ready to Transform Your Invoicing?',
  subheadline:
    'Join thousands of businesses already using InvoiceFlow to streamline their billing process',
  businessCount: '10,000+',
  businessText: 'businesses trust InvoiceFlow',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  benefits: ['No setup fees', 'Cancel anytime', '24/7 support'],
  trustIndicators: [
    { icon: 'Users', text: '10,000+ active users' },
    { icon: 'Shield', text: 'Bank-level security' },
    { icon: 'Zap', text: '99.9% uptime' },
  ],
  guaranteeText: '30-day money-back guarantee',
  urgencyText: 'Limited time: Get 2 months free!',
} as const;

type CallToActionProps = Partial<typeof DEFAULT_CALLTOACTION>;

export default function CallToAction(props: CallToActionProps) {
  const config = { ...DEFAULT_CALLTOACTION, ...props };
  const navigate = useSmartNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="h-5 w-5" />;
      case 'Shield':
        return <Shield className="h-5 w-5" />;
      case 'Zap':
        return <Zap className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <section id="calltoaction" className="bg-primary text-primary-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Badge */}
          <div className="mb-8">
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium animate-pulse"
            >
              <span data-editable="urgencyText">{config.urgencyText}</span>
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="mb-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span data-editable="headline">{config.headline}</span>
            </h2>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              <span data-editable="subheadline">{config.subheadline}</span>
            </p>
          </div>

          {/* Social Proof */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-6">
              <span
                className="text-3xl font-bold text-accent-foreground"
                data-editable="businessCount"
              >
                {config.businessCount}
              </span>
              <span data-editable="businessText">{config.businessText}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={handlePrimaryClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              data-editable-href="primaryCtaHref"
              data-href={config.primaryCtaHref}
            >
              <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
              <ArrowRight
                className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryClick}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg font-semibold"
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
            >
              <Play className="mr-2 h-5 w-5" />
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {config.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-foreground" />
                  <span data-editable={`benefits[${idx}]`}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {config.trustIndicators.map((indicator, idx) => (
                <Card key={idx} className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2 text-accent-foreground">
                      {getIcon(indicator.icon)}
                    </div>
                    <p className="text-sm font-medium">
                      <span data-editable={`trustIndicators[${idx}].text`}>{indicator.text}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Guarantee */}
          <div className="text-center">
            <p className="text-primary-foreground/80 font-medium">
              <span data-editable="guaranteeText">{config.guaranteeText}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
