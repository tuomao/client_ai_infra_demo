'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { rootCauseAnalysisConfig } from '@/lib/agent-configs';

export default function FeedbackAnalysisPage() {
  return <UniversalAgent config={rootCauseAnalysisConfig} />;
}