'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { blankScreenDetectionConfig } from '@/lib/agent-configs';

export default function BlankScreenDetectionPage() {
  return <UniversalAgent config={blankScreenDetectionConfig} />;
}

