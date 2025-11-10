'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Space, Tag, Button, Progress, Badge, Statistic, Alert, Tooltip, message } from 'antd';
import {
  RocketOutlined,
  SafetyOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  BugOutlined,
  DashboardOutlined,
  ReloadOutlined,
  TeamOutlined,
  FireOutlined,
  LoadingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [workspaceData, setWorkspaceData] = useState<any>(null);

  useEffect(() => {
    // 加载工作台数据
    fetch('/mock/workspace-data.json')
      .then(res => res.json())
      .then(data => setWorkspaceData(data))
      .catch(err => console.error('Failed to load workspace data:', err));
  }, []);


  if (!workspaceData) {
        return (
      <MainLayout>
        <div style={{ padding: 24, textAlign: 'center' }}>加载中...</div>
      </MainLayout>
    );
  }

  const { experiments, statistics, todos } = workspaceData;

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
            🏠 我的工作台
          </h1>
        </div>

        {/* AI助手今日总结 */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 12,
          padding: '20px 24px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 32
        }}>
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 80,
            height: 80,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '50%'
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <RocketOutlined style={{ fontSize: 20 }} />
              AI助手让您的工作更省心、更稳定
            </div>
            <div style={{ 
              fontSize: 14, 
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              🎯 今日已完成 <strong>12项</strong> 智能任务，预防了 <strong>8个</strong> 潜在问题，为您节省 <strong>3.5小时</strong> 工作时间 — 
              让系统更稳定、工作更省心、问题更少，这些宝贵时间可以用来陪伴家人、享受美食，让生活更加美好！
            </div>
          </div>
        </div>

        {/* 智能待办事项 */}
        <Card
          title={
            <Space>
              <ClockCircleOutlined style={{ color: '#faad14' }} />
              <span>智能待办事项</span>
              <Tag color="blue" style={{ marginLeft: 8 }}>AI识别</Tag>
              <Badge count={todos?.length || 0} />
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <Space direction="vertical" size={6} style={{ width: '100%' }}>
            {todos?.map((todo: any) => {
              const getPriorityColor = (priority: string) => {
                switch (priority) {
                  case 'high': return '#ff4d4f';
                  case 'medium': return '#faad14';
                  case 'low': return '#52c41a';
                  default: return '#8c8c8c';
                }
              };

              const getStatusIcon = (status: string, type: string) => {
                if (status === 'analyzing') {
                  return <LoadingOutlined style={{ color: '#1890ff' }} spin />;
                }
                switch (type) {
                  case 'experiment_solidify': return <RocketOutlined style={{ color: '#722ed1' }} />;
                  case 'stability_analysis': return <SafetyOutlined style={{ color: '#ff4d4f' }} />;
                  case 'feedback_analysis': return <SearchOutlined style={{ color: '#1890ff' }} />;
                  case 'rollout_recommendation': return <ThunderboltOutlined style={{ color: '#52c41a' }} />;
                  default: return <CheckCircleOutlined />;
                }
              };

              return (
                <Card
                  key={todo.id}
                  size="small"
                  style={{
                    background: todo.priority === 'high' ? '#fff2f0' : '#fafafa',
                    border: `1px solid ${todo.priority === 'high' ? '#ffccc7' : '#d9d9d9'}`
                  }}
                >
                  <Row gutter={15}>
                    <Col span={18}>
                      <Space direction="vertical" size={6} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {getStatusIcon(todo.status, todo.type)}
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{todo.title}</span>
                          <Tag color={getPriorityColor(todo.priority)}>
                            {todo.priority === 'high' ? '高优先级' : todo.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Tag>
                        </div>
                        
                        <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.5 }}>
                          {todo.description}
                        </div>

                        {/* 具体信息 */}
                        {todo.type === 'experiment_solidify' && (
                          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                            实验: {todo.experiment.name} | 效果: {todo.experiment.effect} | 运行: {todo.experiment.duration} | 置信度: {todo.experiment.confidence}
                          </div>
                        )}
                        
                        {todo.type === 'stability_analysis' && (
                          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                            指标: {todo.stability.metric} | 增长: {todo.stability.increase} | 页面: {todo.stability.affectedPage} | {todo.stability.timeRange}
                          </div>
                        )}
                        
                        {todo.type === 'feedback_analysis' && (
                          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                            反馈数量: {todo.feedback.count} | 功能: {todo.feedback.feature} | 关键词: {todo.feedback.keywords.join('、')} | {todo.feedback.timeRange}
                          </div>
                        )}
                        
                        {todo.type === 'rollout_recommendation' && (
                          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                            功能: {todo.rollout.feature} | 当前: {todo.rollout.currentPercent} | 运行: {todo.rollout.duration} | 效果: {todo.rollout.improvement}
                          </div>
                        )}
                      </Space>
                    </Col>
                    
                    <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingLeft: 4, paddingRight: 4 }}>
                  <Button
                    type="primary"
                    size="large"
                    loading={false}
                    disabled={false}
                    style={{ height: 40, whiteSpace: 'nowrap', paddingLeft: 24, paddingRight: 24 }}
                    onClick={() => {
                      if (todo.type === 'experiment_solidify') {
                        message.success('实验固化Agent已启动！');
                      } else if (todo.type === 'stability_analysis') {
                        // 跳转到根因分析页面，带上稳定性分析参数
                        router.push('/agent-bot/feedback-analysis?autoStart=true&case=stability_issues');
                      } else if (todo.type === 'feedback_analysis') {
                        // 跳转到用户原声归因页面，带上分析参数
                        router.push('/agent-bot/feedback-analysis?autoStart=true&case=search_issues');
                      } else if (todo.type === 'rollout_recommendation') {
                        message.success('放量推荐Agent已启动继续放量！');
                      }
                    }}
                  >
                    {todo.action.text}
                  </Button>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Space>
            </Card>

        {/* 实验模块 */}
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          {/* 1. 变更监控 */}
          <Card
            title={
              <Space>
                <SafetyOutlined style={{ color: '#52c41a' }} />
                <span>变更监控</span>
                <Tag color="success">Agent守护中</Tag>
              </Space>
            }
          >
            <Row gutter={16} style={{ marginTop: 8 }}>
              {experiments.monitoring.map((exp: any) => {
                const hasRisk = exp.riskIndicators?.feedbackSurge;
                const isSwitchPlatform = exp.type === 'switch_platform';
                return (
                  <Col span={12} key={exp.id}>
                    <Card
                      size="small"
                      style={{ 
                        background: hasRisk ? '#fff2f0' : '#fafafa',
                        border: hasRisk ? '1px solid #ffccc7' : '1px solid #d9d9d9',
                        marginBottom: 16
                      }}
                    >
                      <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontWeight: 600, fontSize: 14 }}>
                                {exp.name}
                              </span>
                              <Tag color={isSwitchPlatform ? 'purple' : 'blue'}>
                                {isSwitchPlatform ? 'Switch平台变更' : '实验变更'}
                              </Tag>
                            </div>
                            <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                              {exp.description}
                            </div>
                            {/* Switch平台业务上下文 */}
                            {isSwitchPlatform && exp.businessContext && (
                              <div style={{ marginTop: 8, padding: 8, background: '#f0f0ff', borderRadius: 4 }}>
                                <div style={{ fontSize: 12, color: '#595959' }}>
                                  <strong>功能模块:</strong> {exp.businessContext.feature}
                                </div>
                                <div style={{ fontSize: 12, color: '#595959', marginTop: 4 }}>
                                  <strong>影响设置:</strong> {exp.businessContext.affectedSettings.join('、')}
                                </div>
                              </div>
                            )}
                          </div>
                          <Space direction="vertical" align="end">
                            {hasRisk && (
                              <Tag color="error" icon={<WarningOutlined />}>
                                风险
                              </Tag>
                            )}
                            <Tag color={hasRisk ? 'orange' : 'green'}>监控中</Tag>
                          </Space>
                        </div>

                        {/* 风险提示 */}
                        {hasRisk && (
                          <Alert
                            message="⚠️ 检测到用户反馈激增"
                            description={
                              <div>
                                <div style={{ marginBottom: 8 }}>
                                  <strong>反馈增长: {exp.riskIndicators.feedbackIncrease}</strong> 
                                  <span style={{ marginLeft: 8, fontSize: 12 }}>
                                    (与变更相关性: {(exp.riskIndicators.correlationScore * 100).toFixed(0)}%)
                                  </span>
                                </div>
                                <div style={{ fontSize: 12 }}>
                                  主要问题: {exp.riskIndicators.mainIssues.slice(0, 2).join('；')}
                                </div>
                              </div>
                            }
                            type="warning"
                            showIcon
                            style={{ marginBottom: 8 }}
                          />
                        )}

                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          <Tooltip title="影响用户数">
                            <Space size={4}>
                              <TeamOutlined style={{ color: '#1890ff' }} />
                              <span style={{ fontSize: 12 }}>{exp.metrics.userCount.toLocaleString()}</span>
                            </Space>
                          </Tooltip>
                          <Tooltip title="崩溃率">
                            <Space size={4}>
                              <BugOutlined style={{ color: hasRisk ? '#ff4d4f' : '#52c41a' }} />
                              <span style={{ fontSize: 12 }}>{exp.metrics.crashRate}</span>
                            </Space>
                          </Tooltip>
                          <Tooltip title="性能评分">
                            <Space size={4}>
                              <ThunderboltOutlined style={{ color: hasRisk ? '#faad14' : '#52c41a' }} />
                              <span style={{ fontSize: 12 }}>{exp.metrics.performanceScore}</span>
                            </Space>
                          </Tooltip>
                          <Tooltip title="异常信号">
                            <Space size={4}>
                              <WarningOutlined style={{ color: exp.metrics.abnormalSignals > 0 ? '#ff4d4f' : '#52c41a' }} />
                              <span style={{ fontSize: 12 }}>{exp.metrics.abnormalSignals}</span>
                            </Space>
                          </Tooltip>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 12, color: '#8c8c8c' }}>放量进度</span>
                            <span style={{ fontSize: 12, fontWeight: 600 }}>{exp.progress}%</span>
                          </div>
              <Progress 
                            percent={exp.progress} 
                            strokeColor={hasRisk ? '#faad14' : '#52c41a'}
                            showInfo={false}
                size="small" 
                          />
                        </div>

                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                          <span>变更时间: {exp.changeTime}</span>
                        </div>

                        {/* 风险操作按钮 */}
                        {hasRisk && (
                          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Button size="small" danger icon={<ReloadOutlined />}>
                              立即回滚
                            </Button>
                            <Button size="small" icon={<EyeOutlined />}>
                              查看详情
                            </Button>
                          </div>
                        )}
                      </Space>
            </Card>
          </Col>
                );
              })}
            </Row>
            </Card>


        </Space>

      </div>
    </MainLayout>
  );
}
