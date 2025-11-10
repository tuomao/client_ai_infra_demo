'use client';

import React from 'react';
import { Card, Alert, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function BlankScreenPage() {
  return (
    <MainLayout>
      <Card>
        <div style={{ textAlign: 'center', padding: 60 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>自屏归因Agent</h1>
          <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
            分析应用自动关闭屏幕的问题，提供详细的分析和修复建议
          </p>
          <Alert
            message="功能开发中"
            description="此功能正在开发中，敬请期待。您可以参考白屏归因Agent的完整实现。"
            type="info"
            showIcon
            style={{ marginBottom: 24, textAlign: 'left' }}
          />
          <Link href="/analysis/white-screen">
            <Button type="primary" icon={<ArrowRightOutlined />} size="large">
              查看白屏归因Agent（完整实现）
            </Button>
          </Link>
        </div>
      </Card>
    </MainLayout>
  );
}

