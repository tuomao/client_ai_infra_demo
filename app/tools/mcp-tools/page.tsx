'use client';

import React from 'react';
import { Card, Table, Tag, Button, Space } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function MCPToolsPage() {
  const tools = [
    {
      key: '1',
      name: 'read_file',
      description: '读取文件内容',
      server: 'Filesystem MCP',
      usage: 234,
      avgTime: '25ms',
    },
    {
      key: '2',
      name: 'write_file',
      description: '写入文件内容',
      server: 'Filesystem MCP',
      usage: 123,
      avgTime: '35ms',
    },
    {
      key: '3',
      name: 'search_files',
      description: '搜索文件内容',
      server: 'Filesystem MCP',
      usage: 456,
      avgTime: '150ms',
    },
    {
      key: '4',
      name: 'git_log',
      description: '查看Git提交历史',
      server: 'Git MCP',
      usage: 234,
      avgTime: '120ms',
    },
  ];

  const columns = [
    {
      title: '工具名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Space>
          <ThunderboltOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{name}</span>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '所属服务器',
      dataIndex: 'server',
      key: 'server',
      render: (server: string) => <Tag color="blue">{server}</Tag>,
    },
    {
      title: '调用次数',
      dataIndex: 'usage',
      key: 'usage',
      sorter: (a: any, b: any) => a.usage - b.usage,
    },
    {
      title: '平均耗时',
      dataIndex: 'avgTime',
      key: 'avgTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link" size="small">测试调用</Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>MCP工具</h1>
        <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
          MCP服务器提供的各类工具函数
        </p>

        <Card>
          <Table columns={columns} dataSource={tools} />
        </Card>
      </div>
    </MainLayout>
  );
}



