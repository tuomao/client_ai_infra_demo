'use client';

import React from 'react';
import { Card, Table, Tag, Badge } from 'antd';
import MainLayout from '@/components/layout/MainLayout';

export default function MCPResourcesPage() {
  const resources = [
    {
      key: '1',
      uri: 'file:///workspace/src/pages/HomePage.tsx',
      name: 'HomePage组件',
      type: 'file',
      server: 'Filesystem MCP',
      size: '2KB',
    },
    {
      key: '2',
      uri: 'git://commits/HEAD~10..HEAD',
      name: '最近10次提交',
      type: 'git',
      server: 'Git MCP',
      size: '4KB',
    },
  ];

  const columns = [
    {
      title: 'URI',
      dataIndex: 'uri',
      key: 'uri',
    },
    {
      title: '资源名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: '所属服务器',
      dataIndex: 'server',
      key: 'server',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>MCP资源</h1>
        <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
          通过MCP协议访问的各类资源
        </p>

        <Card>
          <Table columns={columns} dataSource={resources} />
        </Card>
      </div>
    </MainLayout>
  );
}



