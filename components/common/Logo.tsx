'use client';

import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  style?: React.CSSProperties;
}

export default function AIWorkStudioLogo({ 
  size = 'medium', 
  showText = true,
  style 
}: LogoProps) {
  const sizeMap = {
    small: { icon: 24, text: 16 },
    medium: { icon: 32, text: 20 },
    large: { icon: 48, text: 28 },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: showText ? 12 : 0,
        ...style,
      }}
    >
      {/* Logo 图标 - AI Work Studio 创意设计 */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#1890ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4facfe', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00f2fe', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* 外圈科技感圆环 */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          strokeDasharray="4 2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 24 24;360 24 24"
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>

        {/* 内圈背景 */}
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="url(#gradient1)"
          opacity="0.08"
        />

        {/* 中央工作台图标 - 代表Studio */}
        <rect
          x="16"
          y="20"
          width="16"
          height="12"
          rx="2"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* 工作台腿部 */}
        <line x1="18" y1="32" x2="18" y2="36" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="32" x2="30" y2="36" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" />

        {/* 屏幕内容 - AI元素 */}
        <circle cx="21" cy="25" r="1.5" fill="#1890ff" opacity="0.8" />
        <circle cx="27" cy="25" r="1.5" fill="#00d4ff" opacity="0.8" />
        <circle cx="24" cy="28" r="1.5" fill="#667eea" opacity="0.8" />

        {/* AI神经网络连接线 */}
        <line x1="21" y1="25" x2="27" y2="25" stroke="#1890ff" strokeWidth="1.5" opacity="0.6" />
        <line x1="21" y1="25" x2="24" y2="28" stroke="#1890ff" strokeWidth="1.5" opacity="0.6" />
        <line x1="27" y1="25" x2="24" y2="28" stroke="#1890ff" strokeWidth="1.5" opacity="0.6" />

        {/* 顶部AI标识 */}
        <text x="24" y="16" textAnchor="middle" fontSize="6" fontWeight="bold" fill="url(#gradient2)">AI</text>

        {/* 动态光点效果 */}
        <circle cx="12" cy="12" r="1" fill="url(#gradient3)" opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="36" cy="36" r="1" fill="url(#gradient2)" opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="36" cy="12" r="0.8" fill="url(#gradient1)" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.2;0.8;0.2"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Logo 文字 */}
      {showText && (
        <div
          style={{
            fontSize: currentSize.text,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #1890ff 50%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Client AI Work Studio
        </div>
      )}
    </div>
  );
}



