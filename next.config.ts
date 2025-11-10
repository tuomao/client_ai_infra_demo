import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 部署配置
  // 如果仓库名不是 'ai_infra'，请修改 basePath 为你的仓库名
  // 例如：如果仓库名是 'my-repo'，则 basePath: '/my-repo'
  // 使用 NEXT_PUBLIC_BASE_PATH 环境变量控制 basePath，本地测试时设置为空
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  output: 'export',
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js 图片优化
  },
  trailingSlash: true, // 确保 URL 以斜杠结尾
};

export default nextConfig;
