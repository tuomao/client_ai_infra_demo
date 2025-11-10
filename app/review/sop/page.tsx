'use client';

import React from 'react';
import { Card, List, Button, Space, Tag, Divider } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import { useSOPDocuments } from '@/hooks/use-mock-data';
import { formatDateTime } from '@/lib/utils';

export default function SOPPage() {
  const { data: sops, loading } = useSOPDocuments();

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>SOP沉淀</h1>
            <p style={{ color: '#8c8c8c' }}>
              标准操作流程文档管理，AI辅助生成SOP
            </p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            创建SOP
          </Button>
        </div>

        <Card bordered={false}>
          <List
            loading={loading}
            dataSource={sops}
            renderItem={(sop) => (
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
                  title={
                    <Space>
                      <span style={{ fontSize: 16, fontWeight: 500 }}>{sop.title}</span>
                      <Tag color="blue">v{sop.version}</Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <div>
                        <Tag>{sop.category}</Tag>
                        <span style={{ color: '#8c8c8c', marginLeft: 8 }}>
                          {sop.steps.length} 个步骤
                        </span>
                      </div>
                      <div style={{ color: '#8c8c8c' }}>
                        创建人: {sop.author} | 更新时间: {formatDateTime(sop.updatedAt)}
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

