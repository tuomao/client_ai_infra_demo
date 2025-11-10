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
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#262626', margin: 0 }}>
                  <strong>使命：</strong>为大前端开发者构建下一代AI基础设施平台，通过模块化的原子Agent能力、标准化的MCP协议和完整的工具链，让每一位开发者都能像搭积木一样轻松组合和定制专属的AI Agent。从而实现研发生命周期全流程智能化，让AI真正成为大前端开发的得力助手。
                </Paragraph>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#262626', margin: 0 }}>
                  <strong>愿景：</strong>成为大前端领域最开放、最易用的AI基础设施平台。让开发者能够快速响应业务需求，将重复性工作交给AI，将创造力聚焦于业务创新。通过持续的技术创新和生态建设，推动大前端开发从"人找问题"到"问题找人"，从"被动响应"到"主动预防"，最终实现"零故障、零加班、零焦虑"的理想开发体验。
                </Paragraph>
              </Space>
            </div>
          </Space>
        </Card>

        {/* 平台能力 */}
        <Card 
          style={{ marginBottom: 32 }}
          bodyStyle={{ padding: '8px 24px' }}
        >
          <Title level={2} style={{ marginBottom: 0, textAlign: 'center', marginTop: 0 }}>
            平台能力
          </Title>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '0',
            marginTop: '0'
          }}>
            <Image
              src="/agent_service.png"
              alt="平台能力"
              width={1200}
              height={675}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '1200px',
              }}
              priority
            />
          </div>
        </Card>

        {/* 架构图 */}
        <Card style={{ marginBottom: 32 }}>
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

        {/* 落地场景-AI排障 */}
        <Card>
          <Title level={2} style={{ marginBottom: 32, textAlign: 'center' }}>
            落地场景-AI排障
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
                src="/ai_root_cause.png"
                alt="落地场景-AI排障"
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
