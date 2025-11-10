'use client';

import React from 'react';
import UniversalAgent from '@/components/agent/UniversalAgent';
import { emojiRecommendationConfig } from '@/lib/agent-configs';

export default function EmojiRecommendationPage() {
  return <UniversalAgent config={emojiRecommendationConfig} />;
}

