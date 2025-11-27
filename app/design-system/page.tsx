'use client';

import { useState } from 'react';
import { Button, Icon, type IconVariant } from '@/components/ui';

type Section = 'colors' | 'texts' | 'svg' | 'button';

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<Section>('colors');

  return (
    <div className="min-h-screen bg-background-1">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-background-2 border-r border-background-4 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-6">
              Design System
            </h2>
            <nav className="space-y-2">
              <NavItem
                id="colors"
                label="Colors"
                active={activeSection === 'colors'}
                onClick={() => setActiveSection('colors')}
              />
              <NavItem
                id="texts"
                label="Texts"
                active={activeSection === 'texts'}
                onClick={() => setActiveSection('texts')}
              />
              <NavItem
                id="svg"
                label="Icon"
                active={activeSection === 'svg'}
                onClick={() => setActiveSection('svg')}
              />
              <div className="pt-4 border-t border-background-4">
                <p className="text-text-s font-geist font-medium text-foreground-secondary mb-2 px-3">
                  Components
                </p>
                <NavItem
                  id="button"
                  label="Button"
                  active={activeSection === 'button'}
                  onClick={() => setActiveSection('button')}
                />
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeSection === 'colors' && <ColorsSection />}
          {activeSection === 'texts' && <TextsSection />}
          {activeSection === 'svg' && <IconSection />}
          {activeSection === 'button' && <ButtonSection />}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-3 py-2 rounded-lg transition-colors
        ${
          active
            ? 'bg-primary-3 text-foreground-main'
            : 'text-foreground-secondary hover:bg-background-3 hover:text-foreground-main'
        }
      `}
    >
      <span className="text-text-m font-geist font-medium">{label}</span>
    </button>
  );
}

function ColorsSection() {
  const primaryColors = [
    { name: 'Primary/1', value: '#94b9e5', token: 'primary-1' },
    { name: 'Primary/2', value: '#5b95d5', token: 'primary-2' },
    { name: 'Primary/3', value: '#3576c0', token: 'primary-3' },
    { name: 'Primary/4', value: '#255da4', token: 'primary-4' },
    { name: 'Primary/5', value: '#1f4a85', token: 'primary-5' },
    { name: 'Primary/t10', value: '#3576c01a', token: 'primary-t10' },
    { name: 'Primary/t20', value: '#3576c033', token: 'primary-t20' },
    { name: 'Primary/t30', value: '#3576c04d', token: 'primary-t30' },
  ];

  const backgroundColors = [
    { name: 'Background/1', value: '#020306', token: 'background-1' },
    { name: 'Background/2', value: '#04060a', token: 'background-2' },
    { name: 'Background/3', value: '#060a0f', token: 'background-3' },
    { name: 'Background/4', value: '#0a0e14', token: 'background-4' },
    { name: 'Background/5', value: '#0f141c', token: 'background-5' },
    { name: 'Background/t80', value: '#060a0fcc', token: 'background-t80' },
  ];

  const foregroundColors = [
    { name: 'Foreground/Main', value: '#ffffff', token: 'foreground-main' },
    {
      name: 'Foreground/Secondary',
      value: '#b1becb',
      token: 'foreground-secondary',
    },
    {
      name: 'Foreground/Terciary',
      value: '#738292',
      token: 'foreground-terciary',
    },
    {
      name: 'Foreground/Negatif',
      value: '#0f141c',
      token: 'foreground-negatif',
    },
    {
      name: 'Text&Icon/Negatif',
      value: '#ffffff',
      token: 'text-icon-negatif',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-geist font-bold text-foreground-main mb-8">
        Colors
      </h1>

      <div className="space-y-12">
        {/* Primary Colors */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-4">
            Primary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {primaryColors.map((color) => (
              <ColorCard key={color.token} color={color} />
            ))}
          </div>
        </section>

        {/* Background Colors */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-4">
            Background
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {backgroundColors.map((color) => (
              <ColorCard key={color.token} color={color} />
            ))}
          </div>
        </section>

        {/* Foreground Colors */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-4">
            Foreground
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {foregroundColors.map((color) => (
              <ColorCard key={color.token} color={color} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorCard({
  color,
}: {
  color: { name: string; value: string; token: string };
}) {
  return (
    <div className="bg-background-3 border border-background-4 rounded-lg p-4">
      <div
        className="w-full h-24 rounded-lg mb-3 border border-background-4"
        style={{ backgroundColor: color.value }}
      />
      <div className="space-y-1">
        <p className="text-text-s font-geist font-medium text-foreground-main">
          {color.name}
        </p>
        <p className="text-text-xs font-geist font-normal text-foreground-terciary font-mono">
          {color.value}
        </p>
        <p className="text-text-xs font-geist font-normal text-foreground-secondary font-mono">
          {color.token}
        </p>
      </div>
    </div>
  );
}

function TextsSection() {
  const titleStyles = [
    {
      name: 'Title/1',
      classes: 'text-title-1 font-geist font-bold',
      description: '82px, Bold, Line Height: 86px',
    },
    {
      name: 'Title/2',
      classes: 'text-title-2 font-geist font-bold',
      description: '48px, Bold, Line Height: 48px',
    },
    {
      name: 'Title/3',
      classes: 'text-title-3 font-geist font-semibold',
      description: '24px, SemiBold, Line Height: 32px',
    },
  ];

  const textStyles = [
    {
      name: 'Text/L/Regular',
      classes: 'text-text-l font-geist font-normal',
      description: '18px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/L/Medium',
      classes: 'text-text-l font-geist font-medium',
      description: '18px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/L/Bold',
      classes: 'text-text-l font-geist font-bold',
      description: '18px, Bold, Line Height: 100%',
    },
    {
      name: 'Text/M/Regular',
      classes: 'text-text-m font-geist font-normal',
      description: '16px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/M/Medium',
      classes: 'text-text-m font-geist font-medium',
      description: '16px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/M/Bold',
      classes: 'text-text-m font-geist font-bold',
      description: '16px, Bold, Line Height: 100%',
    },
    {
      name: 'Text/S/Regular',
      classes: 'text-text-s font-geist font-normal',
      description: '14px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/S/Medium',
      classes: 'text-text-s font-geist font-medium',
      description: '14px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/S/Bold',
      classes: 'text-text-s font-geist font-bold',
      description: '14px, Bold, Line Height: 100%',
    },
    {
      name: 'Text/XS/Regular',
      classes: 'text-text-xs font-geist font-normal',
      description: '12px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/XS/Medium',
      classes: 'text-text-xs font-geist font-medium',
      description: '12px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/XS/Bold',
      classes: 'text-text-xs font-geist font-bold',
      description: '12px, Bold, Line Height: 100%',
    },
  ];

  const bodyStyles = [
    {
      name: 'Body/Regular',
      classes: 'text-body-regular font-inter font-normal',
      description: '16px, Regular, Line Height: 24px',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-geist font-bold text-foreground-main mb-8">
        Texts
      </h1>

      <div className="space-y-12">
        {/* Titles */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-4">
            Titles (Geist)
          </h2>
          <div className="space-y-6">
            {titleStyles.map((style) => (
              <TextCard key={style.name} style={style} />
            ))}
          </div>
        </section>

        {/* Text Styles */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-4">
            Text Styles (Geist)
          </h2>
          <div className="space-y-4">
            {textStyles.map((style) => (
              <TextCard key={style.name} style={style} />
            ))}
          </div>
        </section>

        {/* Body */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-4">
            Body (Inter)
          </h2>
          <div className="space-y-4">
            {bodyStyles.map((style) => (
              <TextCard key={style.name} style={style} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function TextCard({
  style,
}: {
  style: { name: string; classes: string; description: string };
}) {
  return (
    <div className="bg-background-3 border border-background-4 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-text-m font-geist font-medium text-foreground-main mb-1">
            {style.name}
          </p>
          <p className="text-text-s font-geist font-normal text-foreground-terciary">
            {style.description}
          </p>
        </div>
        <code className="text-text-xs font-mono text-foreground-secondary bg-background-2 px-2 py-1 rounded">
          {style.classes}
        </code>
      </div>
      <div className={style.classes + ' text-foreground-main'}>
        The quick brown fox jumps over the lazy dog
      </div>
    </div>
  );
}

function IconSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconVariant | null>(null);

  const iconVariants: IconVariant[] = [
    'arrow-right',
    'arrow-left',
    'arrow-down',
    'security',
    'broadcast',
    'edge',
  ];

  const filteredIcons = iconVariants.filter((variant) =>
    variant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-geist font-bold text-foreground-main mb-8">
        Icon
      </h1>

      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-background-2 border border-background-4 rounded-lg text-text-m font-geist text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:ring-2 focus:ring-primary-3 focus:border-transparent"
        />
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredIcons.map((variant) => (
          <button
            key={variant}
            onClick={() => setSelectedIcon(variant)}
            className="bg-background-3 border border-background-4 rounded-lg p-6 flex flex-col items-center justify-center space-y-4 hover:border-primary-3 hover:bg-background-4 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-background-2 rounded-lg">
              <Icon variant={variant} size={32} />
            </div>
            <div className="text-center">
              <p className="text-text-m font-geist font-medium text-foreground-main mb-1">
                {variant}
              </p>
              <code className="text-text-xs font-mono text-foreground-secondary bg-background-2 px-2 py-1 rounded">
                {variant}
              </code>
            </div>
          </button>
        ))}
      </div>

      {/* Modal/Popup */}
      {selectedIcon && (
        <IconModal
          variant={selectedIcon}
          onClose={() => setSelectedIcon(null)}
        />
      )}
    </div>
  );
}

function IconModal({
  variant,
  onClose,
}: {
  variant: IconVariant;
  onClose: () => void;
}) {
  const codeExample = `<Icon variant="${variant}" size={24} />`;
  const buttonExample = `<Button 
  label="Click me" 
  rightIconVariant="${variant}" 
