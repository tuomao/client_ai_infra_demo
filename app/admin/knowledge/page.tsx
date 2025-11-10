'use client';

import React from 'react';
import { Card, Tabs, Alert } from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function AdminKnowledgePage() {
  const tabItems = [
    {
      key: 'business',
      label: '业务线知识库',
      children: (
        <Alert
          message="知识库管理"
          description={
            <div>
              <p>在此管理业务线知识库的分类、标签和内容。</p>
              <Link href="/review/knowledge">查看业务领域知识库 →</Link>
            </div>
          }
          type="info"
        />
      ),
    },
    {
      key: 'sop',
      label: 'SOP知识库',
      children: (
        <Alert
          message="SOP管理"
          description={
            <div>
              <p>在此管理SOP文档的版本、模板和流程。</p>
              <Link href="/review/sop">查看SOP沉淀 →</Link>
            </div>
          }
          type="info"
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>知识库管理</h1>
        <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
          管理业务知识库和SOP文档库
        </p>

        <Card>
          <Tabs items={tabItems} />
        </Card>
      </div>
    </MainLayout>
  );
}

