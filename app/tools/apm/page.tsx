'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Table, Tabs, Space } from 'antd';
import { LineChartOutlined, WarningOutlined, ClockCircleOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useAPMData } from '@/hooks/use-mock-data';
import { formatDateTime } from '@/lib/utils';

export default function APMPage() {
  const { data: apmData, loading } = useAPMData();

  const logColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (time: string) => formatDateTime(time),
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  const metricColumns = [
    {
      title: '指标名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
  ];

  const tabItems = [
    {
      key: 'logs',
      label: '日志',
      children: (
        <Table
          columns={logColumns}
          dataSource={apmData?.logs || []}
          loading={loading}
          rowKey="id"
        />
      ),
    },
    {
      key: 'metrics',
      label: '指标',
      children: (
        <Table
          columns={metricColumns}
          dataSource={apmData?.metrics || []}
          loading={loading}
          rowKey="name"
        />
      ),
    },
    {
      key: 'traces',
      label: 'Trace',
      children: (
        <div style={{ padding: 20, textAlign: 'center', color: '#8c8c8c' }}>
          Trace数据展示开发中...
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>APM监控</h1>
          <p style={{ color: '#8c8c8c' }}>
            应用性能监控数据查看和分析
          </p>
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="错误率"
                value={apmData?.stability.errorRate ? (apmData.stability.errorRate * 100).toFixed(2) : 0}
                suffix="%"
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="平均响应时间"
                value={apmData?.performance.apiResponseTime || 0}
                suffix="ms"
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="可用性"
                value={apmData?.stability.availability ? (apmData.stability.availability * 100).toFixed(2) : 0}
                suffix="%"
                prefix={<LineChartOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Tabs items={tabItems} />
        </Card>
      </Space>
    </MainLayout>
  );
}

