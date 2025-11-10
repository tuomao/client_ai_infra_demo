'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Row, 
  Col,
  Statistic,
  Modal,
  Input,
  Form,
  message,
  Badge,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function TestSuitePage() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [form] = Form.useForm();

  // 模拟数据
  const whiteScreenSuites = [
    { id: 1, name: '白屏基础测评集', caseCount: 156, status: 'active', updateTime: '2024-01-18 10:30' },
    { id: 2, name: '白屏边界场景测评集', caseCount: 89, status: 'active', updateTime: '2024-01-17 15:20' },
    { id: 3, name: '白屏性能测评集', caseCount: 67, status: 'archived', updateTime: '2024-01-15 09:10' },
  ];

  const crashSuites = [
    { id: 4, name: 'Crash基础测评集', caseCount: 234, status: 'active', updateTime: '2024-01-18 14:20' },
    { id: 5, name: 'Crash异常场景测评集', caseCount: 145, status: 'active', updateTime: '2024-01-16 11:30' },
    { id: 6, name: 'Crash兼容性测评集', caseCount: 98, status: 'active', updateTime: '2024-01-14 16:45' },
  ];

  const lagSuites = [
    { id: 7, name: '卡顿基础测评集', caseCount: 178, status: 'active', updateTime: '2024-01-18 09:15' },
    { id: 8, name: '卡顿性能测评集', caseCount: 112, status: 'active', updateTime: '2024-01-17 13:50' },
    { id: 9, name: '卡顿场景测评集', caseCount: 87, status: 'archived', updateTime: '2024-01-13 10:20' },
  ];

  const handleCreate = (category: string) => {
    setSelectedCategory(category);
    setCreateModalVisible(true);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      message.success(`${selectedCategory}测评集创建成功`);
      setCreateModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: '测评集名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <FileTextOutlined />
          <span style={{ fontWeight: 600 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '用例数量',
      dataIndex: 'caseCount',
      key: 'caseCount',
      width: 120,
      render: (count: number) => <Tag color="blue">{count} 个</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? '活跃' : '归档'} 
        />
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" size="small">
            查看
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '白屏': '#1890ff',
      'Crash': '#ff4d4f',
      '卡顿': '#faad14',
    };
    return colors[category] || '#1890ff';
  };

  const renderCategory = (title: string, data: any[], icon: string) => {
    const totalCases = data.reduce((sum, item) => sum + item.caseCount, 0);
    const activeSuites = data.filter(item => item.status === 'active').length;

    return (
      <div style={{ marginBottom: 32 }}>
        <Card
          size="small"
          style={{ marginBottom: 16 }}
          styles={{ body: { padding: '12px 16px' } }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: `${getCategoryColor(title)}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                  {title}测评集
                  <Tag style={{ marginLeft: 12 }} color={getCategoryColor(title)}>
                    {data.length} 个测评集
                  </Tag>
                </div>
                <Space size="large">
                  <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                    <CheckCircleOutlined style={{ marginRight: 4 }} />
                    活跃: {activeSuites}
                  </span>
                  <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                    <FileTextOutlined style={{ marginRight: 4 }} />
                    总用例: {totalCases}
                  </span>
                </Space>
              </div>
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => handleCreate(title)}>
              创建测评集
            </Button>
          </div>
        </Card>

        <Card>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Card>
      </div>
    );
  };

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题 */}
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>测评集管理</h1>
          <p style={{ color: '#8c8c8c' }}>
            管理白屏、Crash、卡顿等各类Agent测评集
          </p>
        </div>

        {/* 统计概览 */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总测评集"
                value={whiteScreenSuites.length + crashSuites.length + lagSuites.length}
                suffix="个"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总用例数"
                value={
                  [...whiteScreenSuites, ...crashSuites, ...lagSuites]
                    .reduce((sum, item) => sum + item.caseCount, 0)
                }
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="活跃测评集"
                value={
                  [...whiteScreenSuites, ...crashSuites, ...lagSuites]
                    .filter(item => item.status === 'active').length
                }
                suffix="个"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="归档测评集"
                value={
                  [...whiteScreenSuites, ...crashSuites, ...lagSuites]
                    .filter(item => item.status === 'archived').length
                }
                suffix="个"
                valueStyle={{ color: '#8c8c8c' }}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* 白屏测评集 */}
        {renderCategory('白屏', whiteScreenSuites, '⚪')}

        {/* Crash测评集 */}
        {renderCategory('Crash', crashSuites, '💥')}

        {/* 卡顿测评集 */}
        {renderCategory('卡顿', lagSuites, '⏱️')}
      </Space>

      {/* 创建测评集弹窗 */}
      <Modal
        title={`创建${selectedCategory}测评集`}
        open={createModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="测评集名称"
            name="name"
            rules={[{ required: true, message: '请输入测评集名称' }]}
          >
            <Input placeholder={`请输入${selectedCategory}测评集名称`} />
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
          >
            <Input.TextArea rows={4} placeholder="请输入测评集描述" />
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
}

