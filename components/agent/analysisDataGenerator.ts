// 智能分析数据生成器
// 根据问题内容动态生成符合实际情况的分析过程数据

interface ProblemAnalysis {
  thinkingContent: string;
  detailedAnalysis: Record<string, string>;
  analysisResults: Record<string, {
    summary: string;
    fullResult: any;
    confidence: number;
  }>;
  finalConclusion: string;
}

// 识别问题类型
function identifyProblemType(problemText: string, agentId: string): string {
  const text = problemText.toLowerCase();
  
  // 根据Agent类型和问题内容识别
  if (agentId === 'root-cause-analysis') {
    if (text.includes('搜索') || text.includes('search')) return 'search';
    if (text.includes('登录') || text.includes('login')) return 'login';
    if (text.includes('支付') || text.includes('payment')) return 'payment';
    if (text.includes('crash') || text.includes('崩溃') || text.includes('nullpointerexception')) return 'crash';
    if (text.includes('oom') || text.includes('outofmemory') || text.includes('内存')) return 'oom';
  }
  
  if (agentId === 'hotfix-agent') {
    if (text.includes('服务不可用') || text.includes('service down')) return 'service_down';
    if (text.includes('数据损坏') || text.includes('data corruption')) return 'data_corruption';
    if (text.includes('响应时间') || text.includes('slow response')) return 'slow_response';
  }
  
  if (agentId === 'alert-analysis') {
    if (text.includes('成功率') || text.includes('success rate')) return 'success_rate';
    if (text.includes('接口') || text.includes('api')) return 'api_alert';
  }
  
  if (agentId === 'blank-screen-detection') {
    if (text.includes('javascript') || text.includes('js error')) return 'js_error';
    if (text.includes('网络') || text.includes('network')) return 'network_error';
  }
  
  return 'generic';
}

// 生成思考内容
export function generateThinkingContent(problemText: string, agentId: string, agentName: string, problemType?: string): string {
  const identifiedType = identifyProblemType(problemText, agentId);
  
  const thinkingTemplates: Record<string, string> = {
    // 根因分析Agent
    'search': `让我先理解一下这个搜索功能问题...

根据用户反馈，这是一个典型的搜索功能异常问题。用户反映的主要问题包括：
1. 搜索结果不准确 - 明明存在的商品搜不出来
2. 搜索响应速度慢 - 需要3-5秒才有结果
3. 搜索历史记录异常
4. 搜索按钮无响应

这可能是多个原因导致的：索引问题、查询性能问题、缓存问题或前端交互问题。我需要从多个维度来分析，包括日志分析、代码审查、性能监控和变更历史。`,
    
    'login': `让我先理解一下这个登录功能问题...

用户反馈显示登录功能存在多个严重问题：
1. 登录请求超时 - 转圈圈后提示网络错误
2. 登录状态丢失 - 刷新后退出登录
3. 第三方登录失败 - 微信登录异常但手机号登录正常
4. 会话管理异常 - 使用中突然要求重新登录

这些问题可能涉及：网络请求超时、Token管理、会话存储、第三方授权流程。我需要检查登录相关的代码、配置、日志和最近的变更。`,
    
    'payment': `让我先理解一下这个支付流程问题...

用户反馈支付功能存在严重的卡顿和状态同步问题：
1. 支付按钮响应慢 - 需要10秒以上才跳转
2. 支付状态不同步 - 已扣款但订单状态未更新
3. 第三方支付回调异常 - 支付宝支付成功但App显示失败

这可能是支付网关连接问题、回调处理异常、状态更新机制故障。我需要分析支付流程代码、网关日志、回调处理和数据库事务。`,
    
    'crash': `让我先理解一下这个Crash问题...

从堆栈信息来看，这是一个典型的应用启动崩溃问题：
- 异常类型：NullPointerException
- 发生位置：MainActivity.onCreate (第156行)
- 影响范围：1,234个用户
- 发生时间：应用启动时

这很可能是初始化代码中某个对象未正确初始化导致的。我需要分析MainActivity的onCreate方法、相关依赖注入、配置加载和最近的代码变更。`,
    
    'oom': `让我先理解一下这个OOM问题...

从堆栈和内存分析来看，这是一个内存溢出问题：
- 异常类型：OutOfMemoryError
- 内存使用：已使用86.7%-93.3%
- 可能原因：图片缓存、线程泄漏、缓存累积

根据不同的堆栈信息，可能是图片加载未释放、RecyclerView缓存过大、或内存缓存无限制增长。我需要分析内存使用模式、缓存策略、对象生命周期和内存泄漏点。`,
    
    // 告警分析Agent
    'success_rate': `让我先理解一下这个接口成功率告警...

告警显示搜索接口成功率从99.2%下降到95.0%，下降了4.2个百分点：
- 错误类型：5xx错误2.1%，4xx错误2.9%，超时0.8%
- 主要错误码：500(1,234次)、503(567次)、408(345次)
- 时间趋势：14:15开始下降，14:30-14:45持续下降

这可能是后端服务异常、数据库性能下降、缓存失效或流量突增。我需要分析服务日志、数据库性能、缓存状态和流量监控。`,
    
    // 白屏检测Agent
    'js_error': `让我先理解一下这个白屏问题...

白屏检测报告显示：
- 错误类型：JavaScript执行错误
- 错误信息：Cannot read property 'map' of undefined
- 错误位置：main.js:1234
- 影响用户：1,234人

这是一个典型的前端数据未初始化导致的错误。可能是API返回数据格式异常、组件渲染时数据未准备好、或数据处理逻辑错误。我需要分析前端代码、API响应格式、数据流和错误边界处理。`,
    
    // 默认模板
    'generic': `让我先理解一下这个问题...

根据您提供的问题描述，我初步判断这可能是一个${problemType || '技术问题'}。让我从以下几个角度来分析：

1. **问题类型识别**：需要确定这是性能问题、功能异常还是系统错误
2. **影响范围评估**：判断问题的严重程度和影响范围
3. **可能原因分析**：基于经验，初步列出可能的原因
4. **分析策略制定**：确定需要收集哪些线索和证据

基于${agentName}的能力，我将制定一个系统化的分析计划，通过多个维度的线索收集来定位问题的根本原因。`
  };
  
  return thinkingTemplates[identifiedType] || thinkingTemplates['generic'];
}

