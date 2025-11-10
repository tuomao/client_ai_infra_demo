'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Progress, List, Tag, Space, Button, Alert } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  SyncOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

export default function PatrolPage() {
  const healthScore = 92;

  const checkItems = [
    {
      name: 'API健康检查',
      status: 'success',
      message: '所有API响应正常',
      lastCheck: '2分钟前',
    },
    {
      name: '性能指标检查',
      status: 'success',
      message: '页面加载时间在正常范围内',
      lastCheck: '5分钟前',
    },
    {
      name: '错误率监控',
      status: 'warning',
      message: '错误率略有上升（2.8%）',
      lastCheck: '3分钟前',
    },
    {
      name: '内存使用检查',
      status: 'success',
      message: '内存使用正常',
      lastCheck: '10分钟前',
    },
    {
      name: '崩溃率监控',
      status: 'success',
      message: '崩溃率稳定（1.2%）',
      lastCheck: '15分钟前',
    },
  ];

  const alerts = [
    {
      title: '错误率异常',
      description: '过去1小时错误率上升至2.8%，超过阈值2.5%',
      severity: 'warning',
      time: '10分钟前',
    },
  ];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>巡检Agent</h1>
          <p style={{ color: '#8c8c8c' }}>
            定期巡检应用健康状态，及时发现潜在问题
          </p>
        </div>

        <Card>
          <Row gutter={24}>
            <Col span={12}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 16 }}>系统健康度</div>
                <Progress
                  type="circle"
                  percent={healthScore}
                  strokeColor={healthScore >= 90 ? '#52c41a' : healthScore >= 70 ? '#faad14' : '#ff4d4f'}
                  width={180}
                  format={(percent) => (
                    <div>
                      <div style={{ fontSize: 36, fontWeight: 600 }}>{percent}</div>
                      <div style={{ fontSize: 14, color: '#8c8c8c' }}>健康度</div>
                    </div>
                  )}
                />
              </div>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Statistic
                  title="巡检项目"
                  value={5}
                  suffix="项"
                />
                <Statistic
                  title="通过项"
                  value={4}
                  suffix="项"
                  valueStyle={{ color: '#52c41a' }}
                />
                <Statistic
                  title="告警项"
                  value={1}
                  suffix="项"
                  valueStyle={{ color: '#faad14' }}
                />
                <Button type="primary" icon={<PlayCircleOutlined />} size="large">
                  立即巡检
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {alerts.length > 0 && (
          <Card title="当前告警" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {alerts.map((alert, index) => (
                <Alert
                  key={index}
                  message={alert.title}
                  description={
                    <div>
                      <p>{alert.description}</p>
                      <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: 12 }}>
                        {alert.time}
                      </div>
                    </div>
                  }
                  type={alert.severity as any}
                  showIcon
                  action={
                    <Button size="small">查看详情</Button>
                  }
                />
              ))}
            </Space>
          </Card>
        )}

        <Card title="巡检项目" bordered={false}>
          <List
            dataSource={checkItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item.status === 'success' ? (
                      <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                    ) : item.status === 'warning' ? (
                      <WarningOutlined style={{ fontSize: 24, color: '#faad14' }} />
                    ) : (
                      <CloseCircleOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
                    )
                  }
                  title={item.name}
                  description={
                    <div>
                      <div>{item.message}</div>
                      <div style={{ marginTop: 4, fontSize: 12, color: '#8c8c8c' }}>
                        最后检查: {item.lastCheck}
                      </div>
                    </div>
                  }
                />
                <Tag
                  color={item.status === 'success' ? 'green' : item.status === 'warning' ? 'orange' : 'red'}
                  icon={item.status === 'success' ? <CheckCircleOutlined /> : <WarningOutlined />}
                >
                  {item.status === 'success' ? '正常' : item.status === 'warning' ? '警告' : '异常'}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </MainLayout>
  );
}

