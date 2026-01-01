'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { useFormSubmit } from '@/hooks/useFormSubmit';

const DEFAULT_CONTACT = {
  title: 'Get in Touch',
  subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  formTitle: 'Send us a message',
  nameLabel: 'Full Name',
  emailLabel: 'Email Address',
  companyLabel: 'Company',
  messageLabel: 'Message',
  submitText: 'Send Message',
  contactInfoTitle: 'Contact Information',
  officeAddress: '123 Business Street, Suite 100, New York, NY 10001',
  phoneNumber: '+1 (555) 123-4567',
  emailAddress: 'hello@company.com',
  businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
  contactInfo: [
    {
      icon: 'MapPin',
      label: 'Office Address',
      value: '123 Business Street, Suite 100, New York, NY 10001',
    },
    {
      icon: 'Phone',
      label: 'Phone Number',
      value: '+1 (555) 123-4567',
    },
    {
      icon: 'Mail',
      label: 'Email Address',
      value: 'hello@company.com',
    },
  ],
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { submitForm, isSubmitting } = useFormSubmit();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await submitForm('/api/contact', formData);
      setFormData({ name: '', email: '', company: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="h-5 w-5" />;
      case 'Phone':
        return <Phone className="h-5 w-5" />;
      case 'Mail':
        return <Mail className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">
                <span data-editable="formTitle">{config.formTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <span data-editable="nameLabel">{config.nameLabel}</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-destructive' : ''}
                      required
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <span data-editable="emailLabel">{config.emailLabel}</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-destructive' : ''}
                      required
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    <span data-editable="companyLabel">{config.companyLabel}</span>
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={e => handleInputChange('company', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    <span data-editable="messageLabel">{config.messageLabel}</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    className={errors.message ? 'border-destructive' : ''}
                    required
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  <span data-editable="submitText">
                    {isSubmitting ? 'Sending...' : config.submitText}
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-muted text-muted-foreground">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  <span data-editable="contactInfoTitle">{config.contactInfoTitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {config.contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                      {getIcon(info.icon)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        <span data-editable={`contactInfo[${idx}].label`}>{info.label}</span>
                      </h3>
                      <p className="text-muted-foreground">
                        <span data-editable={`contactInfo[${idx}].value`}>{info.value}</span>
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4 pt-4 border-t border-border">
                  <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      <span data-editable="businessHours">{config.businessHours}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