// 生成详细分析过程
export function generateDetailedAnalysis(
  capability: { id: string; name: string; description: string },
  problemText: string,
  agentId: string
): string {
  const problemType = identifyProblemType(problemText, agentId);
  const capabilityId = capability.id;
  
  // 根据问题类型和能力类型生成详细分析
  const analysisMap: Record<string, Record<string, string>> = {
    'search': {
      'clustering': `开始进行聚类分析...

首先，我需要收集所有与搜索功能相关的用户反馈数据。从问题描述中，我提取了用户的设备信息：
- 设备信息：iPhone 14 Pro, iOS 17.2
- App版本：8.5.2
- 用户反馈时间：2024-11-10 14:23:15

接下来，我将基于用户维度进行聚类分析：
1. 数据预处理：提取用户设备信息（设备型号、系统版本、App版本）
2. 特征提取：识别用户维度特征（iOS版本、设备型号、App版本）
3. 聚类计算：使用K-means算法，基于设备类型、系统版本、App版本进行聚类
4. 结果验证：检查聚类的合理性

通过分析，我发现问题主要集中在以下用户集群：
- 集群1：iOS 17.x用户（占比52%）- iPhone 14 Pro/iPhone 15系列，iOS 17.0-17.2
- 集群2：App版本8.5.2用户（占比38%）- 主要集中在最新版本用户
- 集群3：特定设备型号（占比10%）- iPhone 14 Pro占比最高

**与大盘用户分布对比分析**：
- iOS用户占比：问题用户中iOS占100%，大盘iOS用户占比约45% → **显著偏高（+55%）**
- Android用户占比：问题用户中Android占0%，大盘Android用户占比约55% → **完全缺失**
- App版本8.5.2占比：问题用户中8.5.2占38%，大盘8.5.2用户占比约15% → **显著偏高（+23%）**
- iOS 17.x占比：问题用户中iOS 17.x占52%，大盘iOS 17.x用户占比约25% → **显著偏高（+27%）**

**典型特征识别**：
1. **单端问题特征**：问题100%集中在iOS端，Android端完全没有反馈 → **强烈暗示这是iOS端特定问题**
2. **版本引入时间特征**：问题用户中38%集中在App版本8.5.2，且8.5.2版本发布时间（2024-11-03）与问题开始时间（持续一周）高度吻合 → **强烈暗示问题在8.5.2版本引入**
3. **系统版本特征**：iOS 17.x用户占比52%，远超大盘25%，且iOS 17.2占比最高 → **暗示可能与iOS 17.x系统版本兼容性有关**

**推理线索**：
- 排查方向应聚焦：iOS端代码、8.5.2版本变更、iOS 17.x系统兼容性
- 可以排除：Android端代码、8.5.2之前版本的变更`,
      
      'change': `开始进行变更分析...

我将聚焦于Switch功能开关和A/B实验的变更，分析这些变更是否导致了搜索功能问题。分析步骤：
1. Switch变更查询：检查搜索功能相关的功能开关变更历史
2. 实验变更查询：检查搜索相关的A/B实验配置和流量分配变更
3. 时间关联分析：对比变更时间与问题发生时间的关联性
4. 影响范围评估：评估变更对用户群体的影响

通过查询Switch平台和实验平台的变更记录，我发现：

**Switch功能开关变更**：
- 5天前：开关"search_new_algorithm"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-05 10:30:00
  - 变更操作人：developer_zhang
  - 影响范围：全量用户
  - 变更说明：启用新的搜索算法，优化搜索匹配逻辑
- 3天前：开关"search_cache_enabled"从开启(on)变更为关闭(off)
  - 变更时间：2024-11-07 14:20:00
  - 变更操作人：developer_li
  - 影响范围：全量用户
  - 变更说明：临时关闭搜索缓存以排查问题

**A/B实验变更**：
- 6天前：实验"search_optimization_v2"流量从10%提升到50%
  - 实验ID：exp_search_v2_001
  - 变更时间：2024-11-04 09:00:00
  - 实验组：使用新的搜索索引策略
  - 对照组：使用原有搜索索引策略
  - 变更影响：50%用户使用新的搜索索引策略
- 4天前：实验"search_ui_enhancement"新增实验组C
  - 实验ID：exp_search_ui_002
  - 变更时间：2024-11-06 16:00:00
  - 新增组C：使用新的搜索历史记录存储逻辑
  - 流量分配：A组30%、B组30%、C组40%

**变更与问题的关联性分析**：
1. **高度关联**：开关"search_new_algorithm"的开启时间(5天前)与用户反馈问题开始时间(持续一周)高度吻合
   - 新算法可能导致索引匹配逻辑改变，使得"iPhone 15"等商品无法被正确索引
2. **高度关联**：开关"search_cache_enabled"的关闭(3天前)直接导致缓存失效
   - 缓存关闭后，所有搜索请求都直接查询数据库，导致响应时间从平均200ms增加到3-5秒
3. **实验命中率对比分析**：
   - 实验"search_optimization_v2"：命中实验的用户中，有问题的占比约85%，未命中实验的用户中，有问题的占比约5% → **极度异常（+80%）**
   - 实验"search_ui_enhancement"组C：命中组C的用户中，有问题的占比约60%，未命中组C的用户中，有问题的占比约10% → **显著偏高（+50%）**
   - **典型特征**：实验"search_optimization_v2"的放量时间(6天前，从10%提升到50%)与问题开始时间(持续一周)高度吻合，且命中实验的用户问题率远超未命中用户 → **强烈暗示实验是导致问题的直接原因**
4. **实验时间关联分析**：
   - 实验"search_optimization_v2"流量提升时间：2024-11-04 09:00:00
   - 问题开始时间：2024-11-04 左右（持续一周）
   - **时间吻合度**：100% → **强烈暗示实验放量直接导致问题**

**结论**：Switch和实验的变更与当前问题存在强关联性，特别是搜索算法开关的开启、缓存开关的关闭，以及实验"search_optimization_v2"的放量，很可能是导致问题的直接原因。实验命中率对比分析强烈暗示实验是主要根因。`,
      
      'log': `开始进行日志分析...

我将从日志系统中提取搜索功能相关的错误和警告信息。分析步骤：
1. 时间范围筛选：定位最近一周的日志
2. 接口过滤：重点关注 /api/v1/search 接口
3. 错误级别过滤：重点关注ERROR和WARN级别
4. 关键词匹配：查找"搜索"、"search"、"timeout"、"slow"等

分析结果：
- 发现1,234个ERROR级别日志，主要是"Search index not found"和"Query timeout"
- 发现567个WARN级别日志，主要是"Slow search query detected"（平均响应时间>3秒）
- 发现345个INFO级别日志，显示"Cache miss rate increased to 45%"

错误分布分析：
- 索引相关错误：45%（可能与商品索引未更新有关）
- 超时错误：30%（查询性能问题）
- 缓存相关：25%（缓存命中率下降）

这些日志信息强烈暗示了搜索索引更新机制和查询性能问题。`,
      
      'code': `开始进行代码分析...

我将检查搜索功能相关的代码文件，寻找潜在问题：
1. 静态代码分析：使用工具扫描SearchService相关代码
2. 代码审查：人工检查搜索逻辑、索引更新、缓存使用
3. 性能分析：识别查询性能瓶颈
4. 数据流分析：检查数据从API到前端的完整流程

发现的问题：
- SearchService.java:234 - 索引更新逻辑中缺少对商品名称的模糊匹配处理
- SearchController.java:89 - 查询超时处理不当，超时后未返回部分结果
- SearchCache.java:156 - 缓存键生成逻辑可能导致缓存失效
- SearchHistoryService.java:67 - 历史记录存储时未正确关联用户ID

这些问题可能是导致当前问题的根本原因：
1. 索引更新问题导致"iPhone 15"无法被搜索到
2. 查询超时处理导致搜索响应慢
3. 缓存失效导致性能下降
4. 历史记录关联错误导致显示异常`
    },
    
    'login': {
      'clustering': `开始进行聚类分析...

收集所有与登录功能相关的用户反馈和错误数据。从问题描述中提取用户设备信息：
- 设备信息：Xiaomi 13, Android 14
- App版本：8.5.1
- 用户反馈时间：2024-11-10 09:15:32

基于用户维度进行聚类分析：
1. 数据预处理：提取用户设备信息（Android版本、设备品牌、App版本）
2. 特征提取：识别用户维度特征（Android版本、设备型号、App版本）
3. 聚类计算：使用K-means算法，基于Android版本、设备品牌、App版本进行聚类
4. 结果验证：检查聚类的合理性

通过分析，发现以下用户集群：
- 集群1：Android 14用户（占比48%）- 主要集中在Xiaomi 13、Honor 90等新机型
- 集群2：App版本8.5.1用户（占比35%）- 上周更新版本后的用户
- 集群3：特定品牌设备（占比17%）- Xiaomi设备占比最高，其次是Honor

**与大盘用户分布对比分析**：
- Android用户占比：问题用户中Android占100%，大盘Android用户占比约55% → **显著偏高（+45%）**
- iOS用户占比：问题用户中iOS占0%，大盘iOS用户占比约45% → **完全缺失**
- App版本8.5.1占比：问题用户中8.5.1占35%，大盘8.5.1用户占比约12% → **显著偏高（+23%）**
- Android 14占比：问题用户中Android 14占48%，大盘Android 14用户占比约20% → **显著偏高（+28%）**
- Xiaomi设备占比：问题用户中Xiaomi占17%，大盘Xiaomi用户占比约8% → **显著偏高（+9%）**

**典型特征识别**：
1. **单端问题特征**：问题100%集中在Android端，iOS端完全没有反馈 → **强烈暗示这是Android端特定问题**
2. **版本引入时间特征**：问题用户中35%集中在App版本8.5.1，且8.5.1版本发布时间（2024-11-02）与问题开始时间（上周更新版本后）高度吻合 → **强烈暗示问题在8.5.1版本引入**
3. **系统版本特征**：Android 14用户占比48%，远超大盘20%，且主要集中在Xiaomi和Honor新机型 → **暗示可能与Android 14系统版本或特定品牌设备兼容性有关**

**推理线索**：
- 排查方向应聚焦：Android端代码、8.5.1版本变更、Android 14系统兼容性、Xiaomi/Honor设备特定问题
- 可以排除：iOS端代码、8.5.1之前版本的变更`,
      
      'change': `开始进行变更分析...

我将聚焦于Switch功能开关和A/B实验的变更，分析这些变更是否导致了登录功能问题。分析步骤：
1. Switch变更查询：检查登录功能相关的功能开关变更历史
2. 实验变更查询：检查登录相关的A/B实验配置和流量分配变更
3. 时间关联分析：对比变更时间与问题发生时间的关联性
4. 影响范围评估：评估变更对用户群体的影响

通过查询Switch平台和实验平台的变更记录，我发现：

**Switch功能开关变更**：
- 7天前：开关"token_refresh_enabled"从开启(on)变更为关闭(off)
  - 变更时间：2024-11-03 11:15:00
  - 变更操作人：developer_wang
  - 影响范围：全量用户
  - 变更说明：临时关闭Token自动刷新功能以排查问题
- 6天前：开关"login_timeout_extended"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-04 09:30:00
  - 变更操作人：developer_wang
  - 影响范围：全量用户
  - 变更说明：启用延长登录超时时间功能，从30秒延长到60秒
- 5天前：开关"wechat_login_enabled"短暂关闭后重新开启
  - 变更时间：2024-11-05 14:00:00 (关闭) → 2024-11-05 15:30:00 (开启)
  - 变更操作人：developer_li
  - 变更原因：微信登录SDK版本更新，需要重启服务

**A/B实验变更**：
- 8天前：实验"token_management_v3"流量从20%提升到100%
  - 实验ID：exp_token_v3_001
  - 变更时间：2024-11-02 10:00:00
  - 实验组：使用新的Token管理策略（Token过期时间从7天调整为1天）
  - 对照组：使用原有Token管理策略（Token过期时间7天）
  - 变更影响：全量用户使用新的Token管理策略
- 6天前：实验"login_flow_optimization"新增实验组B
  - 实验ID：exp_login_flow_002
  - 变更时间：2024-11-04 13:00:00
  - 新增组B：使用新的登录请求重试机制
  - 流量分配：A组50%、B组50%

**变更与问题的关联性分析**：
1. **高度关联**：开关"token_refresh_enabled"的关闭(7天前)直接导致Token无法自动刷新
   - Token过期后无法自动刷新，导致用户频繁需要重新登录
   - 与用户反馈"登录状态经常丢失"高度吻合
2. **实验命中率对比分析**：
   - 实验"token_management_v3"：命中实验的用户中，有问题的占比约95%，未命中实验的用户中，有问题的占比约8% → **极度异常（+87%）**
   - 实验"login_flow_optimization"组B：命中组B的用户中，有问题的占比约45%，未命中组B的用户中，有问题的占比约12% → **显著偏高（+33%）**
   - **典型特征**：实验"token_management_v3"全量时间(8天前，从20%提升到100%)与问题开始时间(上周更新版本后)高度吻合，且命中实验的用户问题率远超未命中用户 → **强烈暗示实验是导致问题的直接原因**
3. **高度关联**：开关"wechat_login_enabled"的短暂关闭可能导致微信登录异常
   - 开关关闭期间，微信登录功能完全不可用
   - 重新开启后，SDK版本更新可能导致授权回调处理逻辑不兼容
   - 与用户反馈"微信登录失败"高度吻合
4. **实验时间关联分析**：
   - 实验"token_management_v3"全量时间：2024-11-02 10:00:00
   - 问题开始时间：2024-11-02 左右（上周更新版本后）
   - **时间吻合度**：100% → **强烈暗示实验全量直接导致问题**

**结论**：Switch和实验的变更与当前登录问题存在强关联性，特别是Token刷新开关的关闭和Token管理实验的全量，很可能是导致问题的直接原因。实验命中率对比分析强烈暗示实验"token_management_v3"是主要根因。`,
      
      'log': `开始进行日志分析...

提取登录功能相关的错误和警告信息：
1. 时间范围：最近一周的日志
2. 接口过滤：/api/v1/login, /api/v1/auth/wechat等
3. 错误级别：ERROR和WARN
4. 关键词：login, timeout, token, session

分析结果：
- 发现2,345个ERROR级别日志："Login request timeout after 60s"
- 发现1,234个ERROR级别日志："Token validation failed"
- 发现567个WARN级别日志："WeChat auth callback error"
- 发现345个INFO级别日志："Session expired, require re-login"

错误分布：
- 超时错误：45%（登录请求超时）
- Token验证失败：30%（Token过期或无效）
- 第三方登录错误：15%（微信授权回调失败）
- 会话过期：10%（Token过期导致）

这些日志信息强烈暗示了登录请求超时和Token管理问题。`,
      
      'code': `开始进行代码分析...

检查登录功能相关代码：
1. 静态代码分析：扫描AuthService、LoginController、TokenManager
2. 代码审查：检查登录流程、Token生成、会话管理
3. 网络分析：检查请求超时处理、重试机制
4. 第三方集成：检查微信登录SDK集成

发现的问题：
- LoginController.java:156 - 登录请求超时处理不当，超时后未返回友好错误
- TokenManager.java:89 - Token刷新逻辑中缺少对过期Token的处理
- WeChatAuthService.java:234 - 微信授权回调处理中未正确处理授权失败情况
- SessionManager.java:67 - 会话存储时未正确设置过期时间

这些问题可能是导致当前问题的根本原因：
1. 超时处理导致用户看到"网络错误"
2. Token刷新失败导致状态丢失
3. 微信授权回调异常导致第三方登录失败
4. 会话过期时间设置错误导致频繁要求重新登录`
    },
    
    'crash': {
      'clustering': `开始进行聚类分析...

收集所有与启动崩溃相关的Crash报告。从堆栈信息中提取用户设备信息：
- 设备信息：Xiaomi 13 Ultra, Android 14, 8GB RAM
- App版本：8.5.2
- 影响用户：1,234人
- 发生时间：2024-11-10 08:15:23

基于用户维度进行聚类分析：
1. 数据预处理：提取用户设备信息（Android版本、设备型号、内存大小、App版本）
2. 特征提取：识别用户维度特征（Android版本、设备品牌、内存配置）
3. 聚类计算：使用K-means算法，基于Android版本、设备型号、内存大小进行聚类
4. 结果验证：检查聚类的合理性

通过分析，发现以下用户集群：
- 集群1：Android 14用户（占比78%）- 主要集中在Xiaomi 13 Ultra、Xiaomi 13等新机型
- 集群2：8GB内存设备（占比65%）- 内存配置为8GB的设备占比最高
- 集群3：Xiaomi设备（占比58%）- Xiaomi品牌设备占比最高
- 集群4：App版本8.5.2用户（占比100%）- 所有崩溃都发生在最新版本

**与大盘用户分布对比分析**：
- App版本8.5.2占比：问题用户中8.5.2占100%，大盘8.5.2用户占比约15% → **极度异常（+85%）**
- Android 14占比：问题用户中Android 14占78%，大盘Android 14用户占比约20% → **显著偏高（+58%）**
- Xiaomi设备占比：问题用户中Xiaomi占58%，大盘Xiaomi用户占比约8% → **显著偏高（+50%）**
- 8GB内存设备占比：问题用户中8GB占65%，大盘8GB设备占比约35% → **显著偏高（+30%）**

**典型特征识别**：
1. **版本引入时间特征**：问题用户100%集中在App版本8.5.2，且8.5.2版本发布时间（2024-11-03）与Crash发生时间（2024-11-10）高度吻合 → **强烈暗示问题在8.5.2版本引入，且是版本特定问题**
2. **系统版本特征**：Android 14用户占比78%，远超大盘20% → **暗示可能与Android 14系统版本兼容性有关**
3. **品牌设备特征**：Xiaomi设备占比58%，远超大盘8% → **暗示可能与Xiaomi设备特定兼容性有关**

**推理线索**：
- 排查方向应聚焦：8.5.2版本变更（特别是启动流程相关）、Android 14兼容性、Xiaomi设备特定问题
- 可以排除：8.5.2之前版本的代码、其他品牌设备的问题`,
      
      'change': `开始进行变更分析...

我将聚焦于Switch功能开关和A/B实验的变更，分析这些变更是否导致了应用启动崩溃问题。分析步骤：
1. Switch变更查询：检查应用启动和初始化相关的功能开关变更历史
2. 实验变更查询：检查启动流程相关的A/B实验配置和流量分配变更
3. 时间关联分析：对比变更时间与Crash发生时间的关联性
4. 影响范围评估：评估变更对用户群体的影响

通过查询Switch平台和实验平台的变更记录，我发现：

**Switch功能开关变更**：
- 2天前：开关"new_dependency_injection"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-08 10:00:00
  - 变更操作人：developer_zhang
  - 影响范围：全量用户
  - 变更说明：启用新的依赖注入框架v3.0，替换原有的v2.5版本
- 1天前：开关"app_init_optimization"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-09 14:00:00
  - 变更操作人：developer_li
  - 影响范围：全量用户
  - 变更说明：启用应用初始化顺序优化功能
- 12小时前：开关"main_activity_refactor"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-09 20:00:00
  - 变更操作人：developer_wang
  - 影响范围：全量用户
  - 变更说明：启用重构后的MainActivity.onCreate方法

**A/B实验变更**：
- 3天前：实验"startup_flow_v2"流量从5%提升到100%
  - 实验ID：exp_startup_v2_001
  - 变更时间：2024-11-07 09:00:00
  - 实验组：使用新的启动流程（包含MainActivity重构）
  - 对照组：使用原有启动流程
  - 变更影响：全量用户使用新的启动流程
- 1天前：实验"init_sequence_optimization"新增实验组B
  - 实验ID：exp_init_seq_002
  - 变更时间：2024-11-09 15:00:00
  - 新增组B：使用优化后的初始化顺序
  - 流量分配：A组50%、B组50%

**变更与问题的关联性分析**：
1. **高度关联**：开关"new_dependency_injection"的开启(2天前)导致依赖注入框架升级
   - 依赖注入框架从v2.5升级到v3.0，注入机制改变
   - MainActivity中的userService可能未正确注入，导致为null
   - 与Crash堆栈"NullPointerException at MainActivity.onCreate(MainActivity.java:156)"高度吻合
2. **高度关联**：开关"app_init_optimization"的开启(1天前)改变了初始化顺序
   - 初始化顺序调整可能导致userService在MainActivity.onCreate调用时还未初始化完成
   - 与Crash发生时间(2024-11-10 08:15:23)高度吻合
3. **高度关联**：开关"main_activity_refactor"的开启(12小时前)启用了重构后的代码
   - 重构后的onCreate方法可能移除了null检查
   - 直接调用userService.getCurrentUser()时，userService可能为null
   - 与Crash堆栈指向MainActivity.java:156高度吻合
4. **实验命中率对比分析**：
   - 实验"startup_flow_v2"：命中实验的用户中，Crash率约98%，未命中实验的用户中，Crash率约2% → **极度异常（+96%）**
   - 实验"init_sequence_optimization"组B：命中组B的用户中，Crash率约65%，未命中组B的用户中，Crash率约5% → **显著偏高（+60%）**
   - **典型特征**：实验"startup_flow_v2"全量时间(3天前，从5%提升到100%)与Crash开始时间(2024-11-07左右)高度吻合，且命中实验的用户Crash率远超未命中用户 → **强烈暗示实验是导致Crash的直接原因**
5. **实验时间关联分析**：
   - 实验"startup_flow_v2"全量时间：2024-11-07 09:00:00
   - Crash开始时间：2024-11-07 左右
   - **时间吻合度**：100% → **强烈暗示实验全量直接导致Crash**

**结论**：Switch变更和实验变更与当前Crash问题存在强关联性，特别是依赖注入框架开关、初始化优化开关、MainActivity重构开关的开启，以及实验"startup_flow_v2"的全量，很可能是导致问题的直接原因。实验命中率对比分析强烈暗示实验"startup_flow_v2"是主要根因。`,
      
      'log': `开始进行日志分析...

提取Crash相关的错误日志和堆栈信息：
1. 时间范围：2024-11-10 08:00-09:00
2. 异常类型：NullPointerException
3. 发生位置：MainActivity.onCreate
4. 设备信息：Xiaomi 13 Ultra, Android 14

分析结果：
- 发现1,234个Crash报告，全部发生在MainActivity.onCreate
- 堆栈信息一致：java.lang.NullPointerException at MainActivity.onCreate(MainActivity.java:156)
- 设备分布：主要集中在Android 14设备（占比85%）
- App版本：全部为8.5.2版本

错误模式分析：
- 100%的Crash都发生在应用启动时
- 100%的Crash都是NullPointerException
- 100%的Crash都指向MainActivity.java:156

这些日志信息强烈暗示了MainActivity.onCreate方法第156行存在空指针问题。`,
      
      'code': `开始进行代码分析...

检查MainActivity.java文件，重点关注onCreate方法和第156行：
1. 静态代码分析：扫描MainActivity.java，查找可能的空指针风险
2. 代码审查：检查第156行附近的代码逻辑
3. 依赖分析：检查依赖注入和对象初始化
4. 版本对比：对比重构前后的代码差异

发现的问题：
- MainActivity.java:156 - 直接使用userService.getCurrentUser()，但userService可能为null
- MainActivity.java:145 - 依赖注入@Inject UserService userService，但注入可能失败
- MainActivity.java:152 - 缺少null检查，直接调用userService方法

代码问题分析：
// 第156行代码（问题代码）
// String userId = userService.getCurrentUser().getId(); // userService可能为null

根本原因：
- 依赖注入框架升级后，注入机制改变，userService可能未正确注入
- 重构时移除了null检查，导致直接调用null对象的方法
- 初始化顺序调整，userService在调用时还未初始化完成

修复建议：添加null检查或确保依赖注入成功。`
    },
    
    'oom': {
      'clustering': `开始进行聚类分析...

收集所有OOM相关的Crash报告和内存分析数据。从堆栈信息中提取用户设备信息：
- 设备信息：Redmi Note 12 Pro, Android 13, 6GB RAM（图片OOM）
- 设备信息：Honor 90, Android 13, 8GB RAM（线程OOM）
- 设备信息：OnePlus 11, Android 14, 12GB RAM（缓存OOM）
- App版本：8.5.2
- 影响用户：3,456人

基于用户维度进行聚类分析：
1. 数据预处理：提取用户设备信息（Android版本、设备型号、内存大小、App版本）
2. 特征提取：识别用户维度特征（内存配置、设备品牌、Android版本）
3. 聚类计算：使用K-means算法，基于内存大小、设备品牌、Android版本进行聚类
4. 结果验证：检查聚类的合理性

通过分析，发现以下用户集群：
- 集群1：6GB内存设备（占比45%）- Redmi Note 12 Pro等中低端机型，图片缓存OOM
- 集群2：8GB内存设备（占比30%）- Honor 90等中端机型，线程泄漏OOM
- 集群3：12GB内存设备（占比25%）- OnePlus 11等高端机型，内存缓存OOM
- 集群4：Android 13用户（占比68%）- Android 13系统用户占比最高
- 集群5：特定品牌设备（占比52%）- Redmi、Honor、OnePlus等品牌

**与大盘用户分布对比分析**：
- App版本8.5.2占比：问题用户中8.5.2占100%，大盘8.5.2用户占比约15% → **极度异常（+85%）**
- Android 13占比：问题用户中Android 13占68%，大盘Android 13用户占比约40% → **显著偏高（+28%）**
- 6GB内存设备占比：问题用户中6GB占45%，大盘6GB设备占比约25% → **显著偏高（+20%）**
- 中低端机型占比：问题用户中中低端机型占45%，大盘中低端机型占比约30% → **显著偏高（+15%）**

**典型特征识别**：
1. **版本引入时间特征**：问题用户100%集中在App版本8.5.2，且8.5.2版本发布时间（2024-11-03）与OOM发生时间高度吻合 → **强烈暗示问题在8.5.2版本引入**
2. **内存配置特征**：不同内存配置的设备都出现OOM，但6GB设备占比最高（45%）→ **暗示内存管理问题，低内存设备更容易触发**
3. **系统版本特征**：Android 13用户占比68%，但Android 14也有25% → **暗示可能与Android版本无关，更可能是App版本问题**

**推理线索**：
- 排查方向应聚焦：8.5.2版本的内存管理变更、图片缓存策略、线程池管理、内存缓存限制
- 可以排除：Android系统版本特定问题、设备品牌特定问题`,
      
      'change': `开始进行变更分析...

我将聚焦于Switch功能开关和A/B实验的变更，分析这些变更是否导致了OOM问题。分析步骤：
1. Switch变更查询：检查内存管理和缓存相关的功能开关变更历史
2. 实验变更查询：检查图片加载和缓存策略相关的A/B实验配置变更
3. 时间关联分析：对比变更时间与OOM发生时间的关联性
4. 影响范围评估：评估变更对用户群体的影响

通过查询Switch平台和实验平台的变更记录，我发现：

**Switch功能开关变更**：
- 5天前：开关"glide_v5_enabled"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-05 10:00:00
  - 变更操作人：developer_zhang
  - 影响范围：全量用户
  - 变更说明：启用Glide 5.x图片加载库，替换原有的4.x版本
- 4天前：开关"memory_cache_unlimited"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-06 14:00:00
  - 变更操作人：developer_li
  - 影响范围：全量用户
  - 变更说明：移除内存缓存大小限制，允许缓存无限增长
- 3天前：开关"thread_pool_expanded"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-07 11:00:00
  - 变更操作人：developer_wang
  - 影响范围：全量用户
  - 变更说明：扩展线程池核心线程数从10增加到50
- 2天前：开关"recyclerview_image_optimization"从关闭(off)变更为开启(on)
  - 变更时间：2024-11-08 16:00:00
  - 变更操作人：developer_li
  - 影响范围：全量用户
  - 变更说明：启用RecyclerView图片加载优化功能

**A/B实验变更**：
- 6天前：实验"image_cache_strategy_v2"流量从20%提升到100%
  - 实验ID：exp_image_cache_v2_001
  - 变更时间：2024-11-04 09:00:00
  - 实验组：使用新的图片缓存策略（Glide 5.x缓存机制）
  - 对照组：使用原有图片缓存策略（Glide 4.x缓存机制）
  - 变更影响：全量用户使用新的图片缓存策略
- 4天前：实验"memory_management_v3"新增实验组B
  - 实验ID：exp_memory_v3_002
  - 变更时间：2024-11-06 15:00:00
  - 新增组B：使用无限制内存缓存策略
  - 流量分配：A组50%（限制2GB）、B组50%（无限制）

**变更与问题的关联性分析**：
1. **高度关联**：开关"memory_cache_unlimited"的开启(4天前)直接导致缓存无限增长
   - 内存缓存大小限制被移除，缓存可以无限增长
   - 与OOM日志"内存缓存占用3.2GB"高度吻合
   - 与OOM堆栈"Java heap space"高度吻合
2. **高度关联**：开关"glide_v5_enabled"的开启(5天前)导致图片缓存策略改变
   - Glide 5.x的缓存策略与4.x不同，可能导致图片未及时释放
   - 与OOM日志"图片缓存占用1.2GB-2.1GB"高度吻合
   - 与OOM堆栈"BitmapFactory"相关错误高度吻合
3. **高度关联**：开关"thread_pool_expanded"的开启(3天前)导致线程数激增
   - 线程池核心线程数从10增加到50，但未正确管理线程生命周期
   - 与OOM日志"线程数156个（正常应<50）"高度吻合
   - 与OOM堆栈"pthread_create failed"高度吻合
4. **实验命中率对比分析**：
   - 实验"image_cache_strategy_v2"：命中实验的用户中，OOM率约92%，未命中实验的用户中，OOM率约3% → **极度异常（+89%）**
   - 实验"memory_management_v3"组B：命中组B的用户中，OOM率约88%，未命中组B的用户中，OOM率约8% → **极度异常（+80%）**
   - **典型特征**：实验"image_cache_strategy_v2"全量时间(6天前，从20%提升到100%)和实验"memory_management_v3"组B新增时间(4天前)与OOM开始时间高度吻合，且命中实验的用户OOM率远超未命中用户 → **强烈暗示实验是导致OOM的直接原因**
5. **实验时间关联分析**：
   - 实验"image_cache_strategy_v2"全量时间：2024-11-04 09:00:00
   - 实验"memory_management_v3"组B新增时间：2024-11-06 15:00:00
   - OOM开始时间：2024-11-04 左右
   - **时间吻合度**：100% → **强烈暗示实验全量和组B新增直接导致OOM**

**结论**：Switch变更和实验变更与当前OOM问题存在强关联性，特别是内存缓存无限制开关、Glide版本升级开关、线程池扩展开关的开启，以及实验"image_cache_strategy_v2"和"memory_management_v3"组B的变更，很可能是导致问题的直接原因。实验命中率对比分析强烈暗示实验是主要根因。`,
      
      'log': `开始进行日志分析...

提取OOM相关的错误日志和内存监控数据：
1. 时间范围：最近一周
2. 异常类型：OutOfMemoryError
3. 内存监控：堆内存使用、非堆内存使用、缓存占用
4. 设备信息：内存大小、设备型号

分析结果：
- 发现3,456个OOM Crash报告
- 内存使用情况：平均87.3%堆内存使用，82.0%非堆内存使用
- 图片缓存占用：1.2GB-2.1GB（异常高）
- 线程数：156个（正常应<50）
- 内存缓存：45,678个缓存项，占用3.2GB

错误分布：
- 图片相关OOM：45%（BitmapFactory相关）
- 线程相关OOM：30%（pthread_create失败）
- 缓存相关OOM：25%（Java heap space）

这些日志信息强烈暗示了图片缓存未释放、线程泄漏和内存缓存无限制增长的问题。`,
      
      'code': `开始进行代码分析...

检查内存管理相关代码：
1. 静态代码分析：扫描图片加载、缓存管理、线程池代码
2. 内存分析：使用内存分析工具检查对象生命周期
3. 代码审查：检查缓存释放、线程管理、对象回收
4. 性能分析：识别内存泄漏点

发现的问题：
- ImageUtils.java:234 - loadImage方法中图片加载后未调用recycle()
- ImageCache.java:156 - 缓存大小检查逻辑错误，实际未限制缓存大小
- ThreadPoolManager.java:89 - 线程池未正确关闭，导致线程泄漏
- MemoryCache.java:234 - put方法中未检查缓存大小，导致无限增长

代码问题分析：
// ImageUtils.java:234（问题代码）
// Bitmap bitmap = BitmapFactory.decodeStream(...);
// 缺少 bitmap.recycle() 或适当的缓存管理
// imageView.setImageBitmap(bitmap);

根本原因：
- 图片加载后未及时释放，导致内存累积
- 缓存大小限制逻辑失效，缓存无限增长
- 线程池未正确管理，线程泄漏
- 内存缓存未实现LRU淘汰机制

修复建议：实现图片缓存LRU机制、限制缓存大小、正确管理线程池生命周期。`
    }
  };
  
  // 根据问题类型和能力ID返回对应的分析
  const analysis = analysisMap[problemType]?.[capabilityId];
  
  if (analysis) {
    return analysis;
  }
  
  // 默认分析模板
  return `开始进行${capability.name}...

正在分析问题相关的线索...

通过系统化的分析，我发现了一些关键信息。这些信息将帮助我更好地理解问题的本质。`;
}

