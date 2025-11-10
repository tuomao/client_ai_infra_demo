'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { hotfixAgentConfig } from '@/lib/agent-configs';

export default function HotfixAgentPage() {
  return <UniversalAgent config={hotfixAgentConfig} />;
}