'use client';

import React from 'react';
import { Card, Timeline, Progress, Tag, Collapse, Space, Divider, Row, Col } from 'antd';
import {
  CheckCircleOutlined,
  BulbOutlined,
  ExperimentOutlined,
  LineChartOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const { Panel } = Collapse;

interface ThinkingStep {
  step: number;
  type: string;
  title: string;
  description: string;
  reasoning: string;
  evidence: any;
  conclusion: string;
  confidence: number;
  charts?: any;
}

interface ThinkingChainProps {
  steps: ThinkingStep[];
}

const getStepIcon = (type: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'error-stack-analysis': <ExperimentOutlined style={{ color: '#1890ff' }} />,
    'data-flow-analysis': <LineChartOutlined style={{ color: '#52c41a' }} />,
    'api-check': <SafetyOutlined style={{ color: '#faad14' }} />,
    'similar-issues': <BulbOutlined style={{ color: '#722ed1' }} />,
    'env-analysis': <ExperimentOutlined style={{ color: '#eb2f96' }} />,
    'root-cause': <CheckCircleOutlined style={{ color: '#f5222d' }} />,
    'solution-generation': <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  };
  return iconMap[type] || <CheckCircleOutlined />;
};

const renderEvidence = (evidence: any) => {
  if (!evidence) return null;
  
  return (
    <div style={{ 
      background: '#f6ffed', 
      border: '1px solid #b7eb8f',
      borderRadius: 6,
      padding: 16,
      marginTop: 12
    }}>
      <h4 style={{ marginBottom: 12, color: '#52c41a' }}>🔍 证据数据</h4>
      <Row gutter={[16, 16]}>
        {Object.entries(evidence).map(([key, value]) => (
          <Col span={12} key={key}>
            <div>
              <span style={{ color: '#8c8c8c', fontSize: 12 }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
              <div style={{ marginTop: 4, fontWeight: 500 }}>
                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const renderChart = (charts: any) => {
  if (!charts) return null;

  const { type, data } = charts;

  // 根据图表类型渲染不同的可视化
  switch (type) {
    case 'timeline':
      return (
        <div style={{ 
          background: '#fff7e6', 
          border: '1px solid #ffd591',
          borderRadius: 6,
          padding: 16,
          marginTop: 12
        }}>
          <h4 style={{ marginBottom: 12, color: '#fa8c16' }}>📊 时序分析</h4>
          <Timeline mode="left">
            {data.events?.map((event: any, index: number) => (
              <Timeline.Item
                key={index}
                label={`${event.time}ms`}
                color={event.event.includes('❌') ? 'red' : 'blue'}
              >
                {event.event}
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      );
    
    case 'distribution':
      return (
        <div style={{ 
          background: '#f0f5ff', 
          border: '1px solid #adc6ff',
          borderRadius: 6,
          padding: 16,
          marginTop: 12
        }}>
          <h4 style={{ marginBottom: 12, color: '#1890ff' }}>📊 分布分析</h4>
          {Object.entries(data).map(([category, values]: [string, any]) => (
            <div key={category} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>
                {category.replace(/_/g, ' ')}:
              </div>
              {Object.entries(values).map(([key, value]: [string, any]) => (
                <div key={key} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>{key}</span>
                    <span style={{ fontWeight: 600 }}>{value}%</span>
                  </div>
                  <Progress percent={Number(value)} size="small" showInfo={false} />
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    
    case 'similarity':
      return (
        <div style={{ 
          background: '#f9f0ff', 
          border: '1px solid #d3adf7',
          borderRadius: 6,
          padding: 16,
          marginTop: 12
        }}>
          <h4 style={{ marginBottom: 12, color: '#722ed1' }}>📊 相似度分析</h4>
          <Space direction="vertical" style={{ width: '100%' }}>
            {data.matches?.map((match: any) => (
              <div key={match.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8,
                background: '#fff',
                borderRadius: 4
              }}>
                <Space>
                  <span style={{ fontWeight: 500 }}>{match.id}</span>
                  <Tag color={match.status === 'resolved' ? 'green' : 'orange'}>
                    {match.status === 'resolved' ? '已解决' : '处理中'}
                  </Tag>
                </Space>
                <Progress 
                  type="circle" 
                  percent={Math.round(match.similarity * 100)} 
                  width={50}
                  strokeColor="#722ed1"
                />
              </div>
            ))}
          </Space>
        </div>
      );
    
    default:
      return null;
  }
};

export default function ThinkingChain({ steps }: ThinkingChainProps) {
  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BulbOutlined style={{ fontSize: 24, color: '#faad14' }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>AI思维链分析</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: '#8c8c8c', marginTop: 4 }}>
              展示AI推理的完整过程，每一步都有据可查
            </div>
          </div>
        </div>
      }
      bordered={false}
    >
      <div style={{ marginBottom: 16, padding: 16, background: '#e6f7ff', borderRadius: 6 }}>
        <Space>
          <Tag color="blue">有用 &gt; 准确</Tag>
          <Tag color="green">可解释性强</Tag>
          <Tag color="purple">透明化推理</Tag>
        </Space>
        <Divider style={{ margin: '12px 0' }} />
        <div style={{ fontSize: 12, color: '#595959' }}>
          💡 <strong>设计理念</strong>: 即使AI的结论不完全准确，用户也能从分析过程中获得启发，
          理解问题排查的思路，甚至发现AI没注意到的线索。
        </div>
      </div>

      <Collapse 
        defaultActiveKey={['1']} 
        accordion={false}
        expandIconPosition="start"
      >
        {steps.map((step) => (
          <Panel
            key={step.step}
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Space>
                  {getStepIcon(step.type)}
                  <span style={{ fontWeight: 600 }}>步骤 {step.step}: {step.title}</span>
                  <Tag color="blue">{step.type}</Tag>
                </Space>
                <Space>
                  <span style={{ fontSize: 12, color: '#8c8c8c' }}>置信度:</span>
                  <Progress 
                    type="circle" 
                    percent={Math.round(step.confidence * 100)}
                    width={40}
                    strokeColor={step.confidence >= 0.9 ? '#52c41a' : step.confidence >= 0.8 ? '#1890ff' : '#faad14'}
                  />
                </Space>
              </div>
            }
            style={{ marginBottom: 16 }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* 描述 */}
              <div>
                <div style={{ fontWeight: 500, marginBottom: 8, color: '#595959' }}>
                  📝 分析目标
                </div>
                <div style={{ color: '#262626' }}>{step.description}</div>
              </div>

              {/* 推理过程 */}
              <div>
                <div style={{ fontWeight: 500, marginBottom: 8, color: '#595959' }}>
                  🧠 AI推理过程
                </div>
                <div style={{ 
                  padding: 16, 
                  background: '#fafafa', 
                  borderLeft: '4px solid #1890ff',
                  borderRadius: 4
                }}>
                  {step.reasoning}
                </div>
              </div>

              {/* 证据 */}
              {renderEvidence(step.evidence)}

              {/* 图表 */}
              {renderChart(step.charts)}

              {/* 结论 */}
              <div>
                <div style={{ fontWeight: 500, marginBottom: 8, color: '#595959' }}>
                  ✅ 阶段结论
                </div>
                <div style={{ 
                  padding: 16, 
                  background: '#f6ffed', 
                  border: '1px solid #b7eb8f',
                  borderRadius: 6,
                  fontWeight: 500,
                  color: '#389e0d'
                }}>
                  {step.conclusion}
                </div>
              </div>

              {/* 置信度说明 */}
              <div style={{ 
                padding: 12, 
                background: '#fff7e6', 
                borderRadius: 4,
                fontSize: 12,
                color: '#8c8c8c'
              }}>
                <strong>置信度 {(step.confidence * 100).toFixed(0)}%</strong> - 
                {step.confidence >= 0.95 ? ' 非常确信' :
                 step.confidence >= 0.9 ? ' 高度确信' :
                 step.confidence >= 0.8 ? ' 较为确信' :
                 ' 有一定把握'}，该结论基于多维度证据分析得出。
              </div>
            </Space>
          </Panel>
        ))}
      </Collapse>

      {/* 总结 */}
      <div style={{ 
        marginTop: 24, 
        padding: 20, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 8,
        color: '#fff'
      }}>
        <h3 style={{ color: '#fff', marginBottom: 12 }}>🎯 思维链优势</h3>
        <Row gutter={16}>
          <Col span={8}>
            <div style={{ padding: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 6 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>极好的可解释性</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>每一步推理都清晰可见</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ padding: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 6 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>帮助理解系统</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>学习问题排查方法论</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ padding: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 6 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>可贡献经验</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>用户可参与优化流程</div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}



