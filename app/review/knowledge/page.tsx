'use client';

import React from 'react';
import { Card, List, Input, Button, Space, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useKnowledge } from '@/hooks/use-mock-data';
import { formatDateTime } from '@/lib/utils';


export default function KnowledgePage() {
  const { data: knowledge, loading } = useKnowledge();

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>业务领域知识库</h1>
            <p style={{ color: '#8c8c8c' }}>
              沉淀业务知识和最佳实践，支持AI学习和推荐
            </p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            新建知识
          </Button>
        </div>

        <Card bordered={false}>
          <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
            <Input
              placeholder="搜索知识库..."
              prefix={<SearchOutlined />}
              size="large"
            />
          </Space.Compact>
        </Card>

        <Card bordered={false}>
          <List
            loading={loading}
            dataSource={knowledge}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button key="view" type="link" icon={<EyeOutlined />}>
                    查看
                  </Button>,
                  <Button key="edit" type="link" icon={<EditOutlined />}>
                    编辑
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={<span style={{ fontSize: 16, fontWeight: 500 }}>{item.title}</span>}
                  description={
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ color: '#595959' }}>
                        {item.content.substring(0, 100)}...
                      </div>
                      <div>
                        <Tag color="blue">{item.category}</Tag>
                        {item.tags.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                      <div style={{ color: '#8c8c8c', fontSize: 12 }}>
                        作者: {item.author} | 更新: {formatDateTime(item.updatedAt)}
                      </div>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </MainLayout>
  );
}