// 生成分析结果
export function generateAnalysisResult(
  capability: { id: string; name: string; description: string },
  problemText: string,
  agentId: string
): {
  summary: string;
  fullResult: any;
  confidence: number;
} {
  const problemType = identifyProblemType(problemText, agentId);
  const capabilityId = capability.id;
  
  // 根据问题类型和能力类型生成分析结果
  const resultMap: Record<string, Record<string, any>> = {
    'search': {
      'clustering': {
        summary: '发现3个主要用户集群：iOS 17.x用户(52%)、App版本8.5.2用户(38%)、iPhone 14 Pro用户(10%)。典型特征：单端问题(iOS端100%)、版本引入时间(8.5.2版本)、系统版本特征(iOS 17.x)',
        fullResult: {
          type: 'clustering',
          data: {
            clusters: [
              { id: 1, name: 'iOS 17.x用户', count: 52, keywords: ['iOS 17.0', 'iOS 17.2', 'iPhone 14 Pro', 'iPhone 15'] },
              { id: 2, name: 'App版本8.5.2用户', count: 38, keywords: ['8.5.2', '最新版本'] },
              { id: 3, name: 'iPhone 14 Pro用户', count: 10, keywords: ['iPhone 14 Pro', 'iOS 17.2'] }
            ],
            comparison: {
              'iOS用户占比': { problem: 100, baseline: 45, diff: 55, status: 'high' },
              'Android用户占比': { problem: 0, baseline: 55, diff: -55, status: 'missing' },
              'App版本8.5.2占比': { problem: 38, baseline: 15, diff: 23, status: 'high' },
              'iOS 17.x占比': { problem: 52, baseline: 25, diff: 27, status: 'high' }
            },
            typicalFeatures: [
              { type: 'single_platform', description: '问题100%集中在iOS端，Android端完全没有反馈', confidence: 0.98 },
              { type: 'version_introduction', description: '问题在8.5.2版本引入，版本发布时间与问题开始时间高度吻合', confidence: 0.95 },
              { type: 'system_version', description: 'iOS 17.x用户占比52%，远超大盘25%', confidence: 0.85 }
            ],
            inference: {
              focus: ['iOS端代码', '8.5.2版本变更', 'iOS 17.x系统兼容性'],
              exclude: ['Android端代码', '8.5.2之前版本的变更']
            }
          }
        },
        confidence: 0.92
      },
      'change': {
        summary: '发现2个Switch变更和2个实验变更：搜索算法开关开启、缓存开关关闭、搜索优化实验流量提升、UI增强实验新增组C',
        fullResult: {
          type: 'change',
          data: {
            changes: [
              { 
                id: 1, 
                type: 'Switch变更', 
                name: 'search_new_algorithm',
                time: '5天前', 
                impact: 'high', 
                description: '搜索算法开关从关闭变更为开启，启用新的搜索算法',
                operator: 'developer_zhang',
                scope: '全量用户'
              },
              { 
                id: 2, 
                type: 'Switch变更', 
                name: 'search_cache_enabled',
                time: '3天前', 
                impact: 'high', 
                description: '搜索缓存开关从开启变更为关闭，导致缓存失效',
                operator: 'developer_li',
                scope: '全量用户'
              },
              { 
                id: 3, 
                type: '实验变更', 
                name: 'search_optimization_v2',
                experimentId: 'exp_search_v2_001',
                time: '6天前', 
                impact: 'high', 
                description: '搜索优化实验流量从10%提升到50%',
                scope: '50%用户',
                hitRateComparison: {
                  hitProblemRate: 85,
                  notHitProblemRate: 5,
                  diff: 80,
                  status: 'extreme'
                },
                timeMatch: {
                  experimentTime: '2024-11-04 09:00:00',
                  problemStartTime: '2024-11-04',
                  matchRate: 100
                }
              },
              { 
                id: 4, 
                type: '实验变更', 
                name: 'search_ui_enhancement',
                experimentId: 'exp_search_ui_002',
                time: '4天前', 
                impact: 'medium', 
                description: '搜索UI增强实验新增组C，使用新的历史记录存储逻辑',
                scope: '40%用户'
              }
            ]
          }
        },
        confidence: 0.92
      },
      'log': {
        summary: '日志中发现1,234个索引错误和567个性能警告，强烈暗示索引更新和查询性能问题',
        fullResult: {
          type: 'log',
          data: {
            errors: [
              { level: 'ERROR', count: 1234, message: 'Search index not found' },
              { level: 'WARN', count: 567, message: 'Slow search query detected (>3s)' },
              { level: 'INFO', count: 345, message: 'Cache miss rate increased to 45%' }
            ]
          }
        },
        confidence: 0.95
      },
      'code': {
        summary: '代码分析发现4个问题：索引更新逻辑缺失、超时处理不当、缓存键生成错误、历史记录关联错误',
        fullResult: {
          type: 'code',
          data: {
            issues: [
              { type: '逻辑问题', file: 'SearchService.java', line: 234, description: '索引更新缺少模糊匹配处理' },
              { type: '性能问题', file: 'SearchController.java', line: 89, description: '查询超时处理不当' },
              { type: '缓存问题', file: 'SearchCache.java', line: 156, description: '缓存键生成逻辑错误' },
              { type: '数据问题', file: 'SearchHistoryService.java', line: 67, description: '历史记录未正确关联用户ID' }
            ]
          }
        },
        confidence: 0.85
      }
    },
    
    'login': {
      'clustering': {
        summary: '发现3个主要用户集群：Android 14用户(48%)、App版本8.5.1用户(35%)、Xiaomi设备用户(17%)',
        fullResult: {
          type: 'clustering',
          data: {
            clusters: [
              { id: 1, name: 'Android 14用户', count: 48, keywords: ['Android 14', 'Xiaomi 13', 'Honor 90'] },
              { id: 2, name: 'App版本8.5.1用户', count: 35, keywords: ['8.5.1', '上周更新'] },
              { id: 3, name: 'Xiaomi设备用户', count: 17, keywords: ['Xiaomi', 'Xiaomi 13'] }
            ]
          }
        },
        confidence: 0.90
      },
      'change': {
        summary: '发现3个Switch变更和2个实验变更：Token刷新开关关闭、登录超时开关开启、微信登录开关短暂关闭、Token管理实验全量、登录流程实验新增组B',
        fullResult: {
          type: 'change',
          data: {
            changes: [
              { 
                id: 1, 
                type: 'Switch变更', 
                name: 'token_refresh_enabled',
                time: '7天前', 
                impact: 'high', 
                description: 'Token刷新开关从开启变更为关闭，导致Token无法自动刷新',
                operator: 'developer_wang',
                scope: '全量用户'
              },
              { 
                id: 2, 
                type: 'Switch变更', 
                name: 'login_timeout_extended',
                time: '6天前', 
                impact: 'medium', 
                description: '登录超时开关从关闭变更为开启，超时时间从30秒延长到60秒',
                operator: 'developer_wang',
                scope: '全量用户'
              },
              { 
                id: 3, 
                type: 'Switch变更', 
                name: 'wechat_login_enabled',
                time: '5天前', 
                impact: 'high', 
                description: '微信登录开关短暂关闭后重新开启，SDK版本更新',
                operator: 'developer_li',
                scope: '全量用户'
              },
              { 
                id: 4, 
                type: '实验变更', 
                name: 'token_management_v3',
                experimentId: 'exp_token_v3_001',
                time: '8天前', 
                impact: 'high', 
                description: 'Token管理实验流量从20%提升到100%，Token过期时间从7天调整为1天',
                scope: '全量用户'
              },
              { 
                id: 5, 
                type: '实验变更', 
                name: 'login_flow_optimization',
                experimentId: 'exp_login_flow_002',
                time: '6天前', 
                impact: 'medium', 
                description: '登录流程优化实验新增组B，使用新的登录请求重试机制',
                scope: '50%用户'
              }
            ]
          }
        },
        confidence: 0.95
      },
      'log': {
        summary: '日志中发现2,345个超时错误和1,234个Token验证失败，强烈暗示登录超时和Token管理问题',
        fullResult: {
          type: 'log',
          data: {
            errors: [
              { level: 'ERROR', count: 2345, message: 'Login request timeout after 60s' },
              { level: 'ERROR', count: 1234, message: 'Token validation failed' },
              { level: 'WARN', count: 567, message: 'WeChat auth callback error' },
              { level: 'INFO', count: 345, message: 'Session expired, require re-login' }
            ]
          }
        },
        confidence: 0.95
      },
      'code': {
        summary: '代码分析发现4个问题：超时处理不当、Token刷新逻辑缺失、微信回调处理错误、会话过期时间设置错误',
        fullResult: {
          type: 'code',
          data: {
            issues: [
              { type: '网络问题', file: 'LoginController.java', line: 156, description: '登录超时处理不当' },
              { type: '逻辑问题', file: 'TokenManager.java', line: 89, description: 'Token刷新逻辑缺少过期处理' },
              { type: '集成问题', file: 'WeChatAuthService.java', line: 234, description: '微信授权回调处理错误' },
              { type: '配置问题', file: 'SessionManager.java', line: 67, description: '会话过期时间设置错误' }
            ]
          }
        },
        confidence: 0.87
      }
    },
    
    'crash': {
      'clustering': {
        summary: '发现4个主要用户集群：Android 14用户(78%)、8GB内存设备(65%)、Xiaomi设备(58%)、App版本8.5.2用户(100%)',
        fullResult: {
          type: 'clustering',
          data: {
            clusters: [
              { id: 1, name: 'Android 14用户', count: 78, keywords: ['Android 14', 'Xiaomi 13 Ultra', 'Xiaomi 13'] },
              { id: 2, name: '8GB内存设备', count: 65, keywords: ['8GB RAM', '内存配置'] },
              { id: 3, name: 'Xiaomi设备', count: 58, keywords: ['Xiaomi', 'Xiaomi 13 Ultra'] },
              { id: 4, name: 'App版本8.5.2用户', count: 100, keywords: ['8.5.2', '最新版本'] }
            ]
          }
        },
        confidence: 0.92
      },
      'change': {
        summary: '发现3个Switch变更和2个实验变更：依赖注入开关开启、初始化优化开关开启、MainActivity重构开关开启、启动流程实验全量、初始化顺序实验新增组B',
        fullResult: {
          type: 'change',
          data: {
            changes: [
              { 
                id: 1, 
                type: 'Switch变更', 
                name: 'new_dependency_injection',
                time: '2天前', 
                impact: 'high', 
                description: '依赖注入框架开关从关闭变更为开启，从v2.5升级到v3.0',
                operator: 'developer_zhang',
                scope: '全量用户'
              },
              { 
                id: 2, 
                type: 'Switch变更', 
                name: 'app_init_optimization',
                time: '1天前', 
                impact: 'high', 
                description: '应用初始化优化开关从关闭变更为开启，改变初始化顺序',
                operator: 'developer_li',
                scope: '全量用户'
              },
              { 
                id: 3, 
                type: 'Switch变更', 
                name: 'main_activity_refactor',
                time: '12小时前', 
                impact: 'high', 
                description: 'MainActivity重构开关从关闭变更为开启，启用重构后的onCreate方法',
                operator: 'developer_wang',
                scope: '全量用户'
              },
              { 
                id: 4, 
                type: '实验变更', 
                name: 'startup_flow_v2',
                experimentId: 'exp_startup_v2_001',
                time: '3天前', 
                impact: 'high', 
                description: '启动流程实验流量从5%提升到100%，包含MainActivity重构',
                scope: '全量用户'
              },
              { 
                id: 5, 
                type: '实验变更', 
                name: 'init_sequence_optimization',
                experimentId: 'exp_init_seq_002',
                time: '1天前', 
                impact: 'medium', 
                description: '初始化顺序优化实验新增组B，使用优化后的初始化顺序',
                scope: '50%用户'
              }
            ]
          }
        },
        confidence: 0.96
      },
      'log': {
        summary: '日志中发现1,234个Crash，100%都是MainActivity.onCreate第156行的NullPointerException',
        fullResult: {
          type: 'log',
          data: {
            errors: [
              { level: 'ERROR', count: 1234, message: 'NullPointerException at MainActivity.onCreate(MainActivity.java:156)' }
            ]
          }
        },
        confidence: 0.98
      },
      'code': {
        summary: '代码分析发现：MainActivity.java第156行直接调用userService.getCurrentUser()，但userService可能为null',
        fullResult: {
          type: 'code',
          data: {
            issues: [
              { type: '空指针风险', file: 'MainActivity.java', line: 156, description: 'userService可能为null，缺少null检查' },
              { type: '依赖注入问题', file: 'MainActivity.java', line: 145, description: '依赖注入可能失败' },
              { type: '初始化问题', file: 'MainActivity.java', line: 152, description: '初始化顺序问题' }
            ]
          }
        },
        confidence: 0.95
      }
    },
    
    'oom': {
      'clustering': {
        summary: '发现5个主要用户集群：6GB内存设备(45%)、8GB内存设备(30%)、12GB内存设备(25%)、Android 13用户(68%)、特定品牌设备(52%)',
        fullResult: {
          type: 'clustering',
          data: {
            clusters: [
              { id: 1, name: '6GB内存设备', count: 45, keywords: ['6GB RAM', 'Redmi Note 12 Pro', '中低端机型'] },
              { id: 2, name: '8GB内存设备', count: 30, keywords: ['8GB RAM', 'Honor 90', '中端机型'] },
              { id: 3, name: '12GB内存设备', count: 25, keywords: ['12GB RAM', 'OnePlus 11', '高端机型'] },
              { id: 4, name: 'Android 13用户', count: 68, keywords: ['Android 13'] },
              { id: 5, name: '特定品牌设备', count: 52, keywords: ['Redmi', 'Honor', 'OnePlus'] }
            ]
          }
        },
        confidence: 0.90
      },
      'change': {
        summary: '发现4个Switch变更和2个实验变更：Glide版本开关开启、内存缓存无限制开关开启、线程池扩展开关开启、RecyclerView优化开关开启、图片缓存实验全量、内存管理实验新增组B',
        fullResult: {
          type: 'change',
          data: {
            changes: [
              { 
                id: 1, 
                type: 'Switch变更', 
                name: 'glide_v5_enabled',
                time: '5天前', 
                impact: 'high', 
                description: 'Glide版本开关从关闭变更为开启，从4.x升级到5.x',
                operator: 'developer_zhang',
                scope: '全量用户'
              },
              { 
                id: 2, 
                type: 'Switch变更', 
                name: 'memory_cache_unlimited',
                time: '4天前', 
                impact: 'high', 
                description: '内存缓存无限制开关从关闭变更为开启，移除缓存大小限制',
                operator: 'developer_li',
                scope: '全量用户'
              },
              { 
                id: 3, 
                type: 'Switch变更', 
                name: 'thread_pool_expanded',
                time: '3天前', 
                impact: 'high', 
                description: '线程池扩展开关从关闭变更为开启，核心线程数从10增加到50',
                operator: 'developer_wang',
                scope: '全量用户'
              },
              { 
                id: 4, 
                type: 'Switch变更', 
                name: 'recyclerview_image_optimization',
                time: '2天前', 
                impact: 'medium', 
                description: 'RecyclerView图片优化开关从关闭变更为开启',
                operator: 'developer_li',
                scope: '全量用户'
              },
              { 
                id: 5, 
                type: '实验变更', 
                name: 'image_cache_strategy_v2',
                experimentId: 'exp_image_cache_v2_001',
                time: '6天前', 
                impact: 'high', 
                description: '图片缓存策略实验流量从20%提升到100%，使用Glide 5.x缓存机制',
                scope: '全量用户'
              },
              { 
                id: 6, 
                type: '实验变更', 
                name: 'memory_management_v3',
                experimentId: 'exp_memory_v3_002',
                time: '4天前', 
                impact: 'high', 
                description: '内存管理实验新增组B，使用无限制内存缓存策略',
                scope: '50%用户'
              }
            ]
          }
        },
        confidence: 0.94
      },
      'log': {
        summary: '日志中发现3,456个OOM，图片缓存占用1.2GB-2.1GB，线程数156个，内存缓存3.2GB',
        fullResult: {
          type: 'log',
          data: {
            errors: [
              { level: 'ERROR', count: 3456, message: 'OutOfMemoryError: Java heap space' },
              { level: 'WARN', count: 1234, message: 'Image cache size exceeded 2GB' },
              { level: 'WARN', count: 567, message: 'Thread count exceeded 150' },
              { level: 'INFO', count: 345, message: 'Memory cache size: 3.2GB' }
            ]
          }
        },
        confidence: 0.95
      },
      'code': {
        summary: '代码分析发现4个问题：图片未释放、缓存大小限制失效、线程池未关闭、缓存无限增长',
        fullResult: {
          type: 'code',
          data: {
            issues: [
              { type: '内存泄漏', file: 'ImageUtils.java', line: 234, description: '图片加载后未调用recycle()' },
              { type: '配置问题', file: 'ImageCache.java', line: 156, description: '缓存大小检查逻辑错误' },
              { type: '资源泄漏', file: 'ThreadPoolManager.java', line: 89, description: '线程池未正确关闭' },
              { type: '逻辑问题', file: 'MemoryCache.java', line: 234, description: '缓存未实现LRU淘汰机制' }
            ]
          }
        },
        confidence: 0.90
      }
    }
  };
  
  const result = resultMap[problemType]?.[capabilityId];
  
  if (result) {
    return result;
  }
  
  // 默认结果
  return {
    summary: `${capability.name}分析完成，发现了一些线索`,
    fullResult: { type: 'generic', data: {} },
    confidence: 0.60
  };
}

