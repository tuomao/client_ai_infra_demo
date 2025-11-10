'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { favoriteTagGenerationConfig } from '@/lib/agent-configs';

export default function FavoriteTagGenerationPage() {
  return <UniversalAgent config={favoriteTagGenerationConfig} />;
}

