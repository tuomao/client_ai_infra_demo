'use client';

import React from 'react';
import { Card, Empty, Space } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function AppDataPage() {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <LineChartOutlined style={{ color: '#52c41a' }} />
            应用数据
          </h1>
          <p style={{ color: '#8c8c8c' }}>
            应用运行数据、用户行为数据、业务指标数据查询分析
          </p>
        </div>

        <Card>
          <Empty description="应用数据功能开发中..." />
        </Card>
      </Space>
    </MainLayout>
  );
}


