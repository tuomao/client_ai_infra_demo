'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Space, Alert, Divider, Tag } from 'antd';
import { SendOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { TextArea } = Input;
const { Option } = Select;

export default function CaseEvaluationPage() {
  const [form] = Form.useForm();
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleEvaluate = async (values: any) => {
    setEvaluating(true);
    // 模拟AI评估
    setTimeout(() => {
      setResult({
        priority: 'P0',
        severity: '严重',
        impact: '高',
        affectedUsers: '1000+',
        recommendation: '建议立即处理，此问题可能影响核心业务流程',
        tags: ['用户体验', '核心功能', '高优先级'],
      });
      setEvaluating(false);
    }, 2000);
  };

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Case评估Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            智能评估问题的优先级、影响范围和严重程度，帮助团队快速决策
          </p>
        </div>

        <Card title="Case信息输入" bordered={false}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEvaluate}
          >
            <Form.Item
              label="问题标题"
              name="title"
              rules={[{ required: true, message: '请输入问题标题' }]}
            >
              <Input placeholder="输入问题的简短描述" />
            </Form.Item>

            <Form.Item
              label="问题详情"
              name="description"
              rules={[{ required: true, message: '请输入问题详情' }]}
            >
              <TextArea
                rows={6}
                placeholder="详细描述问题的表现、复现步骤、影响范围等"
              />
            </Form.Item>

            <Form.Item
              label="问题类型"
              name="type"
              rules={[{ required: true, message: '请选择问题类型' }]}
            >
              <Select placeholder="选择问题类型">
                <Option value="bug">功能缺陷</Option>
                <Option value="crash">崩溃问题</Option>
                <Option value="performance">性能问题</Option>
                <Option value="ui">UI问题</Option>
                <Option value="compatibility">兼容性问题</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="影响模块"
              name="module"
            >
              <Input placeholder="如：首页、商品详情、购物车等" />
            </Form.Item>

            <Form.Item
              label="应用版本"
              name="version"
            >
              <Input placeholder="如：3.2.1" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
                loading={evaluating}
                size="large"
              >
                开始AI评估
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {result && (
          <Card
            title={
              <Space>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                评估结果
              </Space>
            }
            bordered={false}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Alert
                message="AI评估完成"
                description="基于问题描述和历史数据，AI已完成评估分析"
                type="success"
                showIcon
              />

              <div>
                <h3>优先级评估</h3>
                <Space size="large" style={{ marginTop: 12 }}>
                  <div>
                    <div style={{ color: '#8c8c8c', marginBottom: 4 }}>优先级</div>
                    <Tag color="red" style={{ fontSize: 16, padding: '4px 12px' }}>
                      {result.priority}
                    </Tag>
                  </div>
                  <div>
                    <div style={{ color: '#8c8c8c', marginBottom: 4 }}>严重程度</div>
                    <Tag color="orange" style={{ fontSize: 16, padding: '4px 12px' }}>
                      {result.severity}
                    </Tag>
                  </div>
                  <div>
                    <div style={{ color: '#8c8c8c', marginBottom: 4 }}>影响范围</div>
                    <Tag color="gold" style={{ fontSize: 16, padding: '4px 12px' }}>
                      {result.impact}
                    </Tag>
                  </div>
                  <div>
                    <div style={{ color: '#8c8c8c', marginBottom: 4 }}>影响用户</div>
                    <Tag style={{ fontSize: 16, padding: '4px 12px' }}>
                      {result.affectedUsers}
                    </Tag>
                  </div>
                </Space>
              </div>

              <Divider />

              <div>
                <h3>问题标签</h3>
                <Space style={{ marginTop: 12 }}>
                  {result.tags.map((tag: string) => (
                    <Tag key={tag} color="blue">{tag}</Tag>
                  ))}
                </Space>
              </div>

              <Divider />

              <div>
                <h3>处理建议</h3>
                <Alert
                  message={result.recommendation}
                  type="warning"
                  showIcon
                  style={{ marginTop: 12 }}
                />
              </div>
            </Space>
          </Card>
        )}
      </Space>
    </MainLayout>
  );
}

