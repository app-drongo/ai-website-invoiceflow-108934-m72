'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'InvoiceFlow',
  tagline: 'Streamlined invoicing that gets you paid faster',
  copyright: '© 2024 InvoiceFlow. All rights reserved.',

  // Product Links
  productTitle: 'Product',
  productLinks: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Templates', href: '/templates' },
  ],

  // Company Links
  companyTitle: 'Company',
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],

  // Support Links
  supportTitle: 'Support',
  supportLinks: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact', href: '/contact' },
    { label: 'API Docs', href: '/docs' },
  ],

  // Legal Links
  legalTitle: 'Legal',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],

  // Contact Info
  email: 'hello@invoiceflow.com',
  phone: '+1 (555) 123-4567',
  address: '123 Business Ave, Suite 100, San Francisco, CA 94105',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer id="footer" className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
              <p className="mt-2 text-sm">
                <span data-editable="tagline">{config.tagline}</span>
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span data-editable="email">{config.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span data-editable="address">{config.address}</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">
              <span data-editable="productTitle">{config.productTitle}</span>
            </h4>
            <ul className="space-y-2 text-sm">
              {config.productLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`productLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`productLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">
              <span data-editable="companyTitle">{config.companyTitle}</span>
            </h4>
            <ul className="space-y-2 text-sm">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">
              <span data-editable="supportTitle">{config.supportTitle}</span>
            </h4>
            <ul className="space-y-2 text-sm">
              {config.supportLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`supportLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`supportLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">
              <span data-editable="legalTitle">{config.legalTitle}</span>
            </h4>
            <ul className="space-y-2 text-sm">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <Separator className="my-8" />
        <div className="text-center text-sm">
          <span data-editable="copyright">{config.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
