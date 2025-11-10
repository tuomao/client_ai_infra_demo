'use client';

import React from 'react';
import { Card, Table, Tag, Space, Button, Timeline, Alert } from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function RiskMonitorPage() {
  const changeData = [
    {
      key: '1',
      id: 'CHG-2025-001',
      title: '首页组件重构',
      author: '张三',
      time: '2025-11-06 14:30',
      risk: 'high',
      files: 15,
      lines: '+452/-328',
      status: 'reviewing',
    },
    {
      key: '2',
      id: 'CHG-2025-002',
      title: '购物车逻辑优化',
      author: '李四',
      time: '2025-11-06 13:15',
      risk: 'medium',
      files: 8,
      lines: '+223/-156',
      status: 'approved',
    },
    {
      key: '3',
      id: 'CHG-2025-003',
      title: '修复商品详情页样式',
      author: '王五',
      time: '2025-11-06 11:00',
      risk: 'low',
      files: 3,
      lines: '+45/-12',
      status: 'deployed',
    },
  ];

  const columns = [
    {
      title: '变更ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '变更标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '提交人',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '风险等级',
      dataIndex: 'risk',
      key: 'risk',
      render: (risk: string) => {
        const config: Record<string, { color: string; text: string }> = {
          high: { color: 'red', text: '高风险' },
          medium: { color: 'orange', text: '中风险' },
          low: { color: 'green', text: '低风险' },
        };
        return <Tag color={config[risk].color}>{config[risk].text}</Tag>;
      },
    },
    {
      title: '影响文件',
      dataIndex: 'files',
      key: 'files',
      render: (files: number) => `${files} 个文件`,
    },
    {
      title: '代码行数',
      dataIndex: 'lines',
      key: 'lines',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
          reviewing: { color: 'processing', text: '评审中', icon: <WarningOutlined /> },
          approved: { color: 'success', text: '已批准', icon: <CheckCircleOutlined /> },
          deployed: { color: 'default', text: '已部署', icon: <CheckCircleOutlined /> },
        };
        return (
          <Tag color={config[status].color} icon={config[status].icon}>
            {config[status].text}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link" icon={<EyeOutlined />}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>变更风险监控Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            智能评估代码变更风险，提供预警和建议
          </p>
        </div>

        <Alert
          message="高风险变更提醒"
          description="检测到1个高风险变更正在评审中，建议重点关注"
          type="warning"
          showIcon
          closable
        />

        <Card title="变更记录" bordered={false}>
          <Table
            columns={columns}
            dataSource={changeData}
            pagination={false}
          />
        </Card>

        <Card title="风险评估因素" bordered={false}>
          <Timeline
            items={[
              {
                color: 'red',
                children: (
                  <div>
                    <h4>代码复杂度</h4>
                    <p>变更涉及核心业务逻辑，代码复杂度较高</p>
                  </div>
                ),
              },
              {
                color: 'orange',
                children: (
                  <div>
                    <h4>影响范围</h4>
                    <p>修改了15个文件，影响多个模块</p>
                  </div>
                ),
              },
              {
                color: 'blue',
                children: (
                  <div>
                    <h4>历史数据</h4>
                    <p>该模块近期出现过3次线上问题</p>
                  </div>
                ),
              },
              {
                color: 'green',
                children: (
                  <div>
                    <h4>测试覆盖</h4>
                    <p>单元测试覆盖率达85%</p>
                  </div>
                ),
              },
            ]}
          />
        </Card>

        <Card title="AI建议" bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert
              message="建议增加集成测试"
              description="此变更涉及多个模块交互，建议补充集成测试用例"
              type="info"
              showIcon
            />
            <Alert
              message="建议灰度发布"
              description="建议采用灰度发布策略，先发布5%流量观察"
              type="info"
              showIcon
            />
            <Alert
              message="建议加强监控"
              description="发布后建议密切关注错误率和性能指标"
              type="info"
              showIcon
            />
          </Space>
        </Card>
      </Space>
    </MainLayout>
  );
}

