'use client';

import React from 'react';
import { Card, Alert, Button, Space, Statistic, Row, Col } from 'antd';
import { ArrowRightOutlined, BugOutlined, ThunderboltOutlined, SafetyOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function CrashPage() {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Crash归因Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            分析应用崩溃问题，自动定位崩溃根因并提供修复建议
          </p>
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="总崩溃数"
                value={345}
                prefix={<BugOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="崩溃率"
                value={1.2}
                suffix="%"
                prefix={<ThunderboltOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="已修复"
                value={298}
                prefix={<SafetyOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Alert
            message="功能开发中"
            description="Crash归因Agent正在开发中，将提供与白屏归因类似的完整分析能力。功能包括：崩溃堆栈分析、根因定位、修复建议、相似问题推荐等。"
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <Link href="/analysis/white-screen">
            <Button type="primary" icon={<ArrowRightOutlined />} size="large">
              查看白屏归因Agent（完整实现参考）
            </Button>
          </Link>
        </Card>
      </Space>
    </MainLayout>
  );
}

