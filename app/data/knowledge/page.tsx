'use client';

import React from 'react';
import { Card, Empty, Space } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function KnowledgePage() {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <DatabaseOutlined style={{ color: '#52c41a' }} />
            知识库
          </h1>
          <p style={{ color: '#8c8c8c' }}>
            业务领域知识库、SOP文档、最佳实践等知识管理
          </p>
        </div>

        <Card>
          <Empty description="知识库功能开发中..." />
        </Card>
      </Space>
    </MainLayout>
  );
}


