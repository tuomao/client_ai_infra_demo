'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeViewerProps {
  code: string;
  language?: string;
  height?: number | string;
  readOnly?: boolean;
  theme?: 'vs-light' | 'vs-dark';
}

export default function CodeViewer({
  code,
  language = 'typescript',
  height = 400,
  readOnly = true,
  theme = 'vs-light',
}: CodeViewerProps) {
  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 6, overflow: 'hidden' }}>
      <Editor
        height={height}
        language={language}
        value={code}
        theme={theme}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}

