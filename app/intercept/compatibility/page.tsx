'use client';

import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Progress, Alert } from 'antd';
import { PlayCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function CompatibilityPage() {
  const [testing, setTesting] = useState(false);

  const deviceData = [
    {
      key: '1',
      device: 'iPhone 14 Pro',
      os: 'iOS 17.1',
      browser: 'Safari 17.1',
      status: 'passed',
      coverage: 98,
    },
    {
      key: '2',
      device: 'iPhone 13',
      os: 'iOS 16.5',
      browser: 'Safari 16.5',
      status: 'passed',
      coverage: 95,
    },
    {
      key: '3',
      device: 'Samsung Galaxy S23',
      os: 'Android 14',
      browser: 'Chrome 119',
      status: 'passed',
      coverage: 97,
    },
    {
      key: '4',
      device: 'Xiaomi 13',
      os: 'Android 13',
      browser: 'Chrome 118',
      status: 'failed',
      coverage: 85,
    },
    {
      key: '5',
      device: 'Huawei P50',
      os: 'Android 12',
      browser: 'Chrome 117',
      status: 'warning',
      coverage: 90,
    },
  ];

  const columns = [
    {
      title: '设备型号',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      key: 'os',
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: '测试状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
          passed: { color: 'success', text: '通过', icon: <CheckCircleOutlined /> },
          failed: { color: 'error', text: '失败', icon: <CloseCircleOutlined /> },
          warning: { color: 'warning', text: '警告', icon: <CloseCircleOutlined /> },
        };
        return (
          <Tag color={config[status].color} icon={config[status].icon}>
            {config[status].text}
          </Tag>
        );
      },
    },
    {
      title: '功能覆盖率',
      dataIndex: 'coverage',
      key: 'coverage',
      render: (coverage: number) => (
        <div style={{ width: 120 }}>
          <Progress
            percent={coverage}
            size="small"
            status={coverage >= 95 ? 'success' : coverage >= 85 ? 'normal' : 'exception'}
          />
        </div>
      ),
    },
  ];

  const handleStartTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
    }, 3000);
  };

  const passedCount = deviceData.filter(d => d.status === 'passed').length;
  const totalCount = deviceData.length;

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>兼容性测试Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            自动化测试应用在不同设备、系统和浏览器上的兼容性
          </p>
        </div>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Alert
              message={`测试覆盖 ${totalCount} 个设备配置，通过率 ${((passedCount / totalCount) * 100).toFixed(0)}%`}
              type="info"
              showIcon
            />

            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              size="large"
              loading={testing}
              onClick={handleStartTest}
            >
              {testing ? '测试进行中...' : '开始兼容性测试'}
            </Button>
          </Space>
        </Card>

        <Card title="测试矩阵" bordered={false}>
          <Table
            columns={columns}
            dataSource={deviceData}
            pagination={false}
          />
        </Card>

        <Card title="测试详情" bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <h4>通过的设备 ({passedCount})</h4>
              <Space wrap style={{ marginTop: 8 }}>
                {deviceData.filter(d => d.status === 'passed').map(d => (
                  <Tag key={d.key} color="green">{d.device}</Tag>
                ))}
              </Space>
            </div>

            <div style={{ marginTop: 16 }}>
              <h4>存在问题的设备</h4>
              <Space wrap style={{ marginTop: 8 }}>
                {deviceData.filter(d => d.status !== 'passed').map(d => (
                  <Tag key={d.key} color={d.status === 'failed' ? 'red' : 'orange'}>
                    {d.device}
                  </Tag>
                ))}
              </Space>
            </div>
          </Space>
        </Card>
      </Space>
    </MainLayout>
  );
}

