# AI基础设施平台

为大前端开发者提供开箱即用的AI基础设施平台，通过智能化的Agent能力和工具链，让每一个大前端同学都能轻松在开发、监控、排障等各个环节构建属于自己的Agent，全面提升大前端开发的质量保障和工作效率。

![AI基础设施平台](https://img.shields.io/badge/AI-基础设施平台-blue) ![Next.js](https://img.shields.io/badge/Next.js-16.0-black) ![React](https://img.shields.io/badge/React-19.2-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6) ![Ant Design](https://img.shields.io/badge/Ant%20Design-5.28-1890ff)

## 🌟 项目特点

- **完整的业务流程覆盖**: 从拦截、预警、分析、修复、复盘到优化，六大核心流程全覆盖
- **AI驱动的智能分析**: 白屏归因、Crash分析、代码生成等AI能力
- **丰富的工具集成**: CodeBase服务、APM监控、工具平台等基础设施
- **开箱即用**: 现代化的UI界面，无需配置即可开始使用
- **可扩展架构**: 基于Agent的架构设计，易于扩展新功能

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
ai_infra/
├── app/                          # Next.js App Router页面
│   ├── page.tsx                 # 首页（总览仪表盘）
│   ├── analysis/                # 分析阶段
│   │   ├── white-screen/        # 白屏归因Agent（完整实现）
│   │   ├── blank-screen/        # 自屏归因Agent
│   │   └── crash/               # Crash归因Agent
│   ├── intercept/               # 拦截阶段
│   │   ├── case-evaluation/     # Case评估Agent
│   │   └── compatibility/       # 兼容性测试Agent
│   ├── alert/                   # 预警阶段
│   │   ├── patrol/              # 巡检Agent
│   │   └── risk-monitor/        # 变更风险监控Agent
│   ├── fix/                     # 修复阶段
│   │   ├── hotfix-generate/     # 热修代码生成Agent
│   │   └── hotfix-test/         # 热修测试Agent
│   ├── review/                  # 复盘阶段
│   │   ├── sop/                 # SOP沉淀
│   │   └── knowledge/           # 业务领域知识库
│   ├── optimize/                # 优化阶段
│   │   ├── trace/               # Trace分析Agent
│   │   └── memory/              # Memory分析Agent
│   ├── tools/                   # 工具层
│   │   ├── codebase/            # CodeBase服务
│   │   ├── apm/                 # APM监控
│   │   └── platform/            # 工具平台
│   └── admin/                   # 管理功能
│       ├── agents/              # Agent管理
│       ├── knowledge/           # 知识库管理
│       └── test-suite/          # 测评集管理
├── components/                   # 可复用组件
│   ├── layout/                  # 布局组件
│   │   └── MainLayout.tsx       # 主布局
│   ├── editor/                  # 编辑器组件
│   │   └── CodeViewer.tsx       # 代码查看器
│   ├── charts/                  # 图表组件
│   │   └── TraceVisualizer.tsx  # Trace可视化
│   └── agent/                   # Agent组件
│       └── ChatInterface.tsx    # 对话界面
├── lib/                         # 工具库
│   ├── types/                   # TypeScript类型定义
│   ├── utils/                   # 工具函数
│   └── constants/               # 常量定义
├── hooks/                       # 自定义Hooks
│   └── use-mock-data.ts        # Mock数据加载
├── public/                      # 静态资源
│   └── mock/                    # Mock数据文件
│       ├── white-screen-data.json
│       ├── apm-data.json
│       ├── agent-data.json
│       ├── knowledge-data.json
│       └── sop-data.json
└── README.md                    # 项目文档
```

## 🎯 核心功能

### 1. 业务场景层 - 六大核心流程

#### 拦截阶段
- **Case评估Agent**: 智能评估问题的优先级、影响范围和严重程度
- **兼容性测试Agent**: 自动化测试应用在不同设备和浏览器上的兼容性

#### 预警阶段
- **巡检Agent**: 定期巡检应用健康状态，及时发现潜在问题
- **变更风险监控Agent**: 智能评估代码变更风险，提供预警和建议

#### 分析阶段（核心重点）
- **白屏归因Agent（完整实现）**: 
  - 白屏问题列表（时间、影响用户数、版本）
  - 详细分析页面（错误堆栈、环境信息、AI归因分析）
  - Trace链路追踪可视化
  - 相似问题推荐
  - AI分析过程展示
- **自屏归因Agent**: 分析应用自动关闭屏幕的问题
- **Crash归因Agent**: 分析应用崩溃问题

#### 修复阶段
- **热修代码生成Agent**: 基于问题分析自动生成修复代码和测试用例
- **热修测试Agent**: 自动执行测试用例，验证修复代码的正确性

#### 复盘阶段
- **SOP沉淀**: 标准操作流程文档管理，AI辅助生成SOP
- **业务领域知识库**: 沉淀业务知识和最佳实践

#### 优化阶段
- **Trace分析Agent**: 分析性能追踪数据，生成火焰图，识别性能瓶颈
- **Memory分析Agent**: 分析内存快照，检测内存泄漏

### 2. 工具层 - 三大服务平台

#### CodeBase As Service
- 文件浏览器和代码查看器（Monaco Editor）
- 代码搜索和编辑
- Terminal模拟器

#### APM As Service
- 日志查看器（时间线、过滤、搜索）
- APM埋点数据展示（图表、表格）
- 性能指标和稳定性监控
- Trace详情展示

#### Tool Platform As Service
- 功能开关配置
- A/B测试配置和结果分析
- 文档生成和管理

### 3. Agent基建层

- **Agent策略配置**: Sequence、ReAct、Plan And Execute
- **多Agent编排**: Router、Supervisor、WorkFlow
- **消息框架**: Chat界面组件
- **知识库管理**: 业务线知识库、SOP知识库
- **测评集管理**: 白屏评测集、Crash评测集、性能评测集

## 🛠 技术栈

- **前端框架**: React 19.2 + Next.js 16.0 (App Router)
- **UI组件库**: Ant Design 5.28
- **状态管理**: Zustand
- **样式方案**: Tailwind CSS 4
- **图表可视化**: ECharts
- **代码编辑器**: Monaco Editor
- **开发语言**: TypeScript 5

## 📊 核心组件

### 通用组件
- **MainLayout**: 主布局（顶部导航、侧边栏、面包屑）
- **CodeViewer**: 代码查看器（基于Monaco Editor）
- **TraceVisualizer**: Trace链路可视化
- **ChatInterface**: 对话式交互界面

### 业务组件
- **WhiteScreenAnalyzer**: 白屏归因分析器（完整实现）
- **DataTable**: 数据表格（排序、筛选、分页）
- **MetricCard**: 指标卡片

## 🎨 核心页面展示

### 首页仪表盘
- 展示整体监控数据、Agent运行状态
- 快速入口（白屏归因、Crash归因、热修生成、APM监控）
- 最近问题列表
- 系统健康度和性能指标

### 白屏归因Agent（完整实现）
- **列表页**: 问题列表、筛选、排序、搜索功能
- **详情页**: 
  - 问题概览（ID、时间、影响用户、严重程度）
  - AI分析过程（步骤式展示）
  - 错误堆栈展示（Monaco Editor）
  - Trace链路追踪可视化
  - 相似问题推荐
  - AI对话助手

## 📝 开发指南

### 添加新的Agent

1. 在 `app/` 目录下创建新的路由页面
2. 在 `lib/types/index.ts` 中添加相关类型定义
3. 在 `lib/constants/index.ts` 中添加菜单配置
4. 在 `public/mock/` 中添加Mock数据
5. 在 `hooks/use-mock-data.ts` 中添加数据加载Hook

### 自定义样式

全局样式在 `app/globals.css` 中定义，使用Tailwind CSS进行样式定制。

### 配置Ant Design主题

在 `app/layout.tsx` 中的 `ConfigProvider` 组件中修改主题配置。

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件（可选）：

```env
# API端点（如果需要连接真实后端）
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### TypeScript配置

项目已配置好TypeScript，支持路径别名 `@/` 指向项目根目录。

## 📦 部署

### Vercel部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai_infra)

### 其他平台

项目可以部署到任何支持Next.js的平台：
- Netlify
- AWS Amplify
- 自托管（使用Docker）

## 🤝 贡献指南

欢迎贡献代码、提出问题或建议！

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- Next.js团队
- Ant Design团队
- Monaco Editor团队
- 所有开源贡献者

## 📞 联系方式

如有问题或建议，请提交Issue或联系项目维护者。

---

**注意**: 本项目为原型演示，使用Mock数据。实际生产环境需要连接真实的后端服务。
