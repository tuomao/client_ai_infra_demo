'use client';

import React from 'react';
import { Card, Typography, Space } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Paragraph } = Typography;

export default function ArchitecturePage() {

  return (
    <MainLayout>
      <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
        {/* 使命和愿景 */}
        <Card style={{ marginBottom: 32 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2} style={{ marginBottom: 16 }}>
                <RocketOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                使命和愿景
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#262626', margin: 0 }}>
                <strong>使命：</strong>为大前端开发者提供开箱即用的AI基础设施平台，通过智能化的Agent能力和工具链，让每一个大前端同学都都能轻松在开发、监控、排障等各个环节构建属于自己的Agent，全面提升大前端开发的质量保障和工作效率。
              </Paragraph>
            </div>
          </Space>
        </Card>

        {/* 架构图 */}
        <Card>
          <Title level={2} style={{ marginBottom: 32, textAlign: 'center' }}>
            系统架构图
          </Title>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '24px 0'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              aspectRatio: '16/9',
            }}>
              <Image
                src="/architecture.png"
                alt="系统架构图"
                fill
                style={{
                  objectFit: 'contain',
                }}
                priority
              />
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
