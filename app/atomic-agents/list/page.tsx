'use client';

import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Button, Space, Badge, Input, Select, Row, Col, Statistic, Tabs } from 'antd';
import {
  ThunderboltOutlined,
  SearchOutlined,
  PlusOutlined,
  FileTextOutlined,
  BugOutlined,
  ApiOutlined,
  DatabaseOutlined,
  ToolOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

const { Option } = Select;

const categoryIcons: Record<string, React.ReactNode> = {
  '代码操作': <FileTextOutlined />,
  '问题分析': <BugOutlined />,
  '数据获取': <DatabaseOutlined />,
  'AI能力': <RobotOutlined />,
};

export default function AtomicAgentsPage() {
  const [atomicAgents, setAtomicAgents] = useState<any[]>([]);
  const [compositions, setCompositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/atomic-agent-data.json');
        const json = await response.json();
        setAtomicAgents(json.atomicAgents);
        setCompositions(json.compositions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredAgents = category === 'all' 
    ? atomicAgents 
    : atomicAgents.filter(a => a.category === category);

  const totalUsage = atomicAgents.reduce((sum, a) => sum + (a.stats?.usage || 0), 0);
  const avgSuccessRate = atomicAgents.reduce((sum, a) => sum + (a.stats?.successRate || 0), 0) / atomicAgents.length;

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>原子能力Agent</h1>
            <p style={{ color: '#8c8c8c' }}>
              最小粒度的能力单元，可以自由组合成复杂的Agent流程
            </p>
          </div>
          <Space>
            <Link href="/atomic-agents/compose">
              <Button type="primary" icon={<ThunderboltOutlined />}>
                编排Agent
              </Button>
            </Link>
            <Link href="/atomic-agents/market">
              <Button icon={<PlusOutlined />}>
                Agent市场
              </Button>
            </Link>
          </Space>
        </div>

        {/* 统计卡片 */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="原子Agent"
                value={atomicAgents.length}
                suffix="个"
                prefix={<RobotOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="组合流程"
                value={compositions.length}
                suffix="个"
                prefix={<ThunderboltOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总调用次数"
                value={totalUsage}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="平均成功率"
                value={Math.round(avgSuccessRate * 100)}
                suffix="%"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 什么是原子能力Agent */}
        <Card title="💡 什么是原子能力Agent？" bordered={false}>
          <Row gutter={16}>
            <Col span={8}>
              <div style={{ padding: 16, background: '#f0f5ff', borderRadius: 6 }}>
                <h4 style={{ color: '#1890ff' }}>🧩 最小单元</h4>
                <p style={{ margin: 0, fontSize: 13 }}>
                  每个原子Agent只做一件事，功能明确、职责单一
                </p>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ padding: 16, background: '#f6ffed', borderRadius: 6 }}>
                <h4 style={{ color: '#52c41a' }}>🔗 可组合</h4>
                <p style={{ margin: 0, fontSize: 13 }}>
                  像乐高积木一样，可以自由组合成复杂的Agent流程
                </p>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ padding: 16, background: '#fff7e6', borderRadius: 6 }}>
                <h4 style={{ color: '#fa8c16' }}>♻️ 可复用</h4>
                <p style={{ margin: 0, fontSize: 13 }}>
                  一次开发，到处使用，大幅提升开发效率
                </p>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 筛选 */}
        <Card bordered={false}>
          <Space size="middle">
            <Space.Compact style={{ width: 300 }}>
              <Input
                placeholder="搜索Agent..."
                prefix={<SearchOutlined />}
              />
            </Space.Compact>
            <Select
              style={{ width: 150 }}
              value={category}
              onChange={setCategory}
            >
              <Option value="all">全部分类</Option>
              <Option value="代码操作">代码操作</Option>
              <Option value="问题分析">问题分析</Option>
              <Option value="数据获取">数据获取</Option>
              <Option value="AI能力">AI能力</Option>
            </Select>
          </Space>
        </Card>

        {/* Agent列表 */}
        <Card title="原子Agent列表" bordered={false}>
          <List
            loading={loading}
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={filteredAgents}
            renderItem={(agent) => (
              <List.Item>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  actions={[
                    <Button key="use" type="link">使用</Button>,
                    <Button key="detail" type="link">详情</Button>,
                  ]}
                >
                  <Space direction="vertical" style={{ width: '100%' }} size="small">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 18,
                      }}>
                        {categoryIcons[agent.category]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 16 }}>{agent.name}</div>
                        <Tag color="blue" style={{ marginTop: 4 }}>{agent.category}</Tag>
                      </div>
                    </div>

                    <p style={{ 
                      color: '#595959', 
                      fontSize: 13, 
                      margin: '8px 0',
                      minHeight: 40 
                    }}>
                      {agent.description}
                    </p>

                    <div>
                      <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>
                        使用的MCP工具:
                      </div>
                      <div>
                        {agent.mcpTools.length > 0 ? (
                          agent.mcpTools.map((tool: string) => (
                            <Tag key={tool}>{tool}</Tag>
                          ))
                        ) : (
                          <Tag color="default">无依赖</Tag>
                        )}
                      </div>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      paddingTop: 12,
                      borderTop: '1px solid #f0f0f0',
                      marginTop: 8 
                    }}>
                      <div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>调用</div>
                        <div style={{ fontWeight: 600 }}>{agent.stats.usage}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>成功率</div>
                        <div style={{ fontWeight: 600, color: '#52c41a' }}>
                          {(agent.stats.successRate * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>耗时</div>
                        <div style={{ fontWeight: 600 }}>{agent.stats.avgTime}ms</div>
                      </div>
                    </div>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </Card>

        {/* 组合流程 */}
        <Card title="组合Agent流程" bordered={false} extra={
          <Link href="/atomic-agents/compose">
            <Button type="link">创建新流程 →</Button>
          </Link>
        }>
          <List
            dataSource={compositions}
            renderItem={(comp) => (
              <List.Item
                actions={[
                  <Button key="run" type="link" icon={<ThunderboltOutlined />}>运行</Button>,
                  <Button key="edit" type="link">编辑</Button>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <span>{comp.name}</span>
                      <Tag color="purple">{comp.flowType === 'sequential' ? '顺序' : '并行'}</Tag>
                    </Space>
                  }
                  description={
                    <div>
                      <p>{comp.description}</p>
                      <Space style={{ marginTop: 8 }}>
                        {comp.agents.map((agent: any) => (
                          <Tag key={agent.id}>{agent.order}. {agent.name}</Tag>
                        ))}
                      </Space>
                      <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
                        调用: {comp.stats.usage} | 成功率: {(comp.stats.successRate * 100).toFixed(0)}% | 平均耗时: {comp.stats.avgTime}ms
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </MainLayout>
  );
}



