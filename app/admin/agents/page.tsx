'use client';

import React from 'react';
import { Card, Table, Tag, Button, Space, Switch } from 'antd';
import { PlusOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useAgents } from '@/hooks/use-mock-data';

export default function AgentsPage() {
  const { data: agents, loading } = useAgents();

  const columns = [
    {
      title: 'Agent名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      title: '策略',
      dataIndex: 'strategy',
      key: 'strategy',
      render: (strategy: string) => {
        const map: Record<string, string> = {
          'sequence': '顺序执行',
          'react': 'ReAct',
          'plan-execute': '计划执行',
        };
        return <Tag color="blue">{map[strategy] || strategy}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled: boolean) => (
        <Switch checked={enabled} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" icon={<SettingOutlined />}>配置</Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Agent管理</h1>
            <p style={{ color: '#8c8c8c' }}>
              配置和管理各类AI Agent
            </p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            新建Agent
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={agents}
            loading={loading}
            rowKey="id"
          />
        </Card>
      </Space>
    </MainLayout>
  );
}

