import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 根据部署环境选择配置
  // Vercel 部署：不需要 output: 'export'，使用标准 Next.js 配置
  // GitHub Pages 部署：需要设置 NEXT_PUBLIC_BASE_PATH 环境变量，会自动启用静态导出
  ...(process.env.NEXT_PUBLIC_BASE_PATH
    ? {
        // GitHub Pages 静态导出配置
        basePath: process.env.NEXT_PUBLIC_BASE_PATH,
        output: 'export',
        images: {
          unoptimized: true, // GitHub Pages 不支持 Next.js 图片优化
        },
        trailingSlash: true, // 确保 URL 以斜杠结尾
      }
    : {
        // Vercel 标准配置（默认）
        // Vercel 支持完整的 Next.js 功能，包括 SSR、API 路由等
        images: {
          // Vercel 支持图片优化，不需要 unoptimized
        },
      }),
};

export default nextConfig;
