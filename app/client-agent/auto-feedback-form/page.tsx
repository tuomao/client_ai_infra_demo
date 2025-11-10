'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { autoFeedbackFormConfig } from '@/lib/agent-configs';

export default function AutoFeedbackFormPage() {
  return <UniversalAgent config={autoFeedbackFormConfig} />;
}