/>`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-background-2 border border-background-4 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main">
            {variant}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground-secondary hover:text-foreground-main transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Icon Preview */}
        <div className="flex items-center justify-center w-32 h-32 bg-background-3 rounded-lg mb-8 mx-auto">
          <Icon variant={variant} size={64} />
        </div>

        {/* Code Examples */}
        <div className="space-y-6">
          <div>
            <h3 className="text-text-l font-geist font-bold text-foreground-main mb-3">
              Standalone Icon
            </h3>
            <div className="bg-background-3 rounded-lg p-4 overflow-x-auto">
              <pre className="text-text-s font-mono text-foreground-main">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-text-l font-geist font-bold text-foreground-main mb-3">
              In Button
            </h3>
            <div className="bg-background-3 rounded-lg p-4 overflow-x-auto">
              <pre className="text-text-s font-mono text-foreground-main whitespace-pre">
                <code>{buttonExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-geist font-bold text-foreground-main mb-8">
        Button
      </h1>

      <div className="space-y-12">
        {/* Primary Variant */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-6">
            Primary
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button label="Size M" variant="primary" size="M" />
              <Button label="Size S" variant="primary" size="S" />
              <Button label="Size XS" variant="primary" size="XS" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button label="Disabled M" variant="primary" size="M" disabled />
              <Button label="Disabled S" variant="primary" size="S" disabled />
              <Button
                label="Disabled XS"
                variant="primary"
                size="XS"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Secondary Variant */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-6">
            Secondary
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button label="Size M" variant="secondary" size="M" />
              <Button label="Size S" variant="secondary" size="S" />
              <Button label="Size XS" variant="secondary" size="XS" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                label="Disabled M"
                variant="secondary"
                size="M"
                disabled
              />
              <Button
                label="Disabled S"
                variant="secondary"
                size="S"
                disabled
              />
              <Button
                label="Disabled XS"
                variant="secondary"
                size="XS"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Ghost Variant */}
        <section>
          <h2 className="text-title-3 font-geist font-semibold text-foreground-main mb-6">
            Ghost
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button label="Size M" variant="ghost" size="M" />
              <Button label="Size S" variant="ghost" size="S" />
              <Button label="Size XS" variant="ghost" size="XS" />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button label="Disabled M" variant="ghost" size="M" disabled />
              <Button label="Disabled S" variant="ghost" size="S" disabled />
              <Button label="Disabled XS" variant="ghost" size="XS" disabled />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
