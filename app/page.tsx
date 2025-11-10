'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 默认重定向到架构页面
    router.replace('/architecture');
  }, [router]);

  // 显示加载状态，直到重定向完成
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      正在跳转到架构页面...
    </div>
  );
}
