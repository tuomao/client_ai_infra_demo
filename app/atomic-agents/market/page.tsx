'use client';

import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Button, Space, Rate, Input, Select, Tabs, Row, Col, Badge, Statistic, Modal } from 'antd';
import {
  DownloadOutlined,
  StarOutlined,
  SearchOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  FireOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  PlusOutlined,
  CodeOutlined,
  SettingOutlined,
  BulbOutlined,
  ClusterOutlined,
  BranchesOutlined,
  NodeIndexOutlined,
  PlayCircleOutlined,
  BugOutlined,
  SafetyOutlined,
  ExperimentOutlined,
  DashboardOutlined,
  ToolOutlined,
  FileSearchOutlined,
  ApiOutlined,
  BellOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Option } = Select;

// 根据Agent名称返回对应的图标
const getAgentIcon = (agentName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    '聚类分析Agent': <ClusterOutlined />,
    '变更分析Agent': <BranchesOutlined />,
    '复现路径推理Agent': <NodeIndexOutlined />,
    'UI自动执行Agent': <PlayCircleOutlined />,
    '性能分析Agent': <DashboardOutlined />,
    '安全扫描Agent': <SafetyOutlined />,
    '测试用例生成Agent': <ExperimentOutlined />,
    '代码修复生成Agent': <ToolOutlined />,
    '日志分析Agent': <FileSearchOutlined />,
    'API调用Agent': <ApiOutlined />,
    '错误解析Agent': <BugOutlined />,
    '代码搜索Agent': <SearchOutlined />,
    '代码读取Agent': <CodeOutlined />,
    '告警分析Agent': <BellOutlined />,
  };
  
  return iconMap[agentName] || <RobotOutlined />;
};

const categoryColors: Record<string, string> = {
  '性能优化': 'blue',
  '安全': 'red',
  '测试': 'green',
  '质量': 'orange',
  '监控': 'purple',
};

const categoryGradients: Record<string, string> = {
  '性能优化': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  '安全': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  '测试': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  '质量': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  '监控': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};

