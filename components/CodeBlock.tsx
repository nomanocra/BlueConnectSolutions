'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false }
);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then((mod) => {
      setTheme(mod.vscDarkPlus);
    });
  }, []);

  if (!theme) {
    return (
      <div className="bg-background-3 rounded-lg p-4 overflow-x-auto">
        <pre className="text-text-s font-mono text-foreground-main whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="bg-background-3 rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={theme}
        customStyle={{
          backgroundColor: '#060a0f',
          padding: '16px',
          margin: 0,
          fontSize: '14px',
          fontFamily: 'monospace',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
