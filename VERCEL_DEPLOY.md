# Vercel 部署指南

## 方式一：通过 GitHub 集成部署（推荐）

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Add New Project" 或 "Import Project"
4. 选择仓库：`tuomao/client_ai_infra_demo`
5. Vercel 会自动检测到 Next.js 项目并配置
6. 点击 "Deploy" 开始部署
7. 等待部署完成，会获得一个 `*.vercel.app` 的域名

## 方式二：使用 Vercel CLI

### 1. 登录 Vercel
```bash
vercel login
```
这会打开浏览器进行登录认证。

### 2. 部署到预览环境
```bash
vercel
```
首次部署会询问一些问题：
- Set up and deploy? Yes
- Which scope? 选择你的账号
- Link to existing project? No（首次部署）
- Project name? 可以保持默认或自定义
- Directory? ./（当前目录）
- Override settings? No

### 3. 部署到生产环境
```bash
vercel --prod
```

## 项目配置

- **框架**: Next.js 16.0.1
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **Node版本**: 自动检测（推荐 18.x 或更高）

### 重要配置说明

项目已配置为同时支持 Vercel 和 GitHub Pages 部署：

- **Vercel 部署**（默认）：使用标准 Next.js 配置，支持完整的 SSR、API 路由等功能
- **GitHub Pages 部署**：需要设置 `NEXT_PUBLIC_BASE_PATH` 环境变量，会自动启用静态导出

**注意**：Vercel 部署时**不要**设置 `NEXT_PUBLIC_BASE_PATH` 环境变量，否则会启用静态导出模式，可能导致构建卡住或功能受限。

## 环境变量（如需要）

如果项目需要环境变量，可以在 Vercel 项目设置中添加：
1. 进入项目设置
2. 选择 "Environment Variables"
3. 添加所需的变量

## 自动部署

通过 GitHub 集成后，每次推送到 `main` 分支会自动触发生产环境部署，推送到其他分支会创建预览部署。

## 故障排除

### 部署卡住或构建失败

1. **检查环境变量**：确保在 Vercel 项目设置中**没有**设置 `NEXT_PUBLIC_BASE_PATH` 环境变量
2. **检查构建日志**：在 Vercel 控制台查看详细的构建日志，定位具体错误
3. **清除缓存**：在 Vercel 项目设置中清除构建缓存后重新部署
4. **检查 Node 版本**：确保使用 Node.js 18.x 或更高版本

### 常见问题

- **构建超时**：检查是否有大量静态页面需要生成，考虑使用增量静态生成（ISR）
- **内存不足**：在 Vercel 项目设置中增加构建内存限制
- **依赖安装失败**：检查 `package.json` 中的依赖版本是否兼容

