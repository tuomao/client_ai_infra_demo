'use client';

import React, { use } from 'react';
import { Card, Descriptions, Tag, Space, Tabs, Alert, Steps, Timeline, Button, List, Spin, Empty } from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  BugOutlined,
  CodeOutlined,
  LineChartOutlined,
  MessageOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { useWhiteScreenIssue } from '@/hooks/use-mock-data';
import { formatDateTime, getSeverityColor } from '@/lib/utils';
import CodeViewer from '@/components/editor/CodeViewer';
import TraceVisualizer from '@/components/charts/TraceVisualizer';
import ChatInterface from '@/components/agent/ChatInterface';
import ThinkingChain from '@/components/agent/ThinkingChain';

interface WhiteScreenDetailClientProps {
  id: string;
}

export default function WhiteScreenDetailClient({ id }: WhiteScreenDetailClientProps) {
  const { data: issue, loading, error } = useWhiteScreenIssue(id);

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: 100 }}>
          <Spin size="large" />
          <p style={{ marginTop: 16, color: '#8c8c8c' }}>加载数据中...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !issue) {
    return (
      <MainLayout>
        <Card>
          <Empty description="问题不存在或加载失败" />
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link href="/analysis/white-screen">
              <Button type="primary" icon={<ArrowLeftOutlined />}>返回列表</Button>
            </Link>
          </div>
        </Card>
      </MainLayout>
    );
  }

  const tabItems = [
    {
      key: 'thinking',
      label: (
        <span>
          <ThunderboltOutlined />
          AI思维链
        </span>
      ),
      children: issue.aiAnalysis?.thinkingChain ? (
        <ThinkingChain steps={issue.aiAnalysis.thinkingChain} />
      ) : (
        <Card>
          <Empty description="思维链数据正在生成中..." />
        </Card>
      ),
    },
    {
      key: 'analysis',
      label: (
        <span>
          <BugOutlined />
          AI分析
        </span>
      ),
      children: (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 分析步骤 */}
          {issue.aiAnalysis && (
            <>
              <Card title="分析过程" bordered={false}>
                <Steps
                  direction="vertical"
                  current={issue.aiAnalysis.analysisSteps.length}
                  items={issue.aiAnalysis.analysisSteps.map((step) => ({
                    title: step.title,
                    description: (
                      <div>
                        <p>{step.description}</p>
                        <div style={{
                          marginTop: 8,
                          padding: 12,
                          background: '#f6ffed',
                          borderRadius: 6,
                          border: '1px solid #b7eb8f',
                        }}>
                          <strong>结果:</strong> {step.result}
                        </div>
                        <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
                          {formatDateTime(step.timestamp)}
                        </div>
                      </div>
                    ),
                    status: 'finish',
                    icon: <CheckCircleOutlined />,
                  }))}
                />
              </Card>

              {/* 根本原因 */}
              <Card title="根本原因分析" bordered={false}>
                <Alert
                  message="AI分析结果"
                  description={issue.aiAnalysis.rootCause}
                  type="info"
                  showIcon
                  icon={<ThunderboltOutlined />}
                  style={{ marginBottom: 16 }}
                />
                <Descriptions column={1}>
                  <Descriptions.Item label="置信度">
                    <Tag color={issue.aiAnalysis.confidence > 0.9 ? 'green' : 'orange'}>
                      {(issue.aiAnalysis.confidence * 100).toFixed(0)}%
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* 相关代码 */}
              {issue.aiAnalysis.relatedCode.length > 0 && (
                <Card title="相关代码位置" bordered={false}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {issue.aiAnalysis.relatedCode.map((code, index) => (
                      <div key={index}>
                        <div style={{ marginBottom: 8, fontSize: 14 }}>
                          <Tag color="blue">{code.file}</Tag>
                          <span style={{ color: '#8c8c8c' }}>第 {code.line} 行</span>
                        </div>
                        <CodeViewer
                          code={code.code}
                          language={code.language}
                          height={150}
                        />
                      </div>
                    ))}
                  </Space>
                </Card>
              )}

              {/* 可能原因 */}
              <Card title="可能原因" bordered={false}>
                <List
                  dataSource={issue.aiAnalysis.possibleReasons}
                  renderItem={(reason, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<div style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: '#1890ff',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                        }}>{index + 1}</div>}
                        description={reason}
                      />
                    </List.Item>
                  )}
                />
              </Card>

              {/* 修复方案 */}
              <Card title="建议修复方案" bordered={false}>
                <Alert
                  message="AI生成的修复建议"
                  description={
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {issue.aiAnalysis.solution}
                    </div>
                  }
                  type="success"
                  showIcon
                />
                <div style={{ marginTop: 16 }}>
                  <Space>
                    <Button type="primary">应用修复</Button>
                    <Link href="/fix/hotfix-generate">
                      <Button>生成热修代码</Button>
                    </Link>
                  </Space>
                </div>
              </Card>
            </>
          )}

          {!issue.aiAnalysis && (
            <Card>
              <Empty description="AI分析尚未完成，请稍后查看" />
            </Card>
          )}
        </Space>
      ),
    },
    {
      key: 'error',
      label: (
        <span>
          <CodeOutlined />
          错误堆栈
        </span>
      ),
      children: (
        <Card bordered={false}>
          <CodeViewer code={issue.errorStack} language="plaintext" height={500} />
        </Card>
      ),
    },
    {
      key: 'trace',
      label: (
        <span>
          <LineChartOutlined />
          链路追踪
        </span>
      ),
      children: issue.trace ? (
        <TraceVisualizer traces={issue.trace} />
      ) : (
        <Card>
          <Empty description="暂无链路追踪数据" />
        </Card>
      ),
    },
    {
      key: 'chat',
      label: (
        <span>
          <MessageOutlined />
          AI对话
        </span>
      ),
      children: (
        <ChatInterface
          title="与AI助手对话"
          initialMessages={[
            {
              id: '1',
              role: 'assistant',
              content: `您好！我已经完成了对问题"${issue.title}"的初步分析。您可以向我提问，我会帮助您深入了解这个问题。`,
              timestamp: new Date(),
            },
          ]}
        />
      ),
    },
  ];

  const severityColorMap: Record<string, string> = {
    critical: 'red',
    high: 'orange',
    medium: 'gold',
    low: 'green',
  };

  const severityTextMap: Record<string, string> = {
    critical: '严重',
    high: '高',
    medium: '中',
    low: '低',
  };

  const statusColorMap: Record<string, string> = {
    pending: 'default',
    analyzing: 'processing',
    resolved: 'success',
    ignored: 'default',
  };

  const statusTextMap: Record<string, string> = {
    pending: '待处理',
    analyzing: '分析中',
    resolved: '已解决',
    ignored: '已忽略',
  };

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 返回按钮 */}
        <Link href="/analysis/white-screen">
          <Button icon={<ArrowLeftOutlined />}>返回列表</Button>
        </Link>

        {/* 问题概览 */}
        <Card>
          <div style={{ marginBottom: 24 }}>
            <Space>
              <Tag color={severityColorMap[issue.severity]}>
                {severityTextMap[issue.severity]}
              </Tag>
              <Tag color={statusColorMap[issue.status]}>
                {statusTextMap[issue.status]}
              </Tag>
              <Tag>{issue.version}</Tag>
            </Space>
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            {issue.title}
          </h1>

          <Descriptions column={2} bordered>
            <Descriptions.Item label="问题ID">{issue.id}</Descriptions.Item>
            <Descriptions.Item label="发生时间">
              {formatDateTime(issue.timestamp)}
            </Descriptions.Item>
            <Descriptions.Item label="影响用户数">
              <span style={{ fontSize: 18, fontWeight: 600, color: '#ff4d4f' }}>
                {issue.affectedUsers.toLocaleString()}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="应用版本">{issue.version}</Descriptions.Item>
            <Descriptions.Item label="设备信息">
              {issue.environment.device} ({issue.environment.os} {issue.environment.osVersion})
            </Descriptions.Item>
            <Descriptions.Item label="浏览器">
              {issue.environment.browser} {issue.environment.browserVersion}
            </Descriptions.Item>
            <Descriptions.Item label="网络类型">{issue.environment.network}</Descriptions.Item>
            <Descriptions.Item label="App版本">{issue.environment.appVersion}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 详细分析标签页 */}
        <Card>
          <Tabs defaultActiveKey="analysis" items={tabItems} />
        </Card>

        {/* 相似问题 */}
        {issue.similarIssues && issue.similarIssues.length > 0 && (
          <Card title="相似问题" bordered={false}>
            <List
              dataSource={issue.similarIssues}
              renderItem={(similarId) => (
                <List.Item>
                  <Link href={`/analysis/white-screen/${similarId}`}>
                    问题 {similarId}
                  </Link>
                </List.Item>
              )}
            />
          </Card>
        )}
      </Space>
    </MainLayout>
  );
}

