'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Space, Tabs, Alert, Divider } from 'antd';
import {
  ThunderboltOutlined,
  CodeOutlined,
  DownloadOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import CodeViewer from '@/components/editor/CodeViewer';
import Link from 'next/link';

const { TextArea } = Input;
const { Option } = Select;

export default function HotfixGeneratePage() {
  const [form] = Form.useForm();
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async (values: any) => {
    setGenerating(true);
    // 模拟AI生成代码
    setTimeout(() => {
      setResult({
        originalCode: `const renderItems = () => {
  return items.map((item) => <ItemCard key={item.id} item={item} />);
};`,
        fixedCode: `const renderItems = () => {
  // 添加空值检查，避免map undefined错误
  if (!items || items.length === 0) {
    return <Empty description="暂无数据" />;
  }
  return items.map((item) => <ItemCard key={item.id} item={item} />);
};`,
        explanation: '在渲染列表前添加了空值检查，当items为undefined或空数组时显示空状态组件，避免运行时错误。',
        testCode: `describe('renderItems', () => {
  it('should handle undefined items', () => {
    const result = renderItems();
    expect(result).toBeDefined();
  });

  it('should handle empty array', () => {
    const result = renderItems();
    expect(result).toBeDefined();
  });

  it('should render items correctly', () => {
    items = [{ id: 1, name: 'test' }];
    const result = renderItems();
    expect(result).toHaveLength(1);
  });
});`,
      });
      setGenerating(false);
    }, 3000);
  };

  const tabItems = result ? [
    {
      key: 'diff',
      label: '代码对比',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <h4>修复前</h4>
            <CodeViewer code={result.originalCode} language="typescript" height={200} />
          </div>
          <Divider />
          <div>
            <h4>修复后</h4>
            <CodeViewer code={result.fixedCode} language="typescript" height={250} />
          </div>
        </Space>
      ),
    },
    {
      key: 'fixed',
      label: '修复代码',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="修复说明"
            description={result.explanation}
            type="info"
            showIcon
          />
          <CodeViewer code={result.fixedCode} language="typescript" height={300} />
        </Space>
      ),
    },
    {
      key: 'test',
      label: '测试代码',
      children: (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="AI生成的测试用例"
            description="包含边界情况和正常情况的测试覆盖"
            type="info"
            showIcon
          />
          <CodeViewer code={result.testCode} language="typescript" height={350} />
        </Space>
      ),
    },
  ] : [];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>热修代码生成Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            基于问题分析自动生成修复代码和测试用例
          </p>
        </div>

        <Card title="问题描述" bordered={false}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleGenerate}
          >
            <Form.Item
              label="选择问题"
              name="issueId"
            >
              <Select placeholder="选择要修复的问题">
                <Option value="ws-001">
                  首页白屏问题 - Cannot read property 'map' of undefined
                </Option>
                <Option value="ws-002">商品详情页白屏 - Network request failed</Option>
                <Option value="ws-003">购物车页面白屏 - Maximum call stack size exceeded</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="问题描述"
              name="description"
            >
              <TextArea
                rows={4}
                placeholder="详细描述问题或直接从白屏归因Agent导入"
              />
            </Form.Item>

            <Form.Item
              label="修复策略"
              name="strategy"
            >
              <Select placeholder="选择修复策略">
                <Option value="defensive">防御式编程</Option>
                <Option value="refactor">重构优化</Option>
                <Option value="fallback">降级处理</Option>
                <Option value="async">异步处理</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="编程语言"
              name="language"
            >
              <Select defaultValue="typescript" placeholder="选择编程语言">
                <Option value="typescript">TypeScript</Option>
                <Option value="javascript">JavaScript</Option>
                <Option value="jsx">JSX/TSX</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<ThunderboltOutlined />}
                  loading={generating}
                  size="large"
                >
                  生成修复代码
                </Button>
                <Link href="/analysis/white-screen">
                  <Button icon={<CodeOutlined />}>从白屏归因导入</Button>
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {result && (
          <Card
            title="生成结果"
            bordered={false}
            extra={
              <Space>
                <Button icon={<CopyOutlined />}>复制代码</Button>
                <Button type="primary" icon={<DownloadOutlined />}>
                  下载文件
                </Button>
              </Space>
            }
          >
            <Tabs items={tabItems} />
          </Card>
        )}

        {result && (
          <Card title="下一步操作" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="代码审查"
                description="建议先进行代码审查，确保修复方案符合预期"
                type="info"
                showIcon
              />
              <Space>
                <Button type="primary">提交代码审查</Button>
                <Link href="/fix/hotfix-test">
                  <Button>执行测试</Button>
                </Link>
                <Button>创建发布单</Button>
              </Space>
            </Space>
          </Card>
        )}
      </Space>
    </MainLayout>
  );
}

