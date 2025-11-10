# Netlify 部署指南

## 问题诊断

Netlify 部署时遇到依赖安装超时问题，主要原因：
- 依赖包较大（约 741MB）
- package-lock.json 有 7335 行
- 默认的 `npm install` 速度较慢

## 解决方案

### 1. 已创建的配置文件

#### `netlify.toml`
- 使用 `npm ci` 替代 `npm install`（更快、更可靠）
- 添加 `--no-audit` 跳过安全审计
- 添加 `--prefer-offline` 优先使用缓存
- 添加 `--legacy-peer-deps` 处理依赖冲突
- 禁用进度条和详细日志以减少输出
- **新增**：增加超时时间到 5 分钟（300000 毫秒）
- **新增**：增加重试次数到 5 次
- **新增**：限制并发连接数为 1，避免过多并发导致超时

#### `.npmrc`
- 持久化 npm 配置，包括镜像源、超时时间、重试次数等
- 确保配置在 Netlify 构建环境中生效

#### `.nvmrc`
- 指定 Node.js 版本为 `22.21.1`，确保版本一致性

### 2. 配置说明

#### `netlify.toml`
```toml
[build]
  command = "npm run build"
  # 优化安装命令：使用国内镜像源，增加超时时间和重试次数，限制并发数避免超时
  install = "npm config set registry https://registry.npmmirror.com && npm config set fetch-timeout 300000 && npm config set fetch-retries 5 && npm config set maxsockets 1 && npm ci --no-audit --prefer-offline --legacy-peer-deps"

[build.environment]
  NODE_VERSION = "22.21.1"
  NPM_FLAGS = "--no-audit --prefer-offline --legacy-peer-deps"
  NPM_CONFIG_PROGRESS = "false"
  NPM_CONFIG_LOGGER = "error"
  NPM_CONFIG_FETCH_TIMEOUT = "300000"
  NPM_CONFIG_FETCH_RETRIES = "5"
  NPM_CONFIG_MAXSOCKETS = "1"
```

#### `.npmrc`
```ini
registry=https://registry.npmmirror.com
fetch-timeout=300000
fetch-retries=5
maxsockets=1
progress=false
loglevel=error
```

### 3. 部署步骤

1. **提交配置文件到仓库**：
   ```bash
   git add netlify.toml .npmrc .nvmrc
   git commit -m "优化 Netlify 构建配置以解决依赖安装超时问题"
   git push
   ```

2. **在 Netlify 控制台验证配置**：
   - 进入 Netlify 控制台 > Site settings > Build & deploy
   - 确认构建命令为：`npm run build`
   - 确认安装命令为：`npm ci --no-audit --prefer-offline --legacy-peer-deps`
   - 确认 Node 版本为：`22.21.1`

3. **触发新的部署**：
   - 推送到 main 分支会自动触发部署
   - 或在 Netlify 控制台手动触发 "Trigger deploy"

### 4. 如果问题仍然存在

#### 选项 A：在 Netlify 控制台设置环境变量
1. 进入 Site settings > Build & deploy > Environment
2. 添加以下环境变量：
   - `NPM_FLAGS` = `--no-audit --prefer-offline --legacy-peer-deps`
   - `NPM_CONFIG_PROGRESS` = `false`
   - `NPM_CONFIG_LOGGER` = `error`
   - `NPM_CONFIG_FETCH_TIMEOUT` = `300000`
   - `NPM_CONFIG_FETCH_RETRIES` = `5`
   - `NPM_CONFIG_MAXSOCKETS` = `1`

#### 选项 B：检查构建日志
- 查看 Netlify 构建日志，确认具体是哪个步骤超时
- 如果是特定包安装缓慢，考虑：
  - 检查是否有可选依赖可以移除
  - 考虑使用更轻量的替代方案

#### 选项 C：升级 Netlify 计划
- 免费计划有构建时间限制
- 如果依赖确实很大，考虑升级到付费计划以获得更长的构建时间

### 5. 本地测试

在提交前，可以在本地测试安装速度：

```bash
# 清理缓存和 node_modules
rm -rf node_modules package-lock.json

# 重新安装（模拟 Netlify 环境）
npm ci --no-audit --prefer-offline --legacy-peer-deps

# 记录安装时间
time npm ci --no-audit --prefer-offline --legacy-peer-deps
```

### 6. 优化建议

- ✅ `package-lock.json` 已提交到 Git（确保缓存有效）
- ✅ 使用 `npm ci` 而不是 `npm install`（更快、可重现）
- ✅ 跳过审计和详细日志（减少输出时间）
- ✅ 指定 Node 版本（避免版本不匹配问题）
- ✅ 使用国内镜像源加速下载（registry.npmmirror.com）
- ✅ 增加超时时间到 5 分钟，避免网络波动导致超时
- ✅ 增加重试次数到 5 次，提高安装成功率
- ✅ 限制并发连接数为 1，避免过多并发导致超时

## 参考资源

- [Netlify 构建配置文档](https://docs.netlify.com/configure-builds/file-based-configuration/)
- [npm ci 文档](https://docs.npmjs.com/cli/v10/commands/npm-ci)
- [Netlify Node.js 版本管理](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript)

