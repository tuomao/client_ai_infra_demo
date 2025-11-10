'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Input, Select, Tag, Steps, Alert, Progress, Divider, Row, Col, Statistic, Badge, Popover, List, App, message } from 'antd';
import {
  AimOutlined,
  LoadingOutlined,
  SendOutlined,
  ReloadOutlined,
  StopOutlined,
  SearchOutlined,
  CloseOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { TextArea } = Input;
const { Option } = Select;

// Agent配置接口
interface AgentConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  agents: Array<{
    id: string;
    name: string;
  }>;
  problemTypes: Array<{
    id: string;
    name: string;
    cases: Array<{
      id: string;
      title: string;
      description: string;
      fullContent?: string;
    }>;
  }>;
  analysisSteps: Array<{
    title: string;
    description: string;
  }>;
  capabilities: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

interface UniversalAgentProps {
  config: AgentConfig;
}

export default function UniversalAgent({ config }: UniversalAgentProps) {
  const [viewMode, setViewMode] = useState<'initial' | 'analysis'>('initial');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSteps, setAnalysisSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedPanels, setExpandedPanels] = useState<string[]>([]);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  // 输入状态
  const [inputText, setInputText] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(config.agents[0]?.id || '');
  const [selectedProblemType, setSelectedProblemType] = useState('');
  const [showCasePopover, setShowCasePopover] = useState(false);
  const [currentProblemType, setCurrentProblemType] = useState('');
  const [caseSearchText, setCaseSearchText] = useState('');

  // 左侧输入框状态
  const [leftInputText, setLeftInputText] = useState('');

  // 获取分类渐变色
  const getCategoryGradient = (index: number, isSecondary = false) => {
    const gradients = [
      isSecondary ? '#764ba2' : '#667eea', // 紫蓝
      isSecondary ? '#ee5a24' : '#ff6b6b', // 红橙
      isSecondary ? '#00f2fe' : '#4facfe', // 蓝青
      isSecondary ? '#faad14' : '#fa8c16', // 橙黄
      isSecondary ? '#389e0d' : '#52c41a', // 绿色
      isSecondary ? '#722ed1' : '#9254de'  // 紫色
    ];
    return gradients[index % gradients.length];
  };

  // 获取分类图标
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: Record<string, string> = {
      '用户原声': '👥',
      'Crash': '💥',
      'OOM': '⚠️',
      '紧急问题': '🚨',
      '性能问题': '⚡',
      '功能异常': '🔧',
      '系统告警': '🖥️',
      '应用告警': '📱',
      '基础设施告警': '🏗️',
      '加载性能': '🚀',
      '渲染性能': '🎨',
      '优化策略': '📈'
    };
    return iconMap[categoryName] || '🔍';
  };

  // 动态生成分析计划
  const generateAnalysisPlan = (problemText: string, problemType: string) => {
    const plans: Array<{
      key: string;
      title: string;
      target: string;
      content: string;
      status: 'pending' | 'running' | 'completed';
      showContent: boolean;
      result: any;
    }> = [];
    
    // 根据不同的Agent类型和问题类型生成不同的分析计划
    config.capabilities.forEach((capability, index) => {
      plans.push({
        key: `plan_${index}`,
        title: capability.name,
        target: `分析${problemText}中的${capability.name}相关问题`,
        content: capability.description,
        status: 'pending' as const,
        showContent: false,
        result: null
      });
    });

    return plans;
  };

  // 生成分析结果
  const generateAnalysisResult = (capability: any, problemText: string) => {
    // 根据不同能力生成不同的分析结果
    const resultTypes = {
      '聚类分析': {
        type: 'clustering',
        data: {
          clusters: [
            { id: 1, name: '核心问题集群', count: 45, keywords: ['响应慢', '超时', '卡顿'] },
            { id: 2, name: '次要问题集群', count: 23, keywords: ['界面异常', '显示错误'] }
          ],
          summary: '发现2个主要问题集群，核心问题集中在性能相关'
        }
      },
      '变更分析': {
        type: 'change',
        data: {
          changes: [
            { id: 1, type: '代码变更', time: '2小时前', impact: 'high', description: '用户服务接口优化' },
            { id: 2, type: '配置变更', time: '1小时前', impact: 'medium', description: '数据库连接池配置调整' }
          ],
          summary: '发现2个相关变更，可能与当前问题相关'
        }
      },
      '日志分析': {
        type: 'log',
        data: {
          errors: [
            { level: 'ERROR', count: 156, message: 'Connection timeout' },
            { level: 'WARN', count: 89, message: 'Slow query detected' }
          ],
          summary: '日志中发现156个错误和89个警告'
        }
      },
      '代码分析': {
        type: 'code',
        data: {
          issues: [
            { type: '性能问题', file: 'UserService.java', line: 45, description: '数据库查询未优化' },
            { type: '内存泄漏', file: 'CacheManager.java', line: 123, description: '缓存对象未正确释放' }
          ],
          summary: '代码分析发现2个潜在问题'
        }
      }
    };

    return resultTypes[capability.name as keyof typeof resultTypes] || {
      type: 'generic',
      data: { summary: `${capability.name}分析完成` }
    };
  };

  // 开始分析过程
  const startAnalysisProcess = async () => {
    const plans = generateAnalysisPlan(inputText, selectedProblemType);
    setAnalysisSteps(plans);
    
    const controller = new AbortController();
    setAbortController(controller);
    
    try {
      await executeAnalysisPlans(plans, controller);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Analysis failed:', error);
        message.error('分析过程中出现错误');
      }
    }
  };

  // 执行分析计划
  const executeAnalysisPlans = async (plans: any[], controller: AbortController) => {
    for (let i = 0; i < plans.length; i++) {
      if (controller.signal.aborted) {
        throw new Error('Analysis aborted');
      }

      // 更新当前步骤状态为运行中
      setAnalysisSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'running' } : step
      ));

      // 模拟分析时间
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

      if (controller.signal.aborted) {
        throw new Error('Analysis aborted');
      }

      // 生成分析结果
      const result = generateAnalysisResult(config.capabilities[i], inputText);

      // 更新步骤状态为完成，并添加结果
      setAnalysisSteps(prev => prev.map((step, index) => 
        index === i ? { 
          ...step, 
          status: 'completed',
          showContent: true,
          result: result
        } : step
      ));
    }

    setIsAnalyzing(false);
    setAbortController(null);
  };

  // 处理案例点击
  const handleCaseClick = async (caseItem: any) => {
    // 如果有fullContent字段，使用完整内容；否则使用description
    const content = caseItem.fullContent || caseItem.description || `@${caseItem.title}`;
    setInputText(content);
    setShowCasePopover(false);
    
    // 开始分析
    await handleStartAnalysis();
  };

  // 开始分析
  const handleStartAnalysis = async () => {
    if (!inputText.trim()) {
      message.warning('请输入问题描述');
      return;
    }

    setIsTransitioning(true);
    
    // 延迟切换到分析视图，显示过渡动画
    setTimeout(() => {
      setViewMode('analysis');
      setIsTransitioning(false);
      setIsAnalyzing(true);
      setCurrentStep(0);
      startAnalysisProcess();
    }, 500);
  };

  // 停止分析
  const stopAnalysis = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsAnalyzing(false);
    
    // 将所有运行中的步骤标记为已停止
    setAnalysisSteps(prev => prev.map(step => 
      step.status === 'running' ? { ...step, status: 'pending' } : step
    ));
  };

  // 重新开始分析
  const restartAnalysis = () => {
    setViewMode('initial');
    setIsAnalyzing(false);
    setAnalysisSteps([]);
    setCurrentStep(0);
    setExpandedPanels([]);
    setInputText('');
    setLeftInputText('');
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  };

  // 处理问题类型点击
  const handleProblemTypeClick = (problemType: any) => {
    setCurrentProblemType(problemType.id);
    setShowCasePopover(true);
  };

  // 处理案例选择
  const handleCaseSelect = (caseItem: any) => {
    // 如果有fullContent字段，使用完整内容；否则使用description
    const content = caseItem.fullContent || caseItem.description || `@${caseItem.title}`;
    setInputText(content);
    setShowCasePopover(false);
    setCaseSearchText('');
  };

  // 获取当前问题类型的案例
  const getCurrentCases = () => {
    const problemType = config.problemTypes.find(pt => pt.id === currentProblemType);
    if (!problemType) return [];
    
    if (!caseSearchText) return problemType.cases;
    
    return problemType.cases.filter(c => 
      c.title.toLowerCase().includes(caseSearchText.toLowerCase()) ||
      c.description.toLowerCase().includes(caseSearchText.toLowerCase())
    );
  };

  // 渲染分析结果
  const renderAnalysisResult = (result: any) => {
    if (!result) return null;

    switch (result.type) {
      case 'clustering':
        return (
          <div>
            <h3>聚类分析结果</h3>
            <p>{result.data.summary}</p>
            {result.data.clusters.map((cluster: any) => (
              <Card key={cluster.id} size="small" style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 500 }}>{cluster.name} ({cluster.count}个)</div>
                <Space wrap style={{ marginTop: 4 }}>
                  {cluster.keywords.map((kw: string) => (
                    <Tag key={kw}>#{kw}</Tag>
                  ))}
                </Space>
              </Card>
            ))}
          </div>
        );
      
      case 'change':
        return (
          <div>
            <h3>变更分析结果</h3>
            <p>{result.data.summary}</p>
            {result.data.changes.map((change: any) => (
              <Card key={change.id} size="small" style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 500 }}>{change.description}</div>
                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                  {change.type} · {change.time} · 影响程度: {change.impact}
                </div>
              </Card>
            ))}
          </div>
        );
      
      case 'log':
        return (
          <div>
            <h3>日志分析结果</h3>
            <p>{result.data.summary}</p>
            {result.data.errors.map((error: any, index: number) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <Tag color={error.level === 'ERROR' ? 'red' : 'orange'}>
                  {error.level}
                </Tag>
                <span style={{ marginLeft: 8 }}>{error.message} ({error.count}次)</span>
              </div>
            ))}
          </div>
        );
      
      case 'code':
        return (
          <div>
            <h3>代码分析结果</h3>
            <p>{result.data.summary}</p>
            {result.data.issues.map((issue: any, index: number) => (
              <Card key={index} size="small" style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 500 }}>{issue.type}</div>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                  {issue.file}:{issue.line} - {issue.description}
                </div>
              </Card>
            ))}
          </div>
        );
      
      default:
        return (
          <div>
            <h3>分析结果</h3>
            <p>{result.data.summary}</p>
          </div>
        );
    }
  };

  return (
    <App>
      <MainLayout>
        <div style={{ padding: '24px', minHeight: '100vh' }}>
        {viewMode === 'initial' && (
          <div style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(-20px)' : 'translateY(0)',
            transition: 'all 0.5s ease-in-out'
          }}>
            {/* Agent介绍 */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  background: config.gradient,
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 32
                }}>
                  {config.icon}
                </div>
                <div>
                  <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, color: '#262626' }}>
                    {config.title}
                  </h1>
                  <p style={{ color: '#8c8c8c', fontSize: 16, margin: '8px 0 0 0' }}>
                    {config.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 输入区域 */}
            <Card style={{ marginBottom: 24 }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* 问题描述输入 */}
                <div>
                  <TextArea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`请描述您遇到的问题，我将使用${config.name}为您分析...`}
                    rows={inputText.length > 200 ? 15 : 4}
                    style={{ fontSize: 13, fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace' }}
                    autoSize={{ minRows: 4, maxRows: 20 }}
                  />
                </div>

                {/* 底部控制栏 */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: 12,
                  borderTop: '1px solid #f0f0f0'
                }}>
                  {/* Agent选择和问题类型 */}
                  <Space size="middle">
                    <Select
                      value={selectedAgent}
                      onChange={setSelectedAgent}
                      style={{ width: 120 }}
                      size="small"
                    >
                      {config.agents.map(agent => (
                        <Option key={agent.id} value={agent.id}>
                          <Space>
                            <AimOutlined />
                            {agent.name}
                          </Space>
                        </Option>
                      ))}
                    </Select>

                    {config.problemTypes.map(problemType => (
                      <Popover
                        key={problemType.id}
                        content={
                          <div style={{ width: 300, maxHeight: 400, overflow: 'auto' }}>
                            <Input
                              placeholder="搜索案例..."
                              value={caseSearchText}
                              onChange={(e) => setCaseSearchText(e.target.value)}
                              style={{ marginBottom: 12 }}
                              prefix={<SearchOutlined />}
                            />
                            <List
                              size="small"
                              dataSource={getCurrentCases()}
                              renderItem={(item: any) => (
                                <List.Item
                                  style={{ cursor: 'pointer', padding: '8px 0' }}
                                  onClick={() => handleCaseSelect(item)}
                                >
                                  <div>
                                    <div style={{ fontWeight: 500, marginBottom: 4 }}>
                                      {item.title}
                                    </div>
                                    <div style={{ 
                                      fontSize: 12, 
                                      color: '#8c8c8c',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical'
                                    }}>
                                      {item.description}
                                    </div>
                                  </div>
                                </List.Item>
                              )}
                            />
                          </div>
                        }
                        title={problemType.name}
                        trigger="click"
                        open={showCasePopover && currentProblemType === problemType.id}
                        onOpenChange={(visible) => {
                          if (!visible) {
                            setShowCasePopover(false);
                            setCaseSearchText('');
                          }
                        }}
                      >
                        <Tag
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleProblemTypeClick(problemType)}
                        >
                          {problemType.name}
                        </Tag>
                      </Popover>
                    ))}
                  </Space>

                  {/* 发送按钮 */}
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleStartAnalysis}
                    disabled={!inputText.trim()}
                  >
                    开始分析
                  </Button>
                </div>
              </Space>
            </Card>

            {/* 演示案例 */}
            <Divider style={{ margin: '10px 0 24px 0' }} />
            <div style={{ padding: '0 24px 24px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                演示案例
              </h3>
              <Row gutter={[24, 24]}>
                {config.problemTypes.slice(0, 3).map((problemType, typeIndex) => {
                  const caseItem = problemType.cases[0];
                  if (!caseItem) return null;
                  const caseContent = caseItem.fullContent || caseItem.description || caseItem.title || '';
                  const isStackInfo = caseContent.includes('堆栈') || caseContent.includes('Stack') || caseContent.includes('at ');
                  
                  return (
                    <Col span={8} key={`${problemType.id}-${caseItem.id}`}>
                      <Card
                        hoverable
                        onClick={() => handleCaseClick(caseItem)}
                        style={{ 
                          cursor: 'pointer',
                          height: 267,
                          background: '#fff',
                          border: '1px solid #e8e8e8',
                          borderRadius: 12,
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        styles={{ body: { padding: 0, height: '100%', display: 'flex', flexDirection: 'column' } }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {/* 标题栏 */}
                        <div style={{
                          background: `linear-gradient(135deg, ${getCategoryGradient(typeIndex)} 0%, ${getCategoryGradient(typeIndex, true)} 100%)`,
                          padding: '16px 20px',
                          color: '#fff',
                          flexShrink: 0
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                              width: 36,
                              height: 36,
                              background: 'rgba(255,255,255,0.2)',
                              borderRadius: 8,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backdropFilter: 'blur(10px)'
                            }}>
                              <span style={{ fontSize: 18 }}>
                                {getCategoryIcon(problemType.name)}
                              </span>
                            </div>
                            <div>
                              <h4 style={{ 
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 600,
                                margin: 0,
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                              }}>
                                {problemType.name}
                              </h4>
                              <div style={{ 
                                fontSize: 12, 
                                color: 'rgba(255,255,255,0.9)',
                                marginTop: 2
                              }}>
                                {caseItem.title}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 案例内容 */}
                        <div style={{ 
                          padding: '16px 20px',
                          flex: 1,
                          overflow: 'auto'
                        }}>
                          <pre style={{
                            margin: 0,
                            fontSize: 11,
                            lineHeight: 1.6,
                            color: '#262626',
                            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            background: isStackInfo ? '#f5f5f5' : 'transparent',
                            padding: isStackInfo ? '12px' : 0,
                            borderRadius: isStackInfo ? '6px' : 0,
                            border: isStackInfo ? '1px solid #e8e8e8' : 'none'
                          }}>
                            {caseContent}
                          </pre>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        )}

        {viewMode === 'analysis' && (
          <div style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
            transition: 'all 0.5s ease-in-out'
          }}>
            <Row gutter={24} style={{ height: '100vh' }}>
              {/* 左侧分析过程 */}
              <Col span={10}>
                <div style={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #f0f0f0'
                }}>
                  {/* 标题栏 */}
                  <div style={{ 
                    padding: '16px 20px', 
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                      分析过程
                    </h3>
                    <Space>
                      {isAnalyzing && (
                        <Button
                          size="small"
                          icon={<StopOutlined />}
                          onClick={stopAnalysis}
                          danger
                        >
                          停止
                        </Button>
                      )}
                      <Button
                        size="small"
                        icon={<ReloadOutlined />}
                        onClick={restartAnalysis}
                      >
                        重新开始
                      </Button>
                    </Space>
                  </div>

                  {/* 分析步骤列表 */}
                  <div style={{ 
                    flex: 1, 
                    overflow: 'auto', 
                    padding: '16px 20px'
                  }}>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      {analysisSteps.map((step, index) => (
                        <div
                          key={step.key}
                          style={{
                            background: currentStep === index ? '#f6ffed' : '#fff',
                            border: currentStep === index ? '2px solid #1890ff' : 
                                   step.status === 'running' ? '2px solid #52c41a' : '1px solid #e8e8e8',
                            borderRadius: 8,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                          }}
                          onClick={() => {
                            setCurrentStep(index);
                            if (step.showContent) {
                              if (expandedPanels.includes(step.key)) {
                                setExpandedPanels(expandedPanels.filter((k: string) => k !== step.key));
                              } else {
                                setExpandedPanels([...expandedPanels, step.key]);
                              }
                            }
                          }}
                        >
                          <div style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {step.status === 'running' && <LoadingOutlined spin />}
                                {step.status === 'completed' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#52c41a' }}></div>}
                                {step.status === 'pending' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d9d9d9' }}></div>}
                                <span style={{ fontWeight: 500, fontSize: 14 }}>{step.title}</span>
                              </div>
                            </div>
                            
                            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4, marginLeft: 14 }}>
                              目标：{step.target}
                            </div>

                            {expandedPanels.includes(step.key) && step.showContent && (
                              <div style={{ 
                                marginTop: 12, 
                                marginLeft: 14,
                                paddingTop: 12,
                                borderTop: '1px solid #f0f0f0'
                              }}>
                                <div style={{ fontSize: 13, color: '#595959', marginBottom: 8 }}>
                                  {step.content}
                                </div>
                                {step.result && renderAnalysisResult(step.result)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </Space>
                  </div>

                  {/* 底部输入框 */}
                  <div style={{ 
                    padding: '12px 20px', 
                    borderTop: '1px solid #f0f0f0',
                    background: '#fafafa'
                  }}>
                    <Space.Compact style={{ width: '100%' }}>
                      <Input
                        value={leftInputText}
                        onChange={(e) => setLeftInputText(e.target.value)}
                        placeholder="随时输入问题或打断分析..."
                        style={{ flex: 1 }}
                        size="small"
                        onPressEnter={() => {
                          if (leftInputText.trim()) {
                            message.info(`收到您的问题: ${leftInputText}`);
                            setLeftInputText('');
                          }
                        }}
                      />
                      <Button 
                        size="small" 
                        type="primary" 
                        icon={<SendOutlined />}
                        onClick={() => {
                          if (leftInputText.trim()) {
                            message.info(`收到您的问题: ${leftInputText}`);
                            setLeftInputText('');
                          }
                        }}
                      />
                    </Space.Compact>
                  </div>
                </div>
              </Col>

              {/* 右侧详细结果 */}
              <Col span={14}>
                <Card 
                  style={{ height: '100%' }}
                  title={
                    analysisSteps[currentStep] ? (
                      <Space>
                        <span>{analysisSteps[currentStep].title}</span>
                        {analysisSteps[currentStep].status === 'running' && <LoadingOutlined spin />}
                        {analysisSteps[currentStep].status === 'completed' && <Badge status="success" />}
                      </Space>
                    ) : '分析结果'
                  }
                >
                  <div style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
                    {!analysisSteps[currentStep] ? (
                      <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#8c8c8c'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <AimOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                          <div>等待分析开始...</div>
                        </div>
                      </div>
                    ) : !analysisSteps[currentStep]?.result ? (
                      <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div>
                          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
                            {analysisSteps[currentStep]?.title}
                          </h2>
                          <p style={{ color: '#8c8c8c', marginTop: 8, fontSize: 14 }}>
                            目标：{analysisSteps[currentStep]?.target}
                          </p>
                        </div>

                        <Card>
                          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                            分析内容
                          </div>
                          <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6 }}>
                            {analysisSteps[currentStep]?.content}
                          </div>
                        </Card>

                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          padding: '40px 0'
                        }}>
                          <Space direction="vertical" size={16} style={{ textAlign: 'center' }}>
                            {analysisSteps[currentStep].status === 'running' ? (
                              <>
                                <LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />
                                <div style={{ fontSize: 16, color: '#595959' }}>
                                  正在执行分析...
                                </div>
                                <div style={{ fontSize: 14, color: '#8c8c8c' }}>
                                  请稍候，分析结果即将呈现
                                </div>
                              </>
                            ) : (
                              <>
                                <div style={{ fontSize: 48 }}>⏳</div>
                                <div style={{ fontSize: 16, color: '#8c8c8c' }}>
                                  等待执行
                                </div>
                                <div style={{ fontSize: 14, color: '#bfbfbf' }}>
                                  将在前序步骤完成后开始执行
                                </div>
                              </>
                            )}
                          </Space>
                        </div>
                      </Space>
                    ) : (
                      <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div>
                          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
                            {analysisSteps[currentStep]?.title}
                          </h2>
                          <p style={{ color: '#8c8c8c', marginTop: 8, fontSize: 14 }}>
                            分析已完成
                          </p>
                        </div>
                        
                        {renderAnalysisResult(analysisSteps[currentStep].result)}
                      </Space>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
      </MainLayout>
    </App>
  );
}