export default function AtomicMarketPage() {
  const [marketplace, setMarketplace] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('downloads');
  const [searchText, setSearchText] = useState<string>('');
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/atomic-agent-data.json');
        const json = await response.json();
        setMarketplace(json.marketplace);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 过滤和排序
  const filteredData = marketplace
    .filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase()) &&
          !item.description.toLowerCase().includes(searchText.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // latest
    });

  const showDetail = (item: any) => {
    setSelectedAgent(item);
    setDetailVisible(true);
  };

  const handleAdd = (item: any) => {
    Modal.success({
      title: '添加成功',
      content: `${item.name} 已成功添加到你的工作空间`,
    });
  };


  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题和统计 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <RobotOutlined style={{ color: '#1890ff' }} />
              Agent应用市场
            </h1>
            <p style={{ color: '#8c8c8c', fontSize: 14, marginBottom: 24 }}>
              发现和使用社区贡献的优质Agent应用，加速你的开发流程
            </p>
          </div>
          <Button 
            type="primary" 
            size="large"
            icon={<RobotOutlined />}
            onClick={() => setCreateModalVisible(true)}
            style={{ marginTop: 8 }}
          >
            创建Agent
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <Card variant="outlined">
          <Space size="middle" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space size="middle">
              <Space.Compact style={{ width: 360 }}>
                <Input
                  placeholder="搜索Agent名称或描述..."
                  prefix={<SearchOutlined />}
                  allowClear
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Space.Compact>
              <Select 
                style={{ width: 150 }} 
                value={category}
                onChange={setCategory}
              >
                <Option value="all">全部分类</Option>
                <Option value="性能优化">性能优化</Option>
                <Option value="安全">安全</Option>
                <Option value="测试">测试</Option>
                <Option value="质量">质量</Option>
                <Option value="监控">监控</Option>
              </Select>
              <Select 
                style={{ width: 150 }} 
                value={sortBy}
                onChange={setSortBy}
              >
                <Option value="downloads">
                  <DownloadOutlined /> 下载量
                </Option>
                <Option value="rating">
                  <StarOutlined /> 评分
                </Option>
                <Option value="latest">
                  <ClockCircleOutlined /> 最新
                </Option>
              </Select>
            </Space>
            <div style={{ color: '#8c8c8c', fontSize: 14 }}>
              找到 <strong style={{ color: '#1890ff' }}>{filteredData.length}</strong> 个应用
            </div>
          </Space>
        </Card>

        {/* Agent卡片列表 */}
        <List
          loading={loading}
          grid={{ gutter: [16, 16], xs: 5, sm: 5, md: 5, lg: 5, xl: 5, xxl: 5 }}
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item style={{ display: 'flex' }}>
                <Card
                  hoverable
                  style={{ 
                    width: '100%', // 确保宽度一致
                    minHeight: 280, // 改为最小高度，允许内容撑开
                    borderRadius: 8, 
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  styles={{ body: { padding: 16, height: '100%', display: 'flex', flexDirection: 'column' } }}
                >
                  <div style={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column'
                  }}>
                    {/* 标题和分类区域 - 固定高度 */}
                    <div style={{ minHeight: 50 }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 12,
                        marginBottom: 8
                      }}>
                        {/* 图标 */}
                        <div style={{
                          width: 40,
                          height: 40,
                          background: categoryGradients[item.category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 20,
                          flexShrink: 0
                        }}>
                          {getAgentIcon(item.name)}
                        </div>
                        
                        {/* 标题和热门标签 */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <h3 style={{ 
                              margin: 0, 
                              fontSize: 16, 
                              fontWeight: 600,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              flex: 1
                            }}>
                              {item.name}
                            </h3>
                            {item.downloads > 2000 && (
                              <div style={{
                                background: '#ff4d4f',
                                color: '#fff',
                                padding: '2px 6px',
                                borderRadius: 4,
                                fontSize: 10,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                flexShrink: 0
                              }}>
                                <FireOutlined /> 热门
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Tag color={categoryColors[item.category] || 'blue'}>
                        {item.category}
                      </Tag>
                    </div>

                    {/* 描述区域 - 允许换行 */}
                    <div style={{ 
                      margin: '8px 0',
                      flex: 1, // 占用剩余空间
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}>
                      <p style={{ 
                        color: '#595959', 
                        fontSize: 13, 
                        margin: 0,
                        lineHeight: '20px',
                        wordBreak: 'break-word',
                        whiteSpace: 'normal'
                      }}>
                        {item.description}
                      </p>
                    </div>

                    {/* 标签区域 - 自适应高度 */}
                    <div style={{ 
                      minHeight: 28,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      gap: 4,
                      marginBottom: 8
                    }}>
                      {item.tags?.slice(0, 3).map((tag: string) => (
                        <Tag key={tag}>
                          {tag}
                        </Tag>
                      ))}
                    </div>

                    {/* 底部信息区域 */}
                    <div style={{ marginTop: 'auto' }}>
                      {/* 评分和下载 */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        paddingTop: 8,
                        borderTop: '1px solid #f0f0f0',
                        marginBottom: 6,
                      }}>
                        <Space size={4}>
                          <Rate disabled value={item.rating} style={{ fontSize: 12 }} />
                          <span style={{ fontSize: 12, color: '#8c8c8c' }}>{item.rating}</span>
                        </Space>
                        <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                          <DownloadOutlined /> {item.downloads}
                        </span>
                      </div>

                      {/* 作者信息 */}
                      <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 8 }}>
                        作者: <strong>{item.author}</strong>
                      </div>

                      {/* 操作按钮 */}
                      <Space style={{ width: '100%' }} size="small">
                        <Button 
                          type="primary" 
                          size="small" 
                          icon={<DownloadOutlined />}
                          style={{ flex: 1 }}
                          onClick={() => handleAdd(item)}
                        >
                          添加
                        </Button>
                        <Button 
                          size="small" 
                          icon={<EyeOutlined />}
                          onClick={() => showDetail(item)}
                        >
                          详情
                        </Button>
                      </Space>
                    </div>
                  </div>
                </Card>
            </List.Item>
          )}
        />
      </Space>

      {/* 详情弹窗 */}
      <Modal
        title={
          <Space>
            <RobotOutlined style={{ color: '#1890ff' }} />
            {selectedAgent?.name}
          </Space>
        }
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setDetailVisible(false)}>
            取消
          </Button>,
          <Button 
            key="add" 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={() => {
              handleAdd(selectedAgent);
              setDetailVisible(false);
            }}
          >
            添加应用
          </Button>,
        ]}
      >
        {selectedAgent && (
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Space>
                <Tag color={categoryColors[selectedAgent.category]}>
                  {selectedAgent.category}
                </Tag>
              </Space>
              <p style={{ marginTop: 12, fontSize: 14 }}>
                {selectedAgent.description}
              </p>
            </div>

            <Row gutter={16}>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="评分" 
                    value={selectedAgent.rating} 
                    prefix={<StarOutlined />}
                    suffix="/ 5.0"
                    valueStyle={{ fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="下载量" 
                    value={selectedAgent.downloads} 
                    prefix={<DownloadOutlined />}
                    valueStyle={{ fontSize: 20 }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic 
                    title="使用原子Agent" 
                    value={selectedAgent.atomicAgents?.length || 0} 
                    suffix="个"
                    valueStyle={{ fontSize: 20 }}
                  />
                </Card>
              </Col>
            </Row>

            <div>
              <h4 style={{ marginBottom: 8 }}>标签</h4>
              <Space wrap>
                {selectedAgent.tags?.map((tag: string) => (
                  <Tag key={tag} color="blue">{tag}</Tag>
                ))}
              </Space>
            </div>

            <div>
              <h4 style={{ marginBottom: 8 }}>包含的原子Agent</h4>
              <Space wrap>
                {selectedAgent.atomicAgents?.map((agentId: string) => (
                  <Tag key={agentId} icon={<ThunderboltOutlined />}>
                    {agentId}
                  </Tag>
                ))}
              </Space>
            </div>

            <div>
              <h4 style={{ marginBottom: 8 }}>作者信息</h4>
              <p style={{ color: '#595959' }}>{selectedAgent.author}</p>
            </div>
          </Space>
        )}
      </Modal>

      {/* 创建Agent弹窗 */}
      <Modal
        title={
          <Space>
            <PlusOutlined style={{ color: '#1890ff' }} />
            创建应用
          </Space>
        }
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        width={800}
        footer={null}
        centered
      >
        <div style={{ padding: '20px 0' }}>
          <p style={{ color: '#8c8c8c', marginBottom: 32, fontSize: 14 }}>
            构建智能体应用，连接知识、数据与服务，强大的RAG、MCP、插件、
            记忆及组件能力，适配多种模型，满足于智能助理需求、对话场景。
          </p>
          
          <Row gutter={[24, 24]}>
            {/* 智能体应用 */}
            <Col span={8}>
              <Card
                hoverable
                style={{ 
                  height: 200,
                  border: '2px solid #f0f0f0',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                styles={{ body: { padding: 24, textAlign: 'center' } }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1890ff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => {
                  Modal.info({
                    title: '创建智能体应用',
                    content: '智能体应用创建功能开发中...',
                  });
                }}
              >
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#fff',
                  fontSize: 24
                }}>
                  <RobotOutlined />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>
                  智能体应用
                </h3>
                <p style={{ color: '#8c8c8c', fontSize: 13, margin: 0, lineHeight: 1.4 }}>
                  构建智能体应用，连接知识、插件等
                </p>
              </Card>
            </Col>

            {/* 工作流应用 */}
            <Col span={8}>
              <Card
                hoverable
                style={{ 
                  height: 200,
                  border: '2px solid #f0f0f0',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                styles={{ body: { padding: 24, textAlign: 'center' } }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1890ff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => {
                  Modal.info({
                    title: '创建工作流应用',
                    content: '工作流应用创建功能开发中...',
                  });
                }}
              >
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#fff',
                  fontSize: 24
                }}>
                  <SettingOutlined />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>
                  工作流应用
                </h3>
                <p style={{ color: '#8c8c8c', fontSize: 13, margin: 0, lineHeight: 1.4 }}>
                  通过拖拽可视化编排工作流
                </p>
              </Card>
            </Col>

            {/* 高代码应用 */}
            <Col span={8}>
              <Card
                hoverable
                style={{ 
                  height: 200,
                  border: '2px solid #f0f0f0',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                styles={{ body: { padding: 24, textAlign: 'center' } }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1890ff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => {
                  Modal.info({
                    title: '创建高代码应用',
                    content: '高代码应用创建功能开发中...',
                  });
                }}
              >
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#fff',
                  fontSize: 24
                }}>
                  <CodeOutlined />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>
                  高代码应用
                </h3>
                <p style={{ color: '#8c8c8c', fontSize: 13, margin: 0, lineHeight: 1.4 }}>
                  高代码开发和云上托管的应用
                </p>
              </Card>
            </Col>
          </Row>

          <div style={{ 
            textAlign: 'center', 
            marginTop: 32, 
            padding: '16px 0',
            borderTop: '1px solid #f0f0f0',
            color: '#8c8c8c',
            fontSize: 13
          }}>
            请填写应用信息并选择模板
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}









