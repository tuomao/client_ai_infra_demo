'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Space, Input, Select, Tag, Steps, Alert, Progress, Divider, Row, Col, Statistic, Badge, Popover, List, App, message, Collapse } from 'antd';
import {
  AimOutlined,
  LoadingOutlined,
  SendOutlined,
  ReloadOutlined,
  StopOutlined,
  SearchOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import StreamingText from './StreamingText';
import { 
  generateThinkingContent, 
  generateDetailedAnalysis, 
  generateAnalysisResult,
  generateFinalConclusion 
} from './analysisDataGenerator';

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

type AnalysisPhase = 'initial' | 'thinking' | 'todo-list' | 'conclusion';

interface TodoItem {
  key: string;
  title: string;
  target: string;
  status: 'pending' | 'running' | 'completed' | 'skipped';
  detailedAnalysis: string; // 详细分析过程（流式输出）
  result: {
    summary: string; // 结果摘要（显示在左侧卡片）
    fullResult: any; // 完整结果（展开时显示）
    confidence: number; // 置信度，用于判断是否可以提前终止
  } | null;
}

export default function UniversalAgent({ config }: UniversalAgentProps) {
  const [viewMode, setViewMode] = useState<'initial' | 'analysis'>('initial');
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>('initial');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // 阶段一：思考内容
  const [thinkingContent, setThinkingContent] = useState('');
  const [thinkingComplete, setThinkingComplete] = useState(false);
  
  // 阶段二：TODO List
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [currentTodoIndex, setCurrentTodoIndex] = useState<number | null>(null);
  const [expandedTodos, setExpandedTodos] = useState<string[]>([]);
  const [streamedTodos, setStreamedTodos] = useState<Set<string>>(new Set()); // 记录已完成流式输出的TODO
  
  // 阶段三：最终结论
  const [finalConclusion, setFinalConclusion] = useState('');
  const [conclusionComplete, setConclusionComplete] = useState(false);
  
  // 滚动容器ref
  const leftPanelScrollRef = useRef<HTMLDivElement>(null);
  const rightPanelScrollRef = useRef<HTMLDivElement>(null);
  
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

  // 生成思考内容（使用智能生成器）
  const generateThinkingContentLocal = (problemText: string): string => {
    return generateThinkingContent(problemText, config.id, config.name, selectedProblemType);
  };

  // 生成TODO List
  const generateTodoList = (problemText: string): TodoItem[] => {
    const todos: TodoItem[] = [];
    
    config.capabilities.forEach((capability, index) => {
      todos.push({
        key: `todo_${index}`,
        title: capability.name,
        target: `分析${problemText.substring(0, 50)}${problemText.length > 50 ? '...' : ''}中的${capability.name}相关问题`,
        status: 'pending',
        detailedAnalysis: '',
        result: null
      });
    });

    return todos;
  };

  // 生成详细分析过程（使用智能生成器）
  const generateDetailedAnalysisLocal = (capability: any, problemText: string): string => {
    return generateDetailedAnalysis(capability, problemText, config.id);
  };

  // 生成分析结果（使用智能生成器）
  const generateAnalysisResultLocal = (capability: any, problemText: string) => {
    return generateAnalysisResult(capability, problemText, config.id);
  };

  // PlanningAgent: 判断是否可以提前终止
  const shouldEarlyTerminate = (completedTodos: TodoItem[]): boolean => {
    // 如果某个TODO的置信度超过0.9，且结果明确指向根本原因，可以提前终止
    const highConfidenceTodo = completedTodos.find(todo => 
      todo.result && todo.result.confidence >= 0.9
    );
    
    if (highConfidenceTodo) {
      // 检查结果是否明确指向根本原因
      const result = highConfidenceTodo.result!.fullResult;
      if (result.type === 'log' && result.data.errors.some((e: any) => e.level === 'ERROR')) {
        return true; // 日志分析发现明确的错误，可以提前终止
      }
    }
    
    return false;
  };

  // 生成最终结论（使用智能生成器）
  const generateFinalConclusionLocal = (completedTodos: TodoItem[]): string => {
    return generateFinalConclusion(
      completedTodos.map(todo => ({
        title: todo.title,
        result: todo.result
      })),
      inputText,
      config.id
    );
  };

  // 阶段一：问题分析与思考（流式输出）
  const startThinkingPhase = async (controller: AbortController) => {
    setAnalysisPhase('thinking');
    const thinking = generateThinkingContentLocal(inputText);
    setThinkingContent(thinking);
    
    // 等待流式输出完成（模拟）
    await new Promise(resolve => setTimeout(resolve, thinking.length * 30));
    
    if (controller.signal.aborted) throw new Error('Analysis aborted');
    
    setThinkingComplete(true);
    
    // 短暂延迟后进入TODO阶段
    await new Promise(resolve => setTimeout(resolve, 500));
    if (controller.signal.aborted) throw new Error('Analysis aborted');
  };

  // 阶段二：执行TODO List
  const executeTodoList = async (controller: AbortController) => {
    setAnalysisPhase('todo-list');
    const todos = generateTodoList(inputText);
    setTodoList(todos);
    
    const completedTodos: TodoItem[] = [];
    
    for (let i = 0; i < todos.length; i++) {
      if (controller.signal.aborted) {
        throw new Error('Analysis aborted');
      }

      // 设置当前执行的TODO
      setCurrentTodoIndex(i);
      
      // 更新TODO状态为运行中
      setTodoList(prev => prev.map((todo, index) => 
        index === i ? { ...todo, status: 'running' } : todo
      ));

      // 生成详细分析内容
      const detailedAnalysis = generateDetailedAnalysisLocal(config.capabilities[i], inputText);
      
      // 流式输出详细分析过程
      setTodoList(prev => prev.map((todo, index) => 
        index === i ? { ...todo, detailedAnalysis } : todo
      ));
      
      // 模拟分析时间（根据内容长度），等待流式输出完成
      // 注意：实际的流式输出完成标记在StreamingText的onComplete回调中处理
      await new Promise(resolve => setTimeout(resolve, detailedAnalysis.length * 20));

      if (controller.signal.aborted) {
        throw new Error('Analysis aborted');
      }

      // 生成分析结果
      const result = generateAnalysisResultLocal(config.capabilities[i], inputText);
      
      // 更新TODO状态为完成，并添加结果
      const completedTodo: TodoItem = {
        ...todos[i],
        status: 'completed',
        detailedAnalysis,
        result
      };
      
      setTodoList(prev => prev.map((todo, index) => 
        index === i ? completedTodo : todo
      ));
      
      completedTodos.push(completedTodo);
      
      // PlanningAgent判断：是否可以提前终止
      if (shouldEarlyTerminate(completedTodos)) {
        // 跳过剩余的TODO
        setTodoList(prev => prev.map((todo, index) => 
          index > i ? { ...todo, status: 'skipped' } : todo
        ));
        break;
      }
      
      // 短暂延迟
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setCurrentTodoIndex(null);
    return completedTodos;
  };

  // 阶段三：生成最终结论
  const generateConclusionPhase = async (completedTodos: TodoItem[], controller: AbortController) => {
    setAnalysisPhase('conclusion');
    const conclusion = generateFinalConclusionLocal(completedTodos);
    setFinalConclusion(conclusion);
    
    // 等待流式输出完成
    await new Promise(resolve => setTimeout(resolve, conclusion.length * 30));
    
    if (controller.signal.aborted) throw new Error('Analysis aborted');
    
    setConclusionComplete(true);
  };

  // 开始完整分析过程
  const startAnalysisProcess = async () => {
    const controller = new AbortController();
    setAbortController(controller);
    
    try {
      // 阶段一：思考
      await startThinkingPhase(controller);
      
      // 阶段二：执行TODO List
      const completedTodos = await executeTodoList(controller);
      
      // 阶段三：生成结论
      await generateConclusionPhase(completedTodos, controller);
      
      setIsAnalyzing(false);
      setAbortController(null);
    } catch (error: any) {
      if (error.name !== 'AbortError' && error.message !== 'Analysis aborted') {
        console.error('Analysis failed:', error);
        message.error('分析过程中出现错误');
      }
      setIsAnalyzing(false);
      setAbortController(null);
    }
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
    
    // 将当前运行的TODO标记为已停止
    setTodoList(prev => prev.map(todo => 
      todo.status === 'running' ? { ...todo, status: 'pending' } : todo
    ));
    setCurrentTodoIndex(null);
  };

  // 重新开始分析
  const restartAnalysis = () => {
    setViewMode('initial');
    setIsAnalyzing(false);
    setAnalysisPhase('initial');
    setThinkingContent('');
    setThinkingComplete(false);
    setTodoList([]);
    setCurrentTodoIndex(null);
    setExpandedTodos([]);
    setStreamedTodos(new Set());
    setFinalConclusion('');
    setConclusionComplete(false);
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

  // 渲染完整分析结果（展开时显示）
  const renderFullAnalysisResult = (result: any) => {
    if (!result || !result.fullResult) return null;

    const { fullResult } = result;

    switch (fullResult.type) {
      case 'clustering':
        return (
          <div>
            {/* 用户集群 */}
            {fullResult.data.clusters.map((cluster: any) => (
              <Card key={cluster.id} size="small" style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 500 }}>{cluster.name} ({cluster.count}%)</div>
                <Space wrap style={{ marginTop: 4 }}>
                  {cluster.keywords.map((kw: string) => (
                    <Tag key={kw}>#{kw}</Tag>
                  ))}
                </Space>
              </Card>
            ))}
            
            {/* 与大盘对比分析 */}
            {fullResult.data.comparison && (
              <Card size="small" style={{ marginTop: 12, background: '#f0f5ff', border: '1px solid #adc6ff' }}>
                <div style={{ fontWeight: 500, marginBottom: 8, color: '#1890ff' }}>📊 与大盘用户分布对比</div>
                {Object.entries(fullResult.data.comparison).map(([key, value]: [string, any]) => (
                  <div key={key} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12 }}>{key}</span>
                      <Space>
                        <span style={{ fontSize: 12, color: '#8c8c8c' }}>大盘: {value.baseline}%</span>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>问题: {value.problem}%</span>
                        <Tag 
                          color={value.status === 'high' ? 'red' : value.status === 'missing' ? 'orange' : 'blue'}
                        >
                          {value.diff > 0 ? '+' : ''}{value.diff}%
                        </Tag>
                      </Space>
                    </div>
                    <Progress 
                      percent={value.problem} 
                      size="small" 
                      showInfo={false}
                      strokeColor={value.status === 'high' ? '#ff4d4f' : value.status === 'missing' ? '#faad14' : '#1890ff'}
                    />
                  </div>
                ))}
              </Card>
            )}
            
            {/* 典型特征识别 */}
            {fullResult.data.typicalFeatures && (
              <Card size="small" style={{ marginTop: 12, background: '#fff7e6', border: '1px solid #ffd591' }}>
                <div style={{ fontWeight: 500, marginBottom: 8, color: '#faad14' }}>🔍 典型特征识别</div>
                {fullResult.data.typicalFeatures.map((feature: any, index: number) => (
                  <div key={index} style={{ marginBottom: 8, paddingLeft: 8, borderLeft: '3px solid #faad14' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                      {feature.type === 'single_platform' && '单端问题特征'}
                      {feature.type === 'version_introduction' && '版本引入时间特征'}
                      {feature.type === 'system_version' && '系统版本特征'}
                      {feature.type === 'device_brand' && '品牌设备特征'}
                      {feature.type === 'memory_config' && '内存配置特征'}
                    </div>
                    <div style={{ fontSize: 12, color: '#595959', marginBottom: 4 }}>
                      {feature.description}
                    </div>
                    <Tag color="green">置信度: {Math.round(feature.confidence * 100)}%</Tag>
                  </div>
                ))}
              </Card>
            )}
            
            {/* 推理线索 */}
            {fullResult.data.inference && (
              <Card size="small" style={{ marginTop: 12, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                <div style={{ fontWeight: 500, marginBottom: 8, color: '#52c41a' }}>💡 推理线索</div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#52c41a', marginBottom: 4 }}>排查方向应聚焦：</div>
                  <Space wrap>
                    {fullResult.data.inference.focus.map((item: string, index: number) => (
                      <Tag key={index} color="green">{item}</Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#faad14', marginBottom: 4 }}>可以排除：</div>
                  <Space wrap>
                    {fullResult.data.inference.exclude.map((item: string, index: number) => (
                      <Tag key={index} color="default">{item}</Tag>
                    ))}
                  </Space>
                </div>
              </Card>
            )}
          </div>
        );
      
      case 'change':
        return (
          <div>
            {fullResult.data.changes.map((change: any) => (
              <Card 
                key={change.id} 
                size="small" 
                style={{ 
                  marginBottom: 8,
                  borderLeft: change.type === 'Switch变更' ? '3px solid #1890ff' : '3px solid #52c41a'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Tag color={change.type === 'Switch变更' ? 'blue' : 'green'}>
                    {change.type === 'Switch变更' ? '🔧 Switch' : '🧪 实验'}
                  </Tag>
                  <span style={{ fontWeight: 500, fontSize: 13 }}>
                    {change.name || change.experimentId}
                  </span>
                  {change.impact === 'high' && (
                    <Tag color="red">高影响</Tag>
                  )}
                </div>
                <div style={{ fontSize: 13, color: '#262626', marginBottom: 4 }}>
                  {change.description}
                </div>
                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                  <Space split={<span style={{ margin: '0 4px' }}>·</span>}>
                    <span>时间: {change.time}</span>
                    {change.operator && <span>操作人: {change.operator}</span>}
                    {change.scope && <span>影响范围: {change.scope}</span>}
                    {change.experimentId && <span>实验ID: {change.experimentId}</span>}
                  </Space>
                </div>
                
                {/* 实验命中率对比分析 */}
                {change.hitRateComparison && (
                  <div style={{ 
                    marginTop: 8, 
                    padding: 8, 
                    background: '#fff7e6', 
                    borderRadius: 4,
                    border: '1px solid #ffd591'
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#faad14', marginBottom: 4 }}>
                      🎯 实验命中率对比分析
                    </div>
                    <div style={{ fontSize: 12, color: '#595959' }}>
                      <div>命中实验用户问题率: <span style={{ fontWeight: 500, color: '#ff4d4f' }}>{change.hitRateComparison.hitProblemRate}%</span></div>
                      <div>未命中实验用户问题率: <span style={{ fontWeight: 500, color: '#52c41a' }}>{change.hitRateComparison.notHitProblemRate}%</span></div>
                      <div style={{ marginTop: 4 }}>
                        差异: <Tag color={change.hitRateComparison.status === 'extreme' ? 'red' : 'orange'}>
                          {change.hitRateComparison.diff > 0 ? '+' : ''}{change.hitRateComparison.diff}%
                        </Tag>
                        {change.hitRateComparison.status === 'extreme' && (
                          <Tag color="red" style={{ marginLeft: 4 }}>极度异常</Tag>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 时间关联分析 */}
                {change.timeMatch && (
                  <div style={{ 
                    marginTop: 8, 
                    padding: 8, 
                    background: '#f0f5ff', 
                    borderRadius: 4,
                    border: '1px solid #adc6ff'
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#1890ff', marginBottom: 4 }}>
                      ⏰ 时间关联分析
                    </div>
                    <div style={{ fontSize: 12, color: '#595959' }}>
                      <div>实验变更时间: {change.timeMatch.experimentTime}</div>
                      <div>问题开始时间: {change.timeMatch.problemStartTime}</div>
                      <div style={{ marginTop: 4 }}>
                        时间吻合度: <Tag color="blue">{change.timeMatch.matchRate}%</Tag>
                        {change.timeMatch.matchRate === 100 && (
                          <Tag color="red" style={{ marginLeft: 4 }}>强烈暗示实验导致问题</Tag>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        );
      
      case 'log':
        return (
          <div>
            {fullResult.data.errors.map((error: any, index: number) => (
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
            {fullResult.data.issues.map((issue: any, index: number) => (
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
        return null;
    }
  };

  // 截断文本（用于左侧卡片摘要）
  const truncateText = (text: string, maxLength: number = 80): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
            {/* 从思考阶段开始就显示左右两栏结构 */}
            <Row gutter={24} style={{ minHeight: 'calc(100vh - 100px)' }}>
              {/* 左侧：PlanningAgent - 思考内容、TODO卡片列表和最终结论 */}
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
                      <BulbOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                      PlanningAgent
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

                  {/* 思考内容、TODO列表和结论 */}
                  <div 
                    ref={leftPanelScrollRef}
                    style={{ 
                      flex: 1, 
                      overflow: 'auto', 
                      padding: '16px 20px'
                    }}
                  >
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      {/* 阶段一：问题分析与思考（显示在左侧面板顶部，始终保留） */}
                      {thinkingContent && (
                        <Card
                          size="small"
                          style={{
                            background: '#fff7e6',
                            border: '1px solid #ffd591',
                            borderRadius: 8,
                          }}
                        >
                          <div style={{ padding: '8px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <BulbOutlined style={{ color: '#faad14', fontSize: 16 }} />
                              <span style={{ fontWeight: 500, fontSize: 14 }}>问题分析与思考</span>
                            </div>
                            {analysisPhase === 'thinking' ? (
                              <StreamingText 
                                text={thinkingContent}
                                speed={30}
                                autoScroll={true}
                                scrollContainerRef={leftPanelScrollRef}
                                style={{ fontSize: 13, lineHeight: 1.8, color: '#262626' }}
                              />
                            ) : (
                              <div style={{ fontSize: 13, lineHeight: 1.8, color: '#262626', whiteSpace: 'pre-wrap' }}>
                                {thinkingContent}
                              </div>
                            )}
                          </div>
                        </Card>
                      )}

                      {/* 阶段二和阶段三：TODO卡片列表 */}
                      {(analysisPhase === 'todo-list' || analysisPhase === 'conclusion') && todoList.map((todo, index) => {
                          const isExpanded = expandedTodos.includes(todo.key);
                          const isSelected = currentTodoIndex === index;
                          
                          return (
                            <Card
                              key={todo.key}
                              size="small"
                              style={{
                                background: isSelected ? '#f6ffed' : '#fff',
                                border: isSelected ? '2px solid #1890ff' : 
                                       todo.status === 'running' ? '2px solid #52c41a' : 
                                       todo.status === 'completed' ? '1px solid #52c41a' :
                                       todo.status === 'skipped' ? '1px solid #d9d9d9' : '1px solid #e8e8e8',
                                borderRadius: 8,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                              }}
                              onClick={() => {
                                if (todo.status !== 'pending' && todo.status !== 'skipped') {
                                  setCurrentTodoIndex(index);
                                }
                              }}
                            >
                              <div style={{ padding: '8px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {todo.status === 'running' && <LoadingOutlined spin style={{ color: '#52c41a' }} />}
                                    {todo.status === 'completed' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
                                    {todo.status === 'pending' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#d9d9d9' }}></div>}
                                    {todo.status === 'skipped' && <Tag color="default">已跳过</Tag>}
                                    <span style={{ fontWeight: 500, fontSize: 14 }}>{todo.title}</span>
                                  </div>
                                  {todo.status === 'completed' && todo.result && (
                                    <Button
                                      type="text"
                                      size="small"
                                      icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isExpanded) {
                                          setExpandedTodos(expandedTodos.filter(k => k !== todo.key));
                                        } else {
                                          setExpandedTodos([...expandedTodos, todo.key]);
                                        }
                                      }}
                                    />
                                  )}
                                </div>
                                
                                {/* 分析目标 */}
                                <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 8, marginLeft: 24 }}>
                                  📝 {todo.target}
                                </div>

                                {/* 结果摘要（完成后显示） */}
                                {todo.status === 'completed' && todo.result && (
                                  <div style={{ 
                                    marginLeft: 24,
                                    padding: '8px 12px',
                                    background: '#f6ffed',
                                    borderRadius: 4,
                                    border: '1px solid #b7eb8f'
                                  }}>
                                    <div style={{ fontSize: 12, fontWeight: 500, color: '#389e0d', marginBottom: 4 }}>
                                      ✅ 分析结果
                                    </div>
                                    <div style={{ fontSize: 13, color: '#262626' }}>
                                      {truncateText(todo.result.summary, 80)}
                                    </div>
                                    {todo.result.confidence >= 0.9 && (
                                      <Tag color="green" style={{ marginTop: 4 }}>
                                        高置信度 ({Math.round(todo.result.confidence * 100)}%)
                                      </Tag>
                                    )}
                                  </div>
                                )}

                                {/* 展开显示完整结果 */}
                                {isExpanded && todo.result && (
                                  <div style={{ 
                                    marginTop: 12, 
                                    marginLeft: 24,
                                    paddingTop: 12,
                                    borderTop: '1px solid #f0f0f0'
                                  }}>
                                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: '#595959' }}>
                                      完整分析结果：
                                    </div>
                                    {renderFullAnalysisResult(todo.result)}
                                  </div>
                                )}
                              </div>
                            </Card>
                          );
                        })}

                      {/* 最终结论（阶段三） */}
                      {analysisPhase === 'conclusion' && finalConclusion && (
                        <Card
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: 8,
                            marginTop: 16
                          }}
                        >
                          <div style={{ color: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                              <CheckCircleOutlined style={{ fontSize: 20 }} />
                              <span style={{ fontSize: 16, fontWeight: 600 }}>最终结论</span>
                            </div>
                            <StreamingText 
                              text={finalConclusion}
                              speed={30}
                              autoScroll={true}
                              scrollContainerRef={leftPanelScrollRef}
                              style={{ fontSize: 14, lineHeight: 1.8, color: '#fff' }}
                            />
                          </div>
                        </Card>
                      )}
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
                              stopAnalysis();
                              message.info(`已打断分析，收到您的问题: ${leftInputText}`);
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
                              stopAnalysis();
                              message.info(`已打断分析，收到您的问题: ${leftInputText}`);
                              setLeftInputText('');
                            }
                          }}
                        />
                      </Space.Compact>
                    </div>
                  </div>
                </Col>

              {/* 右侧：详细分析过程面板 */}
              <Col span={14}>
                <Card 
                  style={{ height: '100%' }}
                  title={
                    currentTodoIndex !== null && todoList[currentTodoIndex] ? (
                      `分析详情-${todoList[currentTodoIndex].title}`
                    ) : analysisPhase === 'thinking' ? (
                      '分析详情'
                    ) : '分析详情'
                  }
                >
                  <div 
                    ref={rightPanelScrollRef}
                    style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
                  >
                    {/* 思考阶段：显示占位提示 */}
                    {analysisPhase === 'thinking' ? (
                      <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#8c8c8c'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <BulbOutlined style={{ fontSize: 48, marginBottom: 16, color: '#faad14' }} />
                          <div>正在分析问题，请稍候...</div>
                        </div>
                      </div>
                    ) : currentTodoIndex === null ? (
                      <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#8c8c8c'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <AimOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                          <div>点击左侧TODO卡片查看详细分析过程</div>
                        </div>
                      </div>
                    ) : (
                      <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div>
                          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
                            {todoList[currentTodoIndex].title}
                          </h2>
                          <p style={{ color: '#8c8c8c', marginTop: 8, fontSize: 14 }}>
                            目标：{todoList[currentTodoIndex].target}
                          </p>
                        </div>

                        {/* 详细分析过程（根据是否已流式输出决定显示方式） */}
                        {todoList[currentTodoIndex].detailedAnalysis ? (
                          <Card>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                              🧠 详细分析过程
                            </div>
                            {streamedTodos.has(todoList[currentTodoIndex].key) ? (
                              // 已完成流式输出，直接显示完整文本
                              <div style={{ fontSize: 13, lineHeight: 1.8, color: '#595959', whiteSpace: 'pre-wrap' }}>
                                {todoList[currentTodoIndex].detailedAnalysis}
                              </div>
                            ) : (
                              // 首次分析，使用流式输出
                              <StreamingText 
                                text={todoList[currentTodoIndex].detailedAnalysis}
                                speed={20}
                                autoScroll={true}
                                scrollContainerRef={rightPanelScrollRef}
                                onComplete={() => {
                                  // 流式输出完成后，添加到streamedTodos
                                  setStreamedTodos(prev => new Set(prev).add(todoList[currentTodoIndex].key));
                                }}
                                style={{ fontSize: 13, lineHeight: 1.8, color: '#595959', whiteSpace: 'pre-wrap' }}
                              />
                            )}
                          </Card>
                        ) : todoList[currentTodoIndex].status === 'running' ? (
                            <Card>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                padding: '40px 0'
                              }}>
                                <Space direction="vertical" size={16} style={{ textAlign: 'center' }}>
                                  <LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />
                                  <div style={{ fontSize: 16, color: '#595959' }}>
                                    正在执行分析...
                                  </div>
                                </Space>
                              </div>
                            </Card>
                          ) : (
                            <Card>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                padding: '40px 0'
                              }}>
                                <div style={{ fontSize: 48 }}>⏳</div>
                                <div style={{ fontSize: 16, color: '#8c8c8c', marginTop: 16 }}>
                                  等待执行
                                </div>
                              </div>
                            </Card>
                          )}

                          {/* 分析结果（如果已完成） */}
                          {todoList[currentTodoIndex].status === 'completed' && todoList[currentTodoIndex].result && (
                            <Card>
                              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                                ✅ 分析结果
                              </div>
                              <div style={{ fontSize: 13, color: '#262626', marginBottom: 12 }}>
                                {todoList[currentTodoIndex].result.summary}
                              </div>
                              {renderFullAnalysisResult(todoList[currentTodoIndex].result)}
                            </Card>
                        )}
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
