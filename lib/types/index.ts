// 核心数据类型定义

// 白屏问题类型
export interface WhiteScreenIssue {
  id: string;
  title: string;
  timestamp: string;
  affectedUsers: number;
  version: string;
  status: 'pending' | 'analyzing' | 'resolved' | 'ignored';
  severity: 'critical' | 'high' | 'medium' | 'low';
  errorStack: string;
  environment: EnvironmentInfo;
  aiAnalysis?: AIAnalysis;
  trace?: TraceData[];
  similarIssues?: string[];
}

// 环境信息
export interface EnvironmentInfo {
  device: string;
  os: string;
  osVersion: string;
  browser?: string;
  browserVersion?: string;
  network: string;
  appVersion: string;
}

// AI分析结果
export interface AIAnalysis {
  rootCause: string;
  relatedCode: CodeSnippet[];
  possibleReasons: string[];
  solution: string;
  confidence: number;
  analysisSteps: AnalysisStep[];
  thinkingChain?: ThinkingStep[];
}

// 思维链步骤
export interface ThinkingStep {
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

// 代码片段
export interface CodeSnippet {
  file: string;
  line: number;
  code: string;
  language: string;
}

// 分析步骤
export interface AnalysisStep {
  step: number;
  title: string;
  description: string;
  result: string;
  timestamp: string;
}

// Trace数据
export interface TraceData {
  id: string;
  name: string;
  timestamp: number;
  duration: number;
  type: 'api' | 'render' | 'navigation' | 'custom';
  children?: TraceData[];
  metadata?: Record<string, any>;
}

// Agent配置
export interface AgentConfig {
  id: string;
  name: string;
  type: 'case-evaluation' | 'compatibility' | 'patrol' | 'risk-monitor' | 
        'white-screen' | 'blank-screen' | 'crash' | 'hotfix-generate' | 
        'hotfix-test' | 'sop' | 'knowledge' | 'trace' | 'memory';
  description: string;
  strategy: 'sequence' | 'react' | 'plan-execute';
  enabled: boolean;
  config?: Record<string, any>;
}

// APM监控数据
export interface APMData {
  logs: LogEntry[];
  metrics: MetricData[];
  traces: TraceData[];
  stability: StabilityMetrics;
  performance: PerformanceMetrics;
}

// 日志条目
export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  stack?: string;
  metadata?: Record<string, any>;
}

// 指标数据
export interface MetricData {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  tags?: Record<string, string>;
}

// 稳定性指标
export interface StabilityMetrics {
  crashRate: number;
  anrRate: number;
  oomRate: number;
  errorRate: number;
  availability: number;
}

// 性能指标
export interface PerformanceMetrics {
  startupTime: number;
  pageLoadTime: number;
  apiResponseTime: number;
  fps: number;
  memoryUsage: number;
}

// 知识库条目
export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  relatedItems?: string[];
}

// SOP文档
export interface SOPDocument {
  id: string;
  title: string;
  content: string;
  steps: SOPStep[];
  category: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

// SOP步骤
export interface SOPStep {
  order: number;
  title: string;
  description: string;
  checklist?: string[];
}

// 火焰图数据
export interface FlameGraphData {
  name: string;
  value: number;
  children?: FlameGraphData[];
}

// 工作流节点
export interface WorkflowNode {
  id: string;
  type: 'agent' | 'condition' | 'parallel' | 'sequential';
  name: string;
  config?: Record<string, any>;
  position: { x: number; y: number };
}

// 工作流边
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

// 测试用例
export interface TestCase {
  id: string;
  name: string;
  description: string;
  type: 'white-screen' | 'crash' | 'performance';
  input: Record<string, any>;
  expectedOutput: Record<string, any>;
  actualOutput?: Record<string, any>;
  status: 'pending' | 'running' | 'passed' | 'failed';
  createdAt: string;
}

