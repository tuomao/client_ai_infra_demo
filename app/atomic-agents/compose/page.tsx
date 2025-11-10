'use client';

import React from 'react';
import { Card, Alert, Button } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function AtomicComposePage() {
  return (
    <MainLayout>
      <Card>
        <div style={{ textAlign: 'center', padding: 60 }}>
          <ThunderboltOutlined style={{ fontSize: 64, color: '#1890ff', marginBottom: 24 }} />
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Agent编排</h1>
          <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
            通过可视化编排，将多个原子Agent组合成复杂的工作流
          </p>
          <Alert
            message="功能开发中"
            description="可视化Agent编排器正在开发中，将支持拖拽式的流程设计。"
            type="info"
            showIcon
            style={{ marginBottom: 24, textAlign: 'left' }}
          />
          <Link href="/atomic-agents/list">
            <Button type="primary" size="large">
              返回Agent列表
            </Button>
          </Link>
        </div>
      </Card>
    </MainLayout>
  );
}