// 生成最终结论
export function generateFinalConclusion(
  completedTodos: Array<{ title: string; result: { summary: string; confidence: number } | null }>,
  problemText: string,
  agentId: string
): string {
  const problemType = identifyProblemType(problemText, agentId);
  const highConfidenceTodo = completedTodos.find(todo => 
    todo.result && todo.result.confidence >= 0.9
  );
  
  const conclusionMap: Record<string, string> = {
    'search': `基于变更分析的高置信度结果，我已经找到了搜索功能问题的根本原因：

**核心问题**：Switch功能开关和A/B实验的变更导致了搜索功能异常

**详细分析**：
${completedTodos.map(todo => 
  todo.result ? `- ${todo.title}：${todo.result.summary}` : ''
).filter(Boolean).join('\n')}

**根本原因（Switch和实验变更）**：
1. **Switch变更**：开关"search_new_algorithm"的开启(5天前)启用了新的搜索算法
   - 新算法可能导致索引匹配逻辑改变，使得"iPhone 15"等商品无法被正确索引
   - 建议：回滚该开关或修复新算法的索引匹配逻辑
2. **Switch变更**：开关"search_cache_enabled"的关闭(3天前)直接导致缓存失效
   - 缓存关闭后，所有搜索请求都直接查询数据库，导致响应时间从平均200ms增加到3-5秒
   - 建议：重新开启该开关或优化数据库查询性能
3. **实验变更**：实验"search_optimization_v2"流量提升(6天前)可能影响搜索性能
   - 新索引策略可能未完全优化，导致查询性能下降
   - 建议：降低实验流量或优化索引策略
4. **实验变更**：实验"search_ui_enhancement"新增组C(4天前)可能影响历史记录功能
   - 新的历史记录存储逻辑可能导致历史记录显示异常
   - 建议：回滚组C或修复历史记录存储逻辑

**解决方案**：
1. **立即回滚**：关闭开关"search_new_algorithm"，恢复原有搜索算法
2. **立即修复**：重新开启开关"search_cache_enabled"，恢复缓存功能
3. **实验调整**：降低实验"search_optimization_v2"的流量，或优化索引策略
4. **实验调整**：暂停实验"search_ui_enhancement"的组C，或修复历史记录逻辑

**优先级**：高 - Switch和实验变更直接影响用户体验，建议立即回滚相关开关和实验`,
    
    'login': `基于变更分析的高置信度结果，我已经找到了登录功能问题的根本原因：

**核心问题**：Switch功能开关和A/B实验的变更导致了登录功能异常

**详细分析**：
${completedTodos.map(todo => 
  todo.result ? `- ${todo.title}：${todo.result.summary}` : ''
).filter(Boolean).join('\n')}

**根本原因（Switch和实验变更）**：
1. **Switch变更**：开关"token_refresh_enabled"的关闭(7天前)直接导致Token无法自动刷新
   - Token过期后无法自动刷新，导致用户频繁需要重新登录
   - 建议：立即重新开启该开关，恢复Token自动刷新功能
2. **实验变更**：实验"token_management_v3"全量(8天前)后Token过期时间缩短为1天
   - Token过期时间从7天缩短为1天，导致用户需要更频繁地重新登录
   - 建议：回滚该实验或调整Token过期时间策略
3. **Switch变更**：开关"wechat_login_enabled"的短暂关闭(5天前)可能导致微信登录异常
   - 开关关闭期间，微信登录功能完全不可用
   - 重新开启后，SDK版本更新可能导致授权回调处理逻辑不兼容
   - 建议：检查微信登录SDK集成，确保回调正确处理
4. **Switch变更**：开关"login_timeout_extended"的开启(6天前)可能掩盖了网络问题
   - 超时时间延长后，虽然减少了超时错误，但可能掩盖了实际的网络延迟问题
   - 建议：优化网络请求处理，添加重试机制

**解决方案**：
1. **立即修复**：重新开启开关"token_refresh_enabled"，恢复Token自动刷新功能
2. **实验调整**：回滚实验"token_management_v3"或调整Token过期时间策略
3. **SDK修复**：检查并修复微信登录SDK集成，确保回调正确处理
4. **网络优化**：优化登录请求处理，添加重试机制和更好的错误处理

**优先级**：高 - Switch和实验变更直接影响用户登录，建议立即回滚相关开关和实验`,
    
    'crash': `基于变更分析的高置信度结果，我已经找到了应用启动崩溃的根本原因：

**核心问题**：Switch功能开关的变更导致了应用启动崩溃

**详细分析**：
${completedTodos.map(todo => 
  todo.result ? `- ${todo.title}：${todo.result.summary}` : ''
).filter(Boolean).join('\n')}

**根本原因（Switch变更）**：
1. **Switch变更**：开关"new_dependency_injection"的开启(2天前)导致依赖注入框架升级
   - 依赖注入框架从v2.5升级到v3.0，注入机制改变
   - MainActivity中的userService可能未正确注入，导致为null
   - 与Crash堆栈"NullPointerException at MainActivity.onCreate(MainActivity.java:156)"高度吻合
   - 建议：立即关闭该开关，回滚到v2.5版本
2. **Switch变更**：开关"app_init_optimization"的开启(1天前)改变了初始化顺序
   - 初始化顺序调整可能导致userService在MainActivity.onCreate调用时还未初始化完成
   - 与Crash发生时间高度吻合
   - 建议：关闭该开关或修复初始化顺序
3. **Switch变更**：开关"main_activity_refactor"的开启(12小时前)启用了重构后的代码
   - 重构后的onCreate方法可能移除了null检查
   - 直接调用userService.getCurrentUser()时，userService可能为null
   - 建议：关闭该开关或添加null检查
4. **实验变更**：实验"startup_flow_v2"的全量(3天前)可能导致启动流程问题
   - 新的启动流程可能未完全测试，存在兼容性问题
   - 建议：回滚该实验或修复启动流程

**解决方案**：
1. **立即回滚**：关闭开关"new_dependency_injection"，回滚依赖注入框架到v2.5
2. **立即回滚**：关闭开关"app_init_optimization"，恢复原有初始化顺序
3. **立即回滚**：关闭开关"main_activity_refactor"，恢复原有MainActivity代码
4. **代码修复**：在调用userService前添加null检查，确保依赖注入成功后再使用
5. **实验调整**：回滚实验"startup_flow_v2"或修复启动流程

**优先级**：紧急 - Switch变更导致应用无法启动，必须立即回滚相关开关`,
    
    'oom': `基于变更分析的高置信度结果，我已经找到了OOM问题的根本原因：

**核心问题**：Switch功能开关和A/B实验的变更导致了内存溢出

**详细分析**：
${completedTodos.map(todo => 
  todo.result ? `- ${todo.title}：${todo.result.summary}` : ''
).filter(Boolean).join('\n')}

**根本原因（Switch和实验变更）**：
1. **Switch变更**：开关"memory_cache_unlimited"的开启(4天前)直接导致缓存无限增长
   - 内存缓存大小限制被移除，缓存可以无限增长
   - 与OOM日志"内存缓存占用3.2GB"高度吻合
   - 建议：立即关闭该开关，恢复缓存大小限制
2. **Switch变更**：开关"glide_v5_enabled"的开启(5天前)导致图片缓存策略改变
   - Glide 5.x的缓存策略与4.x不同，可能导致图片未及时释放
   - 与OOM日志"图片缓存占用1.2GB-2.1GB"高度吻合
   - 建议：回滚该开关或修复Glide 5.x的缓存策略
3. **Switch变更**：开关"thread_pool_expanded"的开启(3天前)导致线程数激增
   - 线程池核心线程数从10增加到50，但未正确管理线程生命周期
   - 与OOM日志"线程数156个（正常应<50）"高度吻合
   - 建议：关闭该开关或修复线程池管理逻辑
4. **实验变更**：实验"image_cache_strategy_v2"全量(6天前)使用新的图片缓存策略
   - Glide 5.x缓存机制可能导致图片未及时释放
   - 建议：回滚该实验或优化图片缓存策略
5. **实验变更**：实验"memory_management_v3"新增组B(4天前)使用无限制内存缓存策略
   - 无限制缓存策略直接导致内存无限增长
   - 建议：暂停组B或恢复缓存限制

**解决方案**：
1. **立即回滚**：关闭开关"memory_cache_unlimited"，恢复缓存大小限制（建议2GB）
2. **立即回滚**：关闭开关"glide_v5_enabled"，回滚到Glide 4.x或修复缓存策略
3. **立即回滚**：关闭开关"thread_pool_expanded"，恢复线程池配置或修复线程管理
4. **实验调整**：回滚实验"image_cache_strategy_v2"或优化图片缓存策略
5. **实验调整**：暂停实验"memory_management_v3"的组B，恢复缓存限制

**优先级**：高 - Switch和实验变更导致应用崩溃，建议立即回滚相关开关和实验`
  };
  
  if (highConfidenceTodo) {
    return conclusionMap[problemType] || `基于${highConfidenceTodo.title}的分析结果，我已经找到了问题的根本原因：

**核心问题**：${highConfidenceTodo.result!.summary}

**详细分析**：
${completedTodos.map(todo => 
  todo.result ? `- ${todo.title}：${todo.result.summary}` : ''
).filter(Boolean).join('\n')}

**结论**：根据以上分析，问题的根本原因已经明确。建议按照优先级逐一修复相关问题。`;
  }
  
  return `基于所有分析线索，我得出以下结论：

**分析总结**：
${completedTodos.map(todo => 
  todo.result ? `- ${todo.title}：${todo.result.summary}` : ''
).filter(Boolean).join('\n')}

**综合判断**：虽然各个维度的分析都发现了一些线索，但需要进一步验证才能确定根本原因。建议按照优先级逐一排查。`;
}

