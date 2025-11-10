import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 部署配置
  // 如果仓库名不是 'ai_infra'，请修改 basePath 为你的仓库名
  // 例如：如果仓库名是 'my-repo'，则 basePath: '/my-repo'
  basePath: process.env.NODE_ENV === 'production' ? '/client_ai_infra_demo' : '',
  output: 'export',
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js 图片优化
  },
  trailingSlash: true, // 确保 URL 以斜杠结尾
};

export default nextConfig;
