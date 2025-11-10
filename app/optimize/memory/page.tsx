'use client';

import React from 'react';
import { Card, Alert, Button, Space, Upload } from 'antd';
import { UploadOutlined, FundOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function MemoryPage() {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Memory分析Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            分析内存快照，检测内存泄漏，提供优化建议
          </p>
        </div>

        <Card bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Alert
              message="功能说明"
              description="上传内存快照文件，AI将自动分析内存使用情况，检测潜在的内存泄漏问题"
              type="info"
              showIcon
            />
            
            <Upload>
              <Button icon={<UploadOutlined />} size="large">
                上传内存快照
              </Button>
            </Upload>

            <div style={{ textAlign: 'center', padding: 40, background: '#fafafa', borderRadius: 6 }}>
              <FundOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <p style={{ marginTop: 16, color: '#8c8c8c' }}>
                上传数据后将在此处显示内存分析结果
              </p>
            </div>
          </Space>
        </Card>
      </Space>
    </MainLayout>
  );
}

