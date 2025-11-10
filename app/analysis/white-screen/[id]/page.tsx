import { readFileSync } from 'fs';
import { join } from 'path';
import WhiteScreenDetailClient from './WhiteScreenDetailClient';

// 生成静态参数，用于静态导出
export function generateStaticParams() {
  try {
    const filePath = join(process.cwd(), 'mock', 'white-screen-data.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.issues.map((issue: { id: string }) => ({
      id: issue.id,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    // 返回默认的 ID 列表作为后备
    return [
      { id: 'ws-001' },
      { id: 'ws-002' },
      { id: 'ws-003' },
      { id: 'ws-004' },
      { id: 'ws-005' },
    ];
  }
}

export default async function WhiteScreenDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WhiteScreenDetailClient id={id} />;
}
