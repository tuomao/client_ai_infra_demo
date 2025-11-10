'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { alertAnalysisConfig } from '@/lib/agent-configs';

export default function AlertAnalysisPage() {
  return <UniversalAgent config={alertAnalysisConfig} />;
}