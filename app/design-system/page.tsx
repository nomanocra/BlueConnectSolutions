'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Button,
  Header,
  Icon,
  Kpi,
  Link,
  Logo,
  Logos,
  Pillar,
  PillarIcon,
  Token,
  type IconVariant,
} from '@/components/ui';
import { CodeBlock } from '@/components/CodeBlock';

type Section =
  | 'colors'
  | 'texts'
  | 'svg'
  | 'button'
  | 'header'
  | 'kpi'
  | 'link'
  | 'logo'
  | 'logos'
  | 'pillar'
  | 'pillar-icon'
  | 'token';

const VALID_SECTIONS: Section[] = [
  'colors',
  'texts',
  'svg',
  'button',
  'header',
  'kpi',
  'link',
  'logo',
  'logos',
  'pillar',
  'pillar-icon',
  'token',
];

function DesignSystemContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionParam = searchParams.get('section') as Section | null;

  // Initialiser avec le paramètre URL ou 'colors' par défaut
  const [activeSection, setActiveSection] = useState<Section>(
    sectionParam && VALID_SECTIONS.includes(sectionParam)
      ? sectionParam
      : 'colors'
  );

  // Synchroniser l'état avec l'URL quand le paramètre change
  useEffect(() => {
    if (sectionParam && VALID_SECTIONS.includes(sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam]);

  // Fonction pour changer de section et mettre à jour l'URL
  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    // Mettre à jour l'URL sans recharger la page
    router.push(`/design-system?section=${section}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background-1">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-background-2 border-r border-background-4 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
              Design System
            </h2>
            <nav className="space-y-2">
              <p className="text-legend-m text-foreground-terciary mb-2 px-3">
                Tokens
              </p>
              <NavItem
                id="colors"
                label="Colors"
                active={activeSection === 'colors'}
                onClick={() => handleSectionChange('colors')}
              />
              <NavItem
                id="texts"
                label="Texts"
                active={activeSection === 'texts'}
                onClick={() => handleSectionChange('texts')}
              />
              <NavItem
                id="svg"
                label="Icon"
                active={activeSection === 'svg'}
                onClick={() => handleSectionChange('svg')}
              />
              <div className="pt-4 border-t border-background-5">
                <p className="text-legend-m text-foreground-terciary mb-2 px-3">
                  Components
                </p>
                <NavItem
                  id="button"
                  label="Button"
                  active={activeSection === 'button'}
                  onClick={() => handleSectionChange('button')}
                />
                <NavItem
                  id="header"
                  label="Header"
                  active={activeSection === 'header'}
                  onClick={() => handleSectionChange('header')}
                />
                <NavItem
                  id="kpi"
                  label="KPI"
                  active={activeSection === 'kpi'}
                  onClick={() => handleSectionChange('kpi')}
                />
                <NavItem
                  id="link"
                  label="Link"
                  active={activeSection === 'link'}
                  onClick={() => handleSectionChange('link')}
                />
                <NavItem
                  id="logo"
                  label="Logo"
                  active={activeSection === 'logo'}
                  onClick={() => handleSectionChange('logo')}
                />
                <NavItem
                  id="logos"
                  label="Logos"
                  active={activeSection === 'logos'}
                  onClick={() => handleSectionChange('logos')}
                />
                <NavItem
                  id="pillar"
                  label="Pillar"
                  active={activeSection === 'pillar'}
                  onClick={() => handleSectionChange('pillar')}
                />
                <NavItem
                  id="pillar-icon"
                  label="Pillar Icon"
                  active={activeSection === 'pillar-icon'}
                  onClick={() => handleSectionChange('pillar-icon')}
                />
                <NavItem
                  id="token"
                  label="Token"
                  active={activeSection === 'token'}
                  onClick={() => handleSectionChange('token')}
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
          {activeSection === 'header' && <HeaderSection />}
          {activeSection === 'kpi' && <KpiSection />}
          {activeSection === 'link' && <LinkSection />}
          {activeSection === 'logo' && <LogoSection />}
          {activeSection === 'logos' && <LogosSection />}
          {activeSection === 'pillar' && <PillarSection />}
          {activeSection === 'pillar-icon' && <PillarIconSection />}
          {activeSection === 'token' && <TokenSection />}
        </main>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background-1 flex items-center justify-center">
          <div className="text-foreground-main">Loading...</div>
        </div>
      }
    >
      <DesignSystemContent />
    </Suspense>
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
        w-full text-left px-3 h-8 rounded-lg transition-colors flex items-center
        ${
          active
            ? 'bg-primary-3 text-foreground-main'
            : 'text-foreground-main hover:bg-background-3'
        }
      `}
    >
      <span className="text-text-s font-medium">{label}</span>
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
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Colors
      </h1>

      <div className="space-y-12">
        {/* Primary Colors */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-4">
            Primary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {primaryColors.map((color) => (
              <ColorCard key={color.token} color={color} />
            ))}
          </div>
        </section>

        {/* Background Colors */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-4">
            Background
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {backgroundColors.map((color) => (
              <ColorCard key={color.token} color={color} />
            ))}
          </div>
        </section>

        {/* Foreground Colors */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-4">
            Foreground
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-background-3 border border-background-4 rounded-lg p-3 text-left hover:border-primary-3 hover:bg-background-4 transition-colors cursor-pointer group"
    >
      <div
        className="w-full h-16 rounded-lg mb-2 border border-background-4 relative flex items-center justify-center"
        style={{ backgroundColor: color.value }}
      >
        {copied && (
          <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
            <span className="text-text-xs font-medium text-foreground-main text-center px-1">
              Copied in clipboard
            </span>
          </div>
        )}
      </div>
      <div className="space-y-0.5">
        <p className="text-text-xs font-medium text-foreground-main">
          {color.name}
        </p>
        <p className="text-text-xs font-normal text-foreground-terciary font-mono">
          {color.value}
        </p>
        <p className="text-text-xs font-normal text-foreground-secondary font-mono">
          {color.token}
        </p>
      </div>
    </button>
  );
}

function TextsSection() {
  const titleStyles = [
    {
      name: 'Title/1',
      classes: 'text-title-1 font-bold',
      description: '82px, Bold, Line Height: 86px',
    },
    {
      name: 'Title/2',
      classes: 'text-title-2 font-bold',
      description: '48px, Bold, Line Height: 48px',
    },
    {
      name: 'Title/3',
      classes: 'text-title-3 font-semibold',
      description: '24px, SemiBold, Line Height: 32px',
    },
  ];

  const textStyles = [
    {
      name: 'Text/L/Regular',
      classes: 'text-text-l font-normal',
      description: '18px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/L/Medium',
      classes: 'text-text-l font-medium',
      description: '18px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/L/Bold',
      classes: 'text-text-l font-bold',
      description: '18px, Bold, Line Height: 100%',
    },
    {
      name: 'Text/M/Regular',
      classes: 'text-text-m font-normal',
      description: '16px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/M/Medium',
      classes: 'text-text-m font-medium',
      description: '16px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/M/Bold',
      classes: 'text-text-m font-bold',
      description: '16px, Bold, Line Height: 100%',
    },
    {
      name: 'Text/S/Regular',
      classes: 'text-text-s font-normal',
      description: '14px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/S/Medium',
      classes: 'text-text-s font-medium',
      description: '14px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/S/Bold',
      classes: 'text-text-s font-bold',
      description: '14px, Bold, Line Height: 100%',
    },
    {
      name: 'Text/XS/Regular',
      classes: 'text-text-xs font-normal',
      description: '12px, Regular, Line Height: 100%',
    },
    {
      name: 'Text/XS/Medium',
      classes: 'text-text-xs font-medium',
      description: '12px, Medium, Line Height: 100%',
    },
    {
      name: 'Text/XS/Bold',
      classes: 'text-text-xs font-bold',
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
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Texts
      </h1>

      <div className="space-y-12">
        {/* Titles */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-4">
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
          <h2 className="text-title-3 font-semibold text-foreground-main mb-4">
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
          <h2 className="text-title-3 font-semibold text-foreground-main mb-4">
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
          <p className="text-text-m font-medium text-foreground-main mb-1">
            {style.name}
          </p>
          <p className="text-text-s font-normal text-foreground-terciary">
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-title-2 font-bold text-foreground-main">Icon</h1>
        <input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-background-2 border border-background-4 rounded-lg text-text-m text-foreground-main placeholder:text-foreground-terciary focus:outline-none focus:ring-2 focus:ring-primary-3 focus:border-transparent"
        />
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {filteredIcons.map((variant) => (
          <button
            key={variant}
            onClick={() => setSelectedIcon(variant)}
            className="bg-background-3 border border-background-4 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 hover:border-primary-3 hover:bg-background-4 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-background-2 rounded-lg">
              <Icon variant={variant} size={24} />
            </div>
            <div className="text-center">
              <p className="text-text-s font-medium text-foreground-main mb-1">
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
          <h2 className="text-title-3 font-semibold text-foreground-main">
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
            <h3 className="text-text-l font-bold text-foreground-main mb-3">
              Standalone Icon
            </h3>
            <CodeBlock code={codeExample} language="tsx" />
          </div>

          <div>
            <h3 className="text-text-l font-bold text-foreground-main mb-3">
              In Button
            </h3>
            <CodeBlock code={buttonExample} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonSection() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Button
      </h1>

      <div className="space-y-12">
        {/* Primary Variant */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Primary
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal('primary')}
            />
          </div>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Secondary
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal('secondary')}
            />
          </div>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Ghost
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal('ghost')}
            />
          </div>
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

        {/* Icons Section */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            With Icons
          </h2>
          <div className="space-y-8">
            {/* Left Icon */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-text-l font-bold text-foreground-main">
                  Left Icon
                </h3>
                <Button
                  label="View code"
                  variant="ghost"
                  size="XS"
                  onClick={() => setOpenModal('left-icon')}
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="M"
                    leftIconVariant="arrow-left"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="M"
                    leftIconVariant="arrow-left"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="M"
                    leftIconVariant="arrow-left"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="S"
                    leftIconVariant="arrow-left"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="S"
                    leftIconVariant="arrow-left"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="S"
                    leftIconVariant="arrow-left"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="XS"
                    leftIconVariant="arrow-left"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="XS"
                    leftIconVariant="arrow-left"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="XS"
                    leftIconVariant="arrow-left"
                  />
                </div>
              </div>
            </div>

            {/* Right Icon */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-text-l font-bold text-foreground-main">
                  Right Icon
                </h3>
                <Button
                  label="View code"
                  variant="ghost"
                  size="XS"
                  onClick={() => setOpenModal('right-icon')}
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="M"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="M"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="M"
                    rightIconVariant="arrow-right"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="S"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="S"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="S"
                    rightIconVariant="arrow-right"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="XS"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="XS"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="XS"
                    rightIconVariant="arrow-right"
                  />
                </div>
              </div>
            </div>

            {/* Both Icons */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-text-l font-bold text-foreground-main">
                  Both Icons
                </h3>
                <Button
                  label="View code"
                  variant="ghost"
                  size="XS"
                  onClick={() => setOpenModal('both-icons')}
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="M"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="M"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="M"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="S"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="S"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="S"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    label="Primary"
                    variant="primary"
                    size="XS"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Secondary"
                    variant="secondary"
                    size="XS"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                  <Button
                    label="Ghost"
                    variant="ghost"
                    size="XS"
                    leftIconVariant="arrow-left"
                    rightIconVariant="arrow-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {openModal && (
        <ButtonCodeModal type={openModal} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}

function ButtonCodeModal({
  type,
  onClose,
}: {
  type: string;
  onClose: () => void;
}) {
  const getModalContent = () => {
    switch (type) {
      case 'primary':
      case 'secondary':
      case 'ghost':
        return {
          title: type.charAt(0).toUpperCase() + type.slice(1),
          buttons: (
            <>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Size M"
                  variant={type as 'primary' | 'secondary' | 'ghost'}
                  size="M"
                />
                <Button
                  label="Size S"
                  variant={type as 'primary' | 'secondary' | 'ghost'}
                  size="S"
                />
                <Button
                  label="Size XS"
                  variant={type as 'primary' | 'secondary' | 'ghost'}
                  size="XS"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Disabled M"
                  variant={type as 'primary' | 'secondary' | 'ghost'}
                  size="M"
                  disabled
                />
                <Button
                  label="Disabled S"
                  variant={type as 'primary' | 'secondary' | 'ghost'}
                  size="S"
                  disabled
                />
                <Button
                  label="Disabled XS"
                  variant={type as 'primary' | 'secondary' | 'ghost'}
                  size="XS"
                  disabled
                />
              </div>
            </>
          ),
          code: `<Button label="Click me" variant="${type}" size="M" />
<Button label="Click me" variant="${type}" size="S" />
<Button label="Click me" variant="${type}" size="XS" />
<Button label="Disabled" variant="${type}" size="M" disabled />`,
        };
      case 'left-icon':
        return {
          title: 'Left Icon',
          buttons: (
            <>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="M"
                  leftIconVariant="arrow-left"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="M"
                  leftIconVariant="arrow-left"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="M"
                  leftIconVariant="arrow-left"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="S"
                  leftIconVariant="arrow-left"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="S"
                  leftIconVariant="arrow-left"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="S"
                  leftIconVariant="arrow-left"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="XS"
                  leftIconVariant="arrow-left"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="XS"
                  leftIconVariant="arrow-left"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="XS"
                  leftIconVariant="arrow-left"
                />
              </div>
            </>
          ),
          code: `<Button 
  label="Click me" 
  variant="primary" 
  size="M" 
  leftIconVariant="arrow-left" 
/>

<Button 
  label="Click me" 
  variant="primary" 
  size="S" 
  leftIconVariant="arrow-left" 
/>

<Button 
  label="Click me" 
  variant="primary" 
  size="XS" 
  leftIconVariant="arrow-left" 
/>`,
        };
      case 'right-icon':
        return {
          title: 'Right Icon',
          buttons: (
            <>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="M"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="M"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="M"
                  rightIconVariant="arrow-right"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="S"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="S"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="S"
                  rightIconVariant="arrow-right"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="XS"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="XS"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="XS"
                  rightIconVariant="arrow-right"
                />
              </div>
            </>
          ),
          code: `<Button 
  label="Click me" 
  variant="primary" 
  size="M" 
  rightIconVariant="arrow-right" 
/>

<Button 
  label="Click me" 
  variant="primary" 
  size="S" 
  rightIconVariant="arrow-right" 
/>

<Button 
  label="Click me" 
  variant="primary" 
  size="XS" 
  rightIconVariant="arrow-right" 
/>`,
        };
      case 'both-icons':
        return {
          title: 'Both Icons',
          buttons: (
            <>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="M"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="M"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="M"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="S"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="S"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="S"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  label="Primary"
                  variant="primary"
                  size="XS"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Secondary"
                  variant="secondary"
                  size="XS"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
                <Button
                  label="Ghost"
                  variant="ghost"
                  size="XS"
                  leftIconVariant="arrow-left"
                  rightIconVariant="arrow-right"
                />
              </div>
            </>
          ),
          code: `<Button 
  label="Click me" 
  variant="primary" 
  size="M" 
  leftIconVariant="arrow-left"
  rightIconVariant="arrow-right" 
/>

<Button 
  label="Click me" 
  variant="primary" 
  size="S" 
  leftIconVariant="arrow-left"
  rightIconVariant="arrow-right" 
/>

<Button 
  label="Click me" 
  variant="primary" 
  size="XS" 
  leftIconVariant="arrow-left"
  rightIconVariant="arrow-right" 
/>`,
        };
      default:
        return {
          title: 'Button',
          buttons: null,
          code: '',
        };
    }
  };

  const { title, buttons, code } = getModalContent();

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
          <h2 className="text-title-3 font-semibold text-foreground-main">
            {title}
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

        {/* Button Examples */}
        {buttons && <div className="space-y-4 mb-8">{buttons}</div>}

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function LinkSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">Link</h1>

      <div className="space-y-12">
        {/* Variants Matrix */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Variants
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-auto border-collapse">
              <thead>
                <tr>
                  <th className="text-text-s font-medium text-foreground-terciary text-left"></th>
                  <th className="text-text-s font-medium text-foreground-terciary text-center px-12">
                    Selected
                  </th>
                  <th className="text-text-s font-medium text-foreground-terciary text-center p-6">
                    Not Selected
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-text-s font-medium text-foreground-terciary text-right px-9">
                    Enabled
                  </td>
                  <td className="p-6 text-center">
                    <Link href="#" selected>
                      Home
                    </Link>
                  </td>
                  <td className="p- text-center">
                    <Link href="#">Home</Link>
                  </td>
                </tr>
                <tr>
                  <td className="text-text-s font-medium text-foreground-terciary px-9 text-right">
                    Disabled
                  </td>
                  <td className="p-3 text-center">
                    <Link href="#" selected disabled>
                      Home
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                    <Link href="#" disabled>
                      Home
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <LinkCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function LinkCodeModal({ onClose }: { onClose: () => void }) {
  const code = `<Link href="/home" selected>
  Home
</Link>

<Link href="/home">
  Home
</Link>

<Link href="/home" selected disabled>
  Home
</Link>

<Link href="/home" disabled>
  Home
</Link>`;

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
          <h2 className="text-title-3 font-semibold text-foreground-main">
            Link Variants
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

        {/* Link Examples */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <Link href="#" selected disabled={false}>
              Selected, Enabled
            </Link>
            <Link href="#" selected={false} disabled={false}>
              Not Selected, Enabled
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="#" selected disabled>
              Selected, Disabled
            </Link>
            <Link href="#" selected={false} disabled>
              Not Selected, Disabled
            </Link>
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function LogoSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">Logo</h1>

      <div className="space-y-12">
        {/* Sizes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Sizes
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="flex flex-col gap-6 items-start">
            <div className="flex items-center gap-3">
              <p className="text-text-s font-medium text-foreground-terciary w-32">
                Default (32px)
              </p>
              <Logo />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-text-s font-medium text-foreground-terciary w-32">
                48px
              </p>
              <Logo size={48} />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-text-s font-medium text-foreground-terciary w-32">
                64px
              </p>
              <Logo size={64} />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-text-s font-medium text-foreground-terciary w-32">
                96px
              </p>
              <Logo size={96} />
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <LogoCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function LogoCodeModal({ onClose }: { onClose: () => void }) {
  const code = `<Logo />

<Logo size={48} />

<Logo size={64} />

<Logo size={96} />`;

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
          <h2 className="text-title-3 font-semibold text-foreground-main">
            Logo Sizes
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

        {/* Logo Examples */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3">
            <p className="text-text-s font-medium text-foreground-terciary w-32">
              Default (32px)
            </p>
            <Logo />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-text-s font-medium text-foreground-terciary w-32">
              48px
            </p>
            <Logo size={48} />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-text-s font-medium text-foreground-terciary w-32">
              64px
            </p>
            <Logo size={64} />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-text-s font-medium text-foreground-terciary w-32">
              96px
            </p>
            <Logo size={96} />
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function LogosSection() {
  const [openModal, setOpenModal] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier pour un scroll plus rapide
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Logos
      </h1>

      <div className="space-y-12">
        {/* Default Logos */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Default
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="bg-background-3 p-8 rounded-lg overflow-hidden">
            <Logos />
          </div>
        </section>

        {/* Custom Spacing */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            Custom Spacing
          </h2>
          <div
            ref={scrollContainerRef}
            className="bg-background-3 p-8 rounded-lg overflow-x-auto select-none"
            style={{ maxWidth: '100%', width: '100%' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{ width: 'max-content' }}>
              <Logos gap={100} paddingX={40} />
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <LogosCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function LogosCodeModal({ onClose }: { onClose: () => void }) {
  const code = `<Logos />

<Logos gap={100} paddingX={40} />`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-background-2 border border-background-4 rounded-lg p-8 max-w-[808px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-title-3 font-semibold text-foreground-main">
            Logos Component
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

        {/* Examples */}
        <div className="space-y-6 mb-8">
          <div className="bg-background-3 p-6 rounded-lg overflow-hidden">
            <Logos />
          </div>
          <div className="bg-background-3 p-6 rounded-lg overflow-x-auto">
            <Logos gap={100} paddingX={40} />
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function HeaderSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Header
      </h1>

      <div className="space-y-12">
        {/* Header with Links and CTA */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              With Links and CTA
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="bg-background-2 p-8 rounded-lg">
            <Header
              links={[
                { label: 'Home', href: '/', selected: true },
                { label: 'Our Solution', href: '/solution' },
                { label: 'About Us', href: '/about' },
              ]}
              ctaLabel="Contact Us"
              ctaHref="/contact"
            />
          </div>
        </section>

        {/* Header with Different Number of Links */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            Different Number of Links
          </h2>
          <div className="space-y-6">
            <div className="bg-background-2 p-8 rounded-lg">
              <p className="text-text-s text-foreground-terciary mb-4">
                2 links
              </p>
              <Header
                links={[
                  { label: 'Home', href: '/', selected: true },
                  { label: 'About', href: '/about' },
                ]}
                ctaLabel="Contact"
              />
            </div>
            <div className="bg-background-2 p-8 rounded-lg">
              <p className="text-text-s text-foreground-terciary mb-4">
                5 links
              </p>
              <Header
                links={[
                  { label: 'Home', href: '/', selected: true },
                  { label: 'Services', href: '/services' },
                  { label: 'Portfolio', href: '/portfolio' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'About', href: '/about' },
                ]}
                ctaLabel="Get Started"
              />
            </div>
          </div>
        </section>

        {/* Header with CTA Handler */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            With CTA Click Handler
          </h2>
          <div className="bg-background-2 p-8 rounded-lg">
            <Header
              links={[
                { label: 'Home', href: '/', selected: true },
                { label: 'Services', href: '/services' },
                { label: 'About', href: '/about' },
              ]}
              ctaLabel="Get Started"
              onCtaClick={() => alert('CTA button clicked!')}
            />
          </div>
        </section>

        {/* Header without CTA */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            Without CTA Button
          </h2>
          <div className="bg-background-2 p-8 rounded-lg">
            <Header
              links={[
                { label: 'Home', href: '/', selected: true },
                { label: 'Our Solution', href: '/solution' },
                { label: 'About Us', href: '/about' },
              ]}
            />
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <HeaderCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function HeaderCodeModal({ onClose }: { onClose: () => void }) {
  const code = `// Configuration du CTA avec un lien (href)
// Le bouton devient un lien vers l'URL spécifiée
<Header
  links={[
    { label: 'Home', href: '/', selected: true },
    { label: 'Our Solution', href: '/solution' },
    { label: 'About Us', href: '/about' },
  ]}
  ctaLabel="Contact Us"
  ctaHref="/contact"  // ← Le bouton redirige vers /contact
/>

// Configuration du CTA avec un handler (onClick)
// Le bouton exécute une fonction au clic
<Header
  links={[
    { label: 'Home', href: '/', selected: true },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
  ]}
  ctaLabel="Get Started"
  onCtaClick={() => {
    // Votre logique ici
    console.log('CTA clicked');
    // Exemple: ouvrir un modal, tracker un événement, etc.
  }}
/>

// Header sans CTA (seulement les liens de navigation)
<Header
  links={[
    { label: 'Home', href: '/', selected: true },
    { label: 'Our Solution', href: '/solution' },
    { label: 'About Us', href: '/about' },
  ]}
/>

// Header avec logo personnalisé et CTA
<Header
  logoHref="/home"
  links={[
    { label: 'Home', href: '/', selected: true },
    { label: 'About', href: '/about' },
  ]}
  ctaLabel="Contact"
  ctaHref="/contact"
/>

// Exemple avec différents nombres de liens
<Header
  links={[
    { label: 'Home', href: '/', selected: true },
    { label: 'About', href: '/about' },
  ]}
  ctaLabel="Contact"
  ctaHref="/contact"
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
          <h2 className="text-title-3 font-semibold text-foreground-main">
            Header Component
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

        {/* Header Examples */}
        <div className="space-y-6 mb-8">
          <div className="bg-background-3 p-6 rounded-lg">
            <Header
              links={[
                { label: 'Home', href: '/', selected: true },
                { label: 'Our Solution', href: '/solution' },
                { label: 'About Us', href: '/about' },
              ]}
              ctaLabel="Contact Us"
            />
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function PillarIconSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Pillar Icon
      </h1>

      <div className="space-y-12">
        {/* Default Sizes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Sizes
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col items-center gap-3">
              <PillarIcon size={48} />
              <p className="text-text-s text-foreground-terciary">48px</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <PillarIcon size={72} />
              <p className="text-text-s text-foreground-terciary">
                72px (default)
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <PillarIcon size={96} />
              <p className="text-text-s text-foreground-terciary">96px</p>
            </div>
          </div>
        </section>

        {/* Icon Variants */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            Icon Variants
          </h2>
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col items-center gap-3">
              <PillarIcon iconVariant="edge" />
              <p className="text-text-s text-foreground-terciary">Edge</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <PillarIcon iconVariant="security" />
              <p className="text-text-s text-foreground-terciary">Security</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <PillarIcon iconVariant="broadcast" />
              <p className="text-text-s text-foreground-terciary">Broadcast</p>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <PillarIconCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function PillarIconCodeModal({ onClose }: { onClose: () => void }) {
  const code = `<PillarIcon />

<PillarIcon size={48} />
<PillarIcon size={72} />
<PillarIcon size={96} />

<PillarIcon iconVariant="edge" />
<PillarIcon iconVariant="security" />
<PillarIcon iconVariant="broadcast" />

<PillarIcon icon={<CustomIcon />} />`;

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
          <h2 className="text-title-3 font-semibold text-foreground-main">
            Pillar Icon Component
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

        {/* Examples */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-wrap gap-6 items-end">
            <PillarIcon size={48} />
            <PillarIcon size={72} />
            <PillarIcon size={96} />
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function TokenSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Token
      </h1>

      <div className="space-y-12">
        {/* Default Token */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Default
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Token label="France" />
            <Token label="Made in France" />
            <Token label="IoT" />
            <Token label="Cybersecurity" />
          </div>
        </section>

        {/* Custom Flag Colors */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            Custom Flag Colors
          </h2>
          <div className="flex flex-wrap gap-4">
            <Token
              label="Custom 1"
              flagColors={{
                blue: '#10b981',
                white: '#fbbf24',
                red: '#8b5cf6',
              }}
            />
            <Token
              label="Custom 2"
              flagColors={{
                blue: '#ef4444',
                white: '#f59e0b',
                red: '#06b6d4',
              }}
            />
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <TokenCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function TokenCodeModal({ onClose }: { onClose: () => void }) {
  const code = `<Token label="France" />

<Token label="Made in France" />
<Token label="IoT" />

<Token
  label="Custom"
  flagColors={{
    blue: '#10b981',
    white: '#fbbf24',
    red: '#8b5cf6',
  }}
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
          <h2 className="text-title-3 font-semibold text-foreground-main">
            Token Component
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

        {/* Examples */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <Token label="France" />
            <Token label="Made in France" />
            <Token label="IoT" />
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function KpiSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">KPI</h1>

      <div className="space-y-12">
        {/* Default KPI */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Default
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="flex flex-wrap gap-8">
            <Kpi
              value="150+"
              label="Clients"
              description="Satisfied customers"
            />
            <Kpi
              value="99.9%"
              label="Uptime"
              description="Service availability"
            />
            <Kpi value="24/7" label="Support" description="Always available" />
          </div>
        </section>

        {/* KPI without Description */}
        <section>
          <h2 className="text-title-3 font-semibold text-foreground-main mb-6">
            Without Description
          </h2>
          <div className="flex flex-wrap gap-8">
            <Kpi value="500+" label="Projects" />
            <Kpi value="50+" label="Countries" />
            <Kpi value="10+" label="Years" />
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <KpiCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function KpiCodeModal({ onClose }: { onClose: () => void }) {
  const code = `<Kpi
  value="150+"
  label="Clients"
  description="Satisfied customers"
/>

<Kpi value="99.9%" label="Uptime" description="Service availability" />

<Kpi value="500+" label="Projects" />`;

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
          <h2 className="text-title-3 font-semibold text-foreground-main">
            KPI Component
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

        {/* Examples */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-wrap gap-8">
            <Kpi
              value="150+"
              label="Clients"
              description="Satisfied customers"
            />
            <Kpi value="99.9%" label="Uptime" />
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function PillarSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-title-2 font-bold text-foreground-main mb-8">
        Pillar
      </h1>

      <div className="space-y-12">
        {/* Default Pillar */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-3 font-semibold text-foreground-main">
              Default
            </h2>
            <Button
              label="View code"
              variant="ghost"
              size="XS"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="flex flex-wrap gap-8 items-end">
            <Pillar label="Edge Compute IoT" />
            <Pillar label="Small " height={0} />
            <Pillar label="Medium" height={150} />
            <Pillar label="Heigher" height={300} />
          </div>
        </section>
      </div>

      {/* Modal */}
      {openModal && <PillarCodeModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

function PillarCodeModal({ onClose }: { onClose: () => void }) {
  const code = `<Pillar label="Edge" />

<Pillar label="Small" height={70} />
<Pillar label="Medium" height={200} />
<Pillar label="Heigher" height={400} />`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-background-2 border border-background-4 rounded-lg p-8 max-w-[808px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-title-3 font-semibold text-foreground-main">
            Pillar Component
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

        {/* Examples */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-wrap gap-8 items-end">
            <Pillar label="Edge" />
            <Pillar label="Small" height={100} />
            <Pillar label="Medium" height={200} />
            <Pillar label="Heigher" height={400} />
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-text-l font-bold text-foreground-main mb-3">
            Implementation
          </h3>
          <CodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}
