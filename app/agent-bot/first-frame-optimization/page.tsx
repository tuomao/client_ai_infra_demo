'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { firstFrameOptimizationConfig } from '@/lib/agent-configs';

export default function FirstFrameOptimizationPage() {
  return <UniversalAgent config={firstFrameOptimizationConfig} />;
}