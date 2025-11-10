'use client';

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  SafetyOutlined,
  ToolOutlined,
  FileTextOutlined,
  RocketOutlined,
  ApiOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  RobotOutlined,
  HomeOutlined,
  ShopOutlined,
  ApartmentOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import AIWorkStudioLogo from '@/components/common/Logo';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem(<Link href="/architecture">架构</Link>, '/architecture', <ApartmentOutlined />),
  getItem(<Link href="/workspace">我的工作台</Link>, '/workspace', <HomeOutlined />),
  getItem('我的AgentBot', 'agent-bot', <RobotOutlined />, [
    getItem(<Link href="/agent-bot/feedback-analysis">根因分析</Link>, '/agent-bot/feedback-analysis'),
    getItem(<Link href="/agent-bot/first-frame-optimization">首帧优化</Link>, '/agent-bot/first-frame-optimization'),
    getItem(<Link href="/agent-bot/hotfix">热修Agent</Link>, '/agent-bot/hotfix'),
    getItem(<Link href="/agent-bot/alert-analysis">告警分析Agent</Link>, '/agent-bot/alert-analysis'),
  ]),
  getItem(<Link href="/atomic-agents/market">Agent市场</Link>, '/atomic-agents/market', <ShopOutlined />),
  getItem('ClientAgent', 'client-agent', <MobileOutlined />, [
    getItem(<Link href="/client-agent/blank-screen-detection">白屏检测</Link>, '/client-agent/blank-screen-detection'),
    getItem(<Link href="/client-agent/favorite-tag-generation">收藏标签生成</Link>, '/client-agent/favorite-tag-generation'),
    getItem(<Link href="/client-agent/emoji-recommendation">表情推荐</Link>, '/client-agent/emoji-recommendation'),
    getItem(<Link href="/client-agent/auto-feedback-form">自动反馈表单填写</Link>, '/client-agent/auto-feedback-form'),
  ]),
  getItem(<Link href="/tools/mcp-servers">MCP</Link>, '/tools/mcp-servers', <ApiOutlined />),
  getItem('数据', 'data', <DatabaseOutlined />, [
    getItem(<Link href="/data/knowledge">知识库</Link>, '/data/knowledge'),
    getItem(<Link href="/data/app-evaluation">应用评测</Link>, '/data/app-evaluation'),
    getItem(<Link href="/data/app-data">应用数据</Link>, '/data/app-data'),
    getItem(<Link href="/admin/test-suite">测评集管理</Link>, '/admin/test-suite'),
  ]),
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // 根据当前路径获取选中的菜单项
  const selectedKeys = [pathname];
  
  // 根据当前路径获取展开的菜单项
  const defaultOpenKeys = pathname.split('/').filter(Boolean).slice(0, 1).map(key => key);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '0 24px',
        zIndex: 10,
      }}>
        <AIWorkStudioLogo size="medium" showText={true} />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={240}
          style={{
            background: '#fff',
            boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: 8,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

