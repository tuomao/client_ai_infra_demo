'use client';

import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Input, Select, Space, Button, Spin } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { useWhiteScreenIssues } from '@/hooks/use-mock-data';
import { formatRelativeTime, formatNumber } from '@/lib/utils';
import type { WhiteScreenIssue } from '@/lib/types';

const { Option } = Select;

export default function WhiteScreenListPage() {
  const { data: issues, loading, error } = useWhiteScreenIssues();
  const [filteredData, setFilteredData] = useState<WhiteScreenIssue[]>([]);
  const [searchText, setSearchText] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (issues) {
      let filtered = [...issues];

      // 搜索过滤
      if (searchText) {
        filtered = filtered.filter(issue =>
          issue.title.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      // 严重程度过滤
      if (severityFilter !== 'all') {
        filtered = filtered.filter(issue => issue.severity === severityFilter);
      }

      // 状态过滤
      if (statusFilter !== 'all') {
        filtered = filtered.filter(issue => issue.status === statusFilter);
      }

      setFilteredData(filtered);
    }
  }, [issues, searchText, severityFilter, statusFilter]);

  const columns = [
    {
      title: '问题ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <Link href={`/analysis/white-screen/${id}`}>
          <span style={{ color: '#1890ff', cursor: 'pointer' }}>{id}</span>
        </Link>
      ),
    },
    {
      title: '问题标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (title: string, record: WhiteScreenIssue) => (
        <Link href={`/analysis/white-screen/${record.id}`}>
          <div style={{ cursor: 'pointer' }}>
            <div style={{ fontWeight: 500 }}>{title}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              {record.errorStack.split('\n')[0].substring(0, 100)}...
            </div>
          </div>
        </Link>
      ),
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      filters: [
        { text: '严重', value: 'critical' },
        { text: '高', value: 'high' },
        { text: '中', value: 'medium' },
        { text: '低', value: 'low' },
      ],
      render: (severity: string) => {
        const colorMap: Record<string, string> = {
          critical: 'red',
          high: 'orange',
          medium: 'gold',
          low: 'green',
        };
        const textMap: Record<string, string> = {
          critical: '严重',
          high: '高',
          medium: '中',
          low: '低',
        };
        return <Tag color={colorMap[severity]}>{textMap[severity]}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [
        { text: '待处理', value: 'pending' },
        { text: '分析中', value: 'analyzing' },
        { text: '已解决', value: 'resolved' },
        { text: '已忽略', value: 'ignored' },
      ],
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          pending: 'default',
          analyzing: 'processing',
          resolved: 'success',
          ignored: 'default',
        };
        const textMap: Record<string, string> = {
          pending: '待处理',
          analyzing: '分析中',
          resolved: '已解决',
          ignored: '已忽略',
        };
        return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
      },
    },
    {
      title: '影响用户',
      dataIndex: 'affectedUsers',
      key: 'affectedUsers',
      width: 120,
      sorter: (a: WhiteScreenIssue, b: WhiteScreenIssue) => a.affectedUsers - b.affectedUsers,
      render: (users: number) => (
        <span style={{ fontWeight: 500 }}>{formatNumber(users)}</span>
      ),
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 100,
    },
    {
      title: '发生时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 120,
      sorter: (a: WhiteScreenIssue, b: WhiteScreenIssue) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      render: (timestamp: string) => formatRelativeTime(timestamp),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: WhiteScreenIssue) => (
        <Link href={`/analysis/white-screen/${record.id}`}>
          <Button type="link" size="small">查看详情</Button>
        </Link>
      ),
    },
  ];

  if (error) {
    return (
      <MainLayout>
        <Card>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: '#ff4d4f' }}>加载数据失败: {error.message}</p>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 页面标题 */}
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>白屏归因Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            自动分析白屏问题的根本原因，提供详细的错误分析和修复建议
          </p>
        </div>

        {/* 筛选和搜索 */}
        <Card bordered={false}>
          <Space size="middle" wrap>
            <Space.Compact style={{ width: 300 }}>
              <Input
                placeholder="搜索问题标题"
                allowClear
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={(e) => setSearchText(e.currentTarget.value)}
              />
            </Space.Compact>
            <Select
              style={{ width: 150 }}
              placeholder="严重程度"
              value={severityFilter}
              onChange={setSeverityFilter}
            >
              <Option value="all">全部严重程度</Option>
              <Option value="critical">严重</Option>
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
            <Select
              style={{ width: 150 }}
              placeholder="状态"
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">全部状态</Option>
              <Option value="pending">待处理</Option>
              <Option value="analyzing">分析中</Option>
              <Option value="resolved">已解决</Option>
              <Option value="ignored">已忽略</Option>
            </Select>
            <Button icon={<ReloadOutlined />}>刷新</Button>
          </Space>
        </Card>

        {/* 统计信息 */}
        <Card bordered={false}>
          <Space size="large">
            <div>
              <div style={{ fontSize: 14, color: '#8c8c8c' }}>总问题数</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
                {formatNumber(issues?.length || 0)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#8c8c8c' }}>待处理</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4, color: '#faad14' }}>
                {formatNumber(issues?.filter(i => i.status === 'pending').length || 0)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#8c8c8c' }}>分析中</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4, color: '#1890ff' }}>
                {formatNumber(issues?.filter(i => i.status === 'analyzing').length || 0)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#8c8c8c' }}>已解决</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4, color: '#52c41a' }}>
                {formatNumber(issues?.filter(i => i.status === 'resolved').length || 0)}
              </div>
            </div>
          </Space>
        </Card>

        {/* 问题列表 */}
        <Card bordered={false}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `共 ${total} 条`,
              showSizeChanger: true,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>
      </Space>
    </MainLayout>
  );
}

