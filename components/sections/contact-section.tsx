'use client';

import { useState } from 'react';
import { Token, Button } from '@/components/ui';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simuler l'envoi du formulaire
    try {
      // Ici vous pouvez ajouter votre logique d'envoi (API, email, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full pt-20 pb-40 px-2 md:px-20 bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-16 items-center">
          {/* Header */}
          <div className="flex flex-col gap-6 items-center text-center max-w-[720px]">
            <Token label="Take a rendez-vous" />
            <h1 className="text-title-2 md:text-title-tablet lg:text-title-1 font-bold text-foreground-main">
              Contact Us
            </h1>
            <p className="text-text-l text-foreground-secondary leading-relaxed">
              Have a question or want to learn more about our solutions? We'd
              love to hear from you. Fill out the form below and we'll get back
              to you as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <div className="w-full max-w-[600px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name and Email on same line */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-text-m font-medium text-foreground-main"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-text-m font-medium text-foreground-main"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="company"
                  className="text-text-m font-medium text-foreground-main"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all"
                  placeholder="Your company name"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-text-m font-medium text-foreground-main"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all resize-none"
                  placeholder="Tell us about your project or question..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-4">
                <Button
                  label={isSubmitting ? 'Sending...' : 'Send Message'}
                  variant="primary"
                  size="M"
                  rightIconVariant="arrow-right"
                  type="submit"
                  disabled={isSubmitting}
                />

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="text-text-m text-primary-3 text-center">
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-text-m text-red-500 text-center">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="w-full max-w-[600px] pt-8 border-t border-background-4">
            <div className="flex flex-col gap-6">
              <h3 className="text-title-3 font-bold text-foreground-main">
                Other Ways to Reach Us
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-text-m font-medium text-foreground-main mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:contact@blueconnectsolutions.com"
                    className="text-text-m text-primary-3 hover:text-primary-2 transition-colors"
                  >
                    contact@blueconnectsolutions.com
                  </a>
                </div>
                <div>
                  <p className="text-text-m font-medium text-foreground-main mb-1">
                    Location
                  </p>
                  <p className="text-text-m text-foreground-secondary">
                    Occitanie, France
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
