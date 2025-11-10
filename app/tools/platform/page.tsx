'use client';

import React from 'react';
import { Card, Tabs, Button, Space, Switch, Input, Form } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function PlatformPage() {
  const tabItems = [
    {
      key: 'switch',
      label: '功能开关',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Card size="small">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <span>白屏检测</span>
              <Switch defaultChecked />
            </Space>
          </Card>
          <Card size="small">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <span>性能监控</span>
              <Switch defaultChecked />
            </Space>
          </Card>
          <Card size="small">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <span>AI分析</span>
              <Switch defaultChecked />
            </Space>
          </Card>
        </Space>
      ),
    },
    {
      key: 'experiment',
      label: 'A/B实验',
      children: (
        <div style={{ padding: 20, textAlign: 'center', color: '#8c8c8c' }}>
          A/B实验配置开发中...
        </div>
      ),
    },
    {
      key: 'doc',
      label: '文档管理',
      children: (
        <Form layout="vertical">
          <Form.Item label="文档标题">
            <Input placeholder="输入文档标题" />
          </Form.Item>
          <Form.Item label="文档内容">
            <Input.TextArea rows={10} placeholder="输入文档内容" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />}>
              保存文档
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>工具平台</h1>
        <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
          功能开关、实验配置和文档管理
        </p>

        <Card>
          <Tabs items={tabItems} />
        </Card>
      </div>
    </MainLayout>
  );
}

