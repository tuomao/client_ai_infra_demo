'use client';

import React from 'react';
import { Card, Empty, Space } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function AppEvaluationPage() {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <BarChartOutlined style={{ color: '#52c41a' }} />
            应用评测
          </h1>
          <p style={{ color: '#8c8c8c' }}>
            Agent评测任务管理、测试用例执行、性能指标分析
          </p>
        </div>

        <Card>
          <Empty description="应用评测功能开发中..." />
        </Card>
      </Space>
    </MainLayout>
  );
}


