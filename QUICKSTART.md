# 快速开始指南

## 🚀 立即开始

### 1. 访问应用

开发服务器已经启动，请访问：
- **本地访问**: http://localhost:3000
- **网络访问**: http://10.23.94.141:3000

### 2. 核心功能导航

#### 📊 首页总览
访问 http://localhost:3000 查看：
- 系统整体监控数据
- Agent运行状态
- 最近问题列表
- 快速功能入口

#### 🎯 白屏归因Agent（完整功能演示）

这是平台的核心功能，完整实现了从问题发现到修复的全流程：

1. **问题列表页**: http://localhost:3000/analysis/white-screen
   - 查看所有白屏问题
   - 按严重程度、状态筛选
   - 搜索和排序功能

2. **问题详情页**: http://localhost:3000/analysis/white-screen/ws-001
   - AI分析过程（步骤式展示）
   - 错误堆栈展示
   - Trace链路追踪可视化
   - 相似问题推荐
   - AI对话助手

#### 📋 六大业务流程

##### 1. 拦截阶段
- **Case评估Agent**: http://localhost:3000/intercept/case-evaluation
  - 智能评估问题优先级
  - 影响范围分析
  
- **兼容性测试Agent**: http://localhost:3000/intercept/compatibility
  - 多设备兼容性测试
  - 测试矩阵展示

##### 2. 预警阶段
- **巡检Agent**: http://localhost:3000/alert/patrol
  - 系统健康度监控
  - 自动巡检告警

- **变更风险监控Agent**: http://localhost:3000/alert/risk-monitor
  - 代码变更风险评估
  - 预警和建议

##### 3. 分析阶段
- **白屏归因Agent**: http://localhost:3000/analysis/white-screen （完整实现）
- **自屏归因Agent**: http://localhost:3000/analysis/blank-screen
- **Crash归因Agent**: http://localhost:3000/analysis/crash

##### 4. 修复阶段
- **热修代码生成Agent**: http://localhost:3000/fix/hotfix-generate
  - AI生成修复代码
  - 代码Diff对比
  - 测试用例生成

- **热修测试Agent**: http://localhost:3000/fix/hotfix-test
  - 自动执行测试
  - 代码覆盖率分析

##### 5. 复盘阶段
- **SOP沉淀**: http://localhost:3000/review/sop
  - 标准操作流程文档
  
- **业务领域知识库**: http://localhost:3000/review/knowledge
  - 知识沉淀和搜索

##### 6. 优化阶段
- **Trace分析Agent**: http://localhost:3000/optimize/trace
  - 性能追踪分析
  - 火焰图展示

- **Memory分析Agent**: http://localhost:3000/optimize/memory
  - 内存泄漏检测

#### 🛠 工具层

- **CodeBase服务**: http://localhost:3000/tools/codebase
  - 代码查看器
  - Monaco Editor集成

- **APM监控**: http://localhost:3000/tools/apm
  - 日志查看
  - 性能指标
  - 稳定性监控

- **工具平台**: http://localhost:3000/tools/platform
  - 功能开关配置
  - 实验管理

#### ⚙️ 管理功能

- **Agent管理**: http://localhost:3000/admin/agents
  - 配置和管理Agent

- **知识库管理**: http://localhost:3000/admin/knowledge
  - 知识库维护

- **测评集管理**: http://localhost:3000/admin/test-suite
  - 测试用例管理

### 3. 核心亮点

#### 🎨 现代化UI
- 基于Ant Design 5.28的精美界面
- 响应式设计
- 流畅的交互体验

#### 🤖 AI驱动
- 智能问题分析
- 自动代码生成
- 对话式交互

#### 📊 数据可视化
- ECharts图表
- Monaco代码编辑器
- Trace链路可视化
- 进度和统计展示

#### 🔧 开箱即用
- Mock数据驱动
- 无需后端配置
- 快速上手

### 4. 开发指南

#### 查看Mock数据
所有Mock数据存放在 `public/mock/` 目录：
```
public/mock/
├── white-screen-data.json  # 白屏问题数据
├── apm-data.json          # APM监控数据
├── agent-data.json        # Agent配置数据
├── knowledge-data.json    # 知识库数据
└── sop-data.json         # SOP文档数据
```

#### 修改数据
直接编辑JSON文件，刷新页面即可看到效果。

#### 添加新页面
1. 在 `app/` 目录下创建新的路由页面
2. 使用 `MainLayout` 包裹页面内容
3. 在 `lib/constants/index.ts` 中添加菜单配置

#### 自定义样式
- 全局样式: `app/globals.css`
- Ant Design主题: `app/layout.tsx`
- Tailwind配置: `tailwind.config.js`

### 5. 技术栈

- **框架**: Next.js 16.0 + React 19.2
- **UI**: Ant Design 5.28
- **样式**: Tailwind CSS 4
- **语言**: TypeScript 5
- **编辑器**: Monaco Editor
- **图表**: ECharts

### 6. 项目结构

```
ai_infra/
├── app/                 # 页面路由
│   ├── page.tsx        # 首页
│   ├── analysis/       # 分析模块
│   ├── intercept/      # 拦截模块
│   ├── alert/          # 预警模块
│   ├── fix/            # 修复模块
│   ├── review/         # 复盘模块
│   ├── optimize/       # 优化模块
│   ├── tools/          # 工具层
│   └── admin/          # 管理模块
├── components/          # 可复用组件
│   ├── layout/         # 布局组件
│   ├── editor/         # 编辑器组件
│   ├── charts/         # 图表组件
│   └── agent/          # Agent组件
├── lib/                # 工具库
│   ├── types/          # TypeScript类型
│   ├── utils/          # 工具函数
│   └── constants/      # 常量定义
├── hooks/              # 自定义Hooks
├── public/mock/        # Mock数据
└── README.md           # 项目文档
```

### 7. 常见问题

**Q: 如何停止开发服务器？**
A: 在终端按 `Ctrl + C`

**Q: 如何清空缓存重新启动？**
A: 删除 `.next` 目录后重新运行 `npm run dev`

**Q: 如何构建生产版本？**
A: 运行 `npm run build && npm start`

**Q: Mock数据如何加载？**
A: 使用 `hooks/use-mock-data.ts` 中的自定义Hooks

### 8. 下一步

1. ✅ 浏览各个功能模块，了解平台能力
2. ✅ 查看白屏归因Agent的完整实现（核心功能）
3. ✅ 修改Mock数据，自定义展示内容
4. ✅ 参考代码结构，扩展新的Agent功能
5. ✅ 连接真实后端API（可选）

### 9. 获取帮助

- 查看 README.md 了解详细文档
- 查看代码注释了解实现细节
- 参考 Ant Design 文档: https://ant.design
- 参考 Next.js 文档: https://nextjs.org

---

**提示**: 本项目为原型演示，使用Mock数据。所有功能和交互都是可用的，可以作为实际项目的起点。

