'use client';

import React, { useState } from 'react';
import { Card, Button, Space, Table, Tag, Progress, Alert, Statistic, Row, Col } from 'antd';
import {
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function HotfixTestPage() {
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const handleRunTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTestResults({
        total: 25,
        passed: 23,
        failed: 2,
        coverage: 87.5,
        duration: 3.2,
      });
      setTesting(false);
    }, 3000);
  };

  const testCases = [
    {
      key: '1',
      name: 'should handle undefined items',
      category: '边界测试',
      status: 'passed',
      duration: 45,
    },
    {
      key: '2',
      name: 'should handle empty array',
      category: '边界测试',
      status: 'passed',
      duration: 38,
    },
    {
      key: '3',
      name: 'should render items correctly',
      category: '功能测试',
      status: 'passed',
      duration: 125,
    },
    {
      key: '4',
      name: 'should handle API error',
      category: '异常测试',
      status: 'failed',
      duration: 89,
      error: 'Network request timeout',
    },
    {
      key: '5',
      name: 'should update state on user action',
      category: '交互测试',
      status: 'passed',
      duration: 156,
    },
  ];

  const columns = [
    {
      title: '测试用例',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
          passed: { color: 'success', text: '通过', icon: <CheckCircleOutlined /> },
          failed: { color: 'error', text: '失败', icon: <CloseCircleOutlined /> },
          running: { color: 'processing', text: '运行中', icon: <SyncOutlined spin /> },
        };
        return (
          <Tag color={config[status].color} icon={config[status].icon}>
            {config[status].text}
          </Tag>
        );
      },
    },
    {
      title: '耗时',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration}ms`,
    },
    {
      title: '错误信息',
      dataIndex: 'error',
      key: 'error',
      render: (error: string) => error ? (
        <span style={{ color: '#ff4d4f' }}>{error}</span>
      ) : '-',
    },
  ];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>热修测试Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            自动执行测试用例，验证修复代码的正确性
          </p>
        </div>

        <Card>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            size="large"
            loading={testing}
            onClick={handleRunTest}
          >
            {testing ? '测试运行中...' : '运行所有测试'}
          </Button>
        </Card>

        {testResults && (
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总用例数"
                  value={testResults.total}
                  suffix="个"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="通过"
                  value={testResults.passed}
                  suffix="个"
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="失败"
                  value={testResults.failed}
                  suffix="个"
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<CloseCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="耗时"
                  value={testResults.duration}
                  suffix="秒"
                  precision={1}
                />
              </Card>
            </Col>
          </Row>
        )}

        {testResults && (
          <Card title="代码覆盖率" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>总体覆盖率</span>
                  <span style={{ fontWeight: 600 }}>{testResults.coverage}%</span>
                </div>
                <Progress
                  percent={testResults.coverage}
                  status={testResults.coverage >= 80 ? 'success' : 'normal'}
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <div>
                      <span style={{ color: '#8c8c8c' }}>语句覆盖</span>
                      <div style={{ marginTop: 4 }}>
                        <Progress percent={89.2} size="small" />
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <span style={{ color: '#8c8c8c' }}>分支覆盖</span>
                      <div style={{ marginTop: 4 }}>
                        <Progress percent={82.5} size="small" />
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <span style={{ color: '#8c8c8c' }}>函数覆盖</span>
                      <div style={{ marginTop: 4 }}>
                        <Progress percent={91.7} size="small" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Space>
          </Card>
        )}

        <Card title="测试用例详情" bordered={false}>
          <Table
            columns={columns}
            dataSource={testCases}
            pagination={false}
          />
        </Card>

        {testResults && testResults.failed > 0 && (
          <Card title="失败分析" bordered={false}>
            <Alert
              message="检测到测试失败"
              description="2个测试用例失败，建议检查代码逻辑或更新测试用例"
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Space>
              <Button type="primary">查看失败详情</Button>
              <Button>重新运行失败用例</Button>
              <Button>更新测试用例</Button>
            </Space>
          </Card>
        )}

        {testResults && testResults.failed === 0 && (
          <Card title="测试通过" bordered={false}>
            <Alert
              message="所有测试用例通过"
              description="修复代码已通过所有测试，可以进入下一步流程"
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Space>
              <Button type="primary">创建发布单</Button>
              <Button>提交代码审查</Button>
              <Button>生成测试报告</Button>
            </Space>
          </Card>
        )}
      </Space>
    </MainLayout>
  );
}

