'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface StreamingTextProps {
  text: string;
  speed?: number; // 每个字符的延迟时间（毫秒）
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  autoScroll?: boolean; // 是否自动滚动到底部
  scrollContainerRef?: React.RefObject<HTMLElement>; // 滚动容器的ref
}

export default function StreamingText({ 
  text, 
  speed = 30,
  onComplete,
  className,
  style,
  autoScroll = true,
  scrollContainerRef
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const textElementRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (!autoScroll) return;
    
    const container = scrollContainerRef?.current || 
                     textElementRef.current?.closest('[style*="overflow"]') ||
                     window;
    
    if (container === window) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else if (container instanceof HTMLElement) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // 重置状态
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    const stream = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(stream, speed);
        
        // 每次更新文本后尝试滚动
        if (autoScroll) {
          setTimeout(scrollToBottom, 50);
        }
      } else {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
        // 完成后也滚动一次
        if (autoScroll) {
          setTimeout(scrollToBottom, 100);
        }
      }
    };

    // 开始流式输出
    timeoutRef.current = setTimeout(stream, speed);

    // 清理函数
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, onComplete, autoScroll]);

  return (
    <div ref={textElementRef}>
      <Paragraph 
        className={className}
        style={{ 
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          ...style 
        }}
      >
        {displayedText}
        {!isComplete && (
          <span 
            style={{ 
              display: 'inline-block',
              width: 2,
              height: '1em',
              background: '#1890ff',
              marginLeft: 2,
              animation: 'blink 1s infinite'
            }}
          />
        )}
        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </Paragraph>
    </div>
  );
}

