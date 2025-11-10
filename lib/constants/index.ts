// 全局常量定义

// Agent类型映射
export const AGENT_TYPES = {
  CASE_EVALUATION: 'case-evaluation',
  COMPATIBILITY: 'compatibility',
  PATROL: 'patrol',
  RISK_MONITOR: 'risk-monitor',
  WHITE_SCREEN: 'white-screen',
  BLANK_SCREEN: 'blank-screen',
  CRASH: 'crash',
  HOTFIX_GENERATE: 'hotfix-generate',
  HOTFIX_TEST: 'hotfix-test',
  SOP: 'sop',
  KNOWLEDGE: 'knowledge',
  TRACE: 'trace',
  MEMORY: 'memory',
} as const;

// 严重程度颜色
export const SEVERITY_COLORS = {
  critical: '#ff4d4f',
  high: '#ff7a45',
  medium: '#ffa940',
  low: '#52c41a',
} as const;

// 状态颜色
export const STATUS_COLORS = {
  pending: '#d9d9d9',
  analyzing: '#1890ff',
  resolved: '#52c41a',
  ignored: '#8c8c8c',
  running: '#1890ff',
  passed: '#52c41a',
  failed: '#ff4d4f',
} as const;

// 日志级别颜色
export const LOG_LEVEL_COLORS = {
  error: '#ff4d4f',
  warn: '#faad14',
  info: '#1890ff',
  debug: '#8c8c8c',
} as const;

// 业务流程阶段
export const WORKFLOW_STAGES = [
  { key: 'alert', name: '预警', icon: 'warning' },
  { key: 'analysis', name: '分析', icon: 'search' },
  { key: 'review', name: '复盘', icon: 'file-text' },
  { key: 'optimize', name: '优化', icon: 'rocket' },
] as const;

// 菜单配置
export const MENU_ITEMS = [
  {
    key: 'dashboard',
    label: '总览',
    icon: 'dashboard',
    path: '/',
  },
  {
    key: 'workspace',
    label: '我的工作台',
    icon: 'home',
    path: '/workspace',
  },
  {
    key: 'agent-bot',
    label: 'AgentBot',
    icon: 'robot',
    children: [
      { key: 'feedback-analysis', label: '用户原声归因', path: '/agent-bot/feedback-analysis' },
      { key: 'crash-analysis', label: 'Crash归因', path: '/agent-bot/crash-analysis' },
      { key: 'oom-analysis', label: 'OOM归因', path: '/agent-bot/oom-analysis' },
      { key: 'first-frame-optimization', label: '首帧优化', path: '/agent-bot/first-frame-optimization' },
    ],
  },
  {
    key: 'create-app',
    label: '创建应用',
    icon: 'appstore',
    children: [
      { key: 'tool-dispatch', label: '工具调度', path: '/create-app/tool-dispatch' },
      { key: 'knowledge-qa', label: '知识问答', path: '/create-app/knowledge-qa' },
      { key: 'knowledge-qa-hallucination', label: '知识问答-幻觉消除', path: '/create-app/knowledge-qa-hallucination' },
    ],
  },
  {
    key: 'alert',
    label: '预警',
    icon: 'warning',
    children: [
      { key: 'patrol', label: '巡检Agent', path: '/alert/patrol' },
      { key: 'risk-monitor', label: '变更风险监控Agent', path: '/alert/risk-monitor' },
    ],
  },
  {
    key: 'mcp',
    label: 'MCP',
    icon: 'api',
    path: '/tools/mcp-servers',
  },
  {
    key: 'data',
    label: '数据',
    icon: 'database',
    children: [
      { key: 'knowledge', label: '知识库', path: '/data/knowledge' },
      { key: 'app-evaluation', label: '应用评测', path: '/data/app-evaluation' },
      { key: 'app-data', label: '应用数据', path: '/data/app-data' },
      { key: 'test-suite', label: '测评集管理', path: '/admin/test-suite' },
    ],
  },
  {
    key: 'admin',
    label: '管理',
    icon: 'setting',
    children: [
      { key: 'agents', label: 'Agent管理', path: '/admin/agents' },
      { key: 'knowledge', label: '知识库管理', path: '/admin/knowledge' },
    ],
  },
] as const;

