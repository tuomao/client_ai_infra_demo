'use client';

import React from 'react';
import { Card, Tabs } from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import CodeViewer from '@/components/editor/CodeViewer';

export default function CodeBasePage() {
  const sampleCode = `import React from 'react';

export const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await api.getItems();
    setItems(data);
  };

  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};`;

  const tabItems = [
    {
      key: 'viewer',
      label: '代码查看',
      children: (
        <CodeViewer code={sampleCode} language="typescript" height={500} />
      ),
    },
    {
      key: 'search',
      label: '代码搜索',
      children: (
        <div style={{ padding: 20, textAlign: 'center', color: '#8c8c8c' }}>
          代码搜索功能开发中...
        </div>
      ),
    },
    {
      key: 'terminal',
      label: 'Terminal',
      children: (
        <div style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: 20,
          fontFamily: 'monospace',
          borderRadius: 6,
          minHeight: 400,
        }}>
          <div>$ Welcome to AI Infra Terminal</div>
          <div>$ Type 'help' for available commands</div>
          <div style={{ marginTop: 20 }}>
            <span style={{ color: '#569cd6' }}>~</span> $ _
          </div>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>CodeBase服务</h1>
        <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
          代码查看、搜索和编辑工具
        </p>

        <Card>
          <Tabs items={tabItems} />
        </Card>
      </div>
    </MainLayout>
  );
}

