'use client';

import React from 'react';
import { Card, Alert, Button, Space, Upload } from 'antd';
import { UploadOutlined, LineChartOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function TracePage() {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Trace分析Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            分析性能追踪数据，生成火焰图，识别性能瓶颈
          </p>
        </div>

        <Card bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Alert
              message="功能说明"
              description="上传Trace数据文件，AI将自动分析性能瓶颈，生成火焰图和优化建议"
              type="info"
              showIcon
            />
            
            <Upload>
              <Button icon={<UploadOutlined />} size="large">
                上传Trace数据
              </Button>
            </Upload>

            <div style={{ textAlign: 'center', padding: 40, background: '#fafafa', borderRadius: 6 }}>
              <LineChartOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <p style={{ marginTop: 16, color: '#8c8c8c' }}>
                上传数据后将在此处显示火焰图
              </p>
            </div>
          </Space>
        </Card>
      </Space>
    </MainLayout>
  );
}

