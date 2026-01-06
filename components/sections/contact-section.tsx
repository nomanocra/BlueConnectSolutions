'use client';

import { useState } from 'react';
import { Token, Button } from '@/components/ui';
import { useTranslations } from '@/lib/i18n';

export function ContactSection() {
  const t = useTranslations();
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
    <section className="w-full pt-8 md:pt-20 pb-40 px-8 md:px-20 bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-16 items-center">
          {/* Header */}
          <div className="flex flex-col gap-6 items-center text-center max-w-[720px]">
            <Token label={t.contact.token} />
            <h1 className="text-title-2 md:text-title-tablet lg:text-title-1 font-bold text-foreground-main">
              {t.contact.title}
            </h1>
            <p className="text-text-l text-foreground-secondary leading-relaxed">
              {t.contact.subtitle}
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
                    {t.contact.form.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-text-m font-medium text-foreground-main"
                  >
                    {t.contact.form.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="company"
                  className="text-text-m font-medium text-foreground-main"
                >
                  {t.contact.form.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all"
                  placeholder={t.contact.form.companyPlaceholder}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-text-m font-medium text-foreground-main"
                >
                  {t.contact.form.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-[6px] bg-background-2 border border-background-4 text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:border-primary-3 focus:ring-2 focus:ring-primary-3/20 transition-all resize-none"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-4">
                <Button
                  label={isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                  variant="primary"
                  size="M"
                  rightIconVariant="arrow-right"
                  type="submit"
                  disabled={isSubmitting}
                />

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="text-text-m text-primary-3 text-center">
                    {t.contact.form.successMessage}
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-text-m text-red-500 text-center">
                    {t.contact.form.errorMessage}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="w-full max-w-[600px] pt-8 border-t border-background-4">
            <div className="flex flex-col gap-6">
              <h3 className="text-title-3 font-bold text-foreground-main">
                {t.contact.otherWays}
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-text-m font-medium text-foreground-main mb-1">
                    {t.contact.emailLabel}
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
                    {t.contact.locationLabel}
                  </p>
                  <p className="text-text-m text-foreground-secondary">
                    {t.contact.location}
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
