# GitHub Pages 部署指南

本指南将帮助你将 AI 基础设施平台部署到 GitHub Pages。

## 📋 前置要求

1. 一个 GitHub 账户
2. 已创建 GitHub 仓库（如果还没有，请先创建）
3. 项目已推送到 GitHub 仓库

## 🚀 部署步骤

### 1. 配置仓库设置

1. 进入你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**（页面）
4. 在 **Source**（源）部分：
   - 选择 **GitHub Actions** 作为部署源
   - 不要选择 "Deploy from a branch"

### 2. 配置 basePath（重要）

如果你的 GitHub 仓库名不是 `ai_infra`，需要修改 `next.config.ts` 中的 `basePath`：

```typescript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

例如，如果仓库名是 `my-ai-platform`，则应该设置为：

```typescript
basePath: process.env.NODE_ENV === 'production' ? '/my-ai-platform' : '',
```

### 3. 推送代码

将代码推送到 GitHub 仓库的 `main` 分支：

```bash
git add .
git commit -m "配置 GitHub Pages 部署"
git push origin main
```

### 4. 触发部署

推送代码后，GitHub Actions 会自动触发部署流程：

1. 进入仓库的 **Actions**（操作）标签页
2. 查看部署工作流的执行状态
3. 等待部署完成（通常需要 2-5 分钟）

### 5. 访问网站

部署完成后，你的网站将在以下地址可用：

```
https://your-username.github.io/ai_infra/
```

或者，如果你的仓库名不同：

```
https://your-username.github.io/your-repo-name/
```

## 🔧 配置说明

### Next.js 配置

项目已配置为静态导出模式：

- `output: 'export'` - 生成静态 HTML 文件
- `images.unoptimized: true` - GitHub Pages 不支持 Next.js 图片优化
- `trailingSlash: true` - URL 以斜杠结尾，确保路由正常工作
- `basePath` - 根据仓库名设置基础路径

### GitHub Actions 工作流

工作流文件位于 `.github/workflows/deploy.yml`，包含以下步骤：

1. **构建**：安装依赖并构建 Next.js 应用
2. **部署**：将构建产物部署到 GitHub Pages

## 🐛 常见问题

### 1. 页面显示 404

**原因**：`basePath` 配置不正确

**解决方案**：
- 检查 `next.config.ts` 中的 `basePath` 是否与仓库名匹配
- 确保仓库名大小写正确

### 2. 图片或资源无法加载

**原因**：资源路径不正确

**解决方案**：
- 确保所有静态资源放在 `public` 目录下
- 使用相对路径引用资源（例如：`/architecture.png` 而不是 `./architecture.png`）

### 3. 路由不工作

**原因**：GitHub Pages 不支持客户端路由

**解决方案**：
- 确保使用 Next.js 的 `Link` 组件进行导航
- 检查 `trailingSlash: true` 配置

### 4. 部署失败

**原因**：构建错误或权限问题

**解决方案**：
- 检查 GitHub Actions 日志中的错误信息
- 确保仓库已启用 Pages 功能
- 检查 GitHub Actions 权限设置

## 📝 注意事项

1. **仓库名限制**：GitHub Pages 的 URL 基于仓库名，更改仓库名会影响网站 URL
2. **构建时间**：每次推送都会触发新的构建，可能需要几分钟
3. **文件大小**：GitHub Pages 有文件大小限制，确保构建产物不超过限制
4. **自定义域名**：可以在仓库设置中配置自定义域名

## 🔄 更新部署

每次推送到 `main` 分支时，GitHub Actions 会自动重新部署网站。你也可以手动触发部署：

1. 进入 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow**（运行工作流）

## 📚 相关资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

