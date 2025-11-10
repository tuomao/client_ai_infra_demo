'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Space,
  Tag,
  Button,
  Row,
  Col,
  Badge,
  Input,
  Select,
  Modal,
  Descriptions,
  List,
  Tooltip,
  Divider,
  Typography,
} from 'antd';
import {
  ApiOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
  PlayCircleOutlined,
  SettingOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ApartmentOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Option } = Select;
const { Title } = Typography;

// 分类图标映射
const categoryIcons: Record<string, any> = {
  coding: <CodeOutlined />,
  'company-platform': <ApartmentOutlined />,
};

// 分类颜色映射
const categoryColors: Record<string, string> = {
  coding: '#1890ff',
  'company-platform': '#fa8c16',
};

export default function MCPServersPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('usage');
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState<any>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/mcp-servers-data.json');
        const json = await response.json();
        // 保留编码工具、公司内部平台两个分类，移除数据模块
        const filteredCategories = json.categories.filter((cat: any) => 
          ['coding', 'company-platform'].includes(cat.id)
        );
        setCategories(filteredCategories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFavorite = (serverId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(serverId)) {
      newFavorites.delete(serverId);
    } else {
      newFavorites.add(serverId);
    }
    setFavorites(newFavorites);
  };

  const showServerDetail = (server: any) => {
    setSelectedServer(server);
    setDetailVisible(true);
  };

  // 按分类组织服务器
  const getServersByCategory = () => {
    const result: Record<string, any[]> = {};
    
    categories.forEach(category => {
      let categoryServers = category.servers.filter((server: any) => {
        if (searchText && !server.name.toLowerCase().includes(searchText.toLowerCase()) &&
            !server.description.toLowerCase().includes(searchText.toLowerCase())) {
          return false;
        }
        return true;
      });

      // 排序
      if (sortBy === 'usage') {
        categoryServers.sort((a: any, b: any) => b.usage - a.usage);
      } else if (sortBy === 'favorites') {
        categoryServers.sort((a: any, b: any) => b.favorites - a.favorites);
      } else if (sortBy === 'name') {
        categoryServers.sort((a: any, b: any) => a.name.localeCompare(b.name));
      }

      if (categoryServers.length > 0 && (selectedCategory === 'all' || selectedCategory === category.id)) {
        result[category.id] = categoryServers;
      }
    });

    return result;
  };

  const serversByCategory = getServersByCategory();
  const totalServers = Object.values(serversByCategory).reduce((sum, servers) => sum + servers.length, 0);

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题 */}
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <ApiOutlined style={{ color: '#1890ff' }} />
            MCP服务器管理
          </h1>
          <p style={{ color: '#8c8c8c' }}>
            管理和监控所有Model Context Protocol (MCP) 服务器
          </p>
        </div>

        {/* 搜索和筛选 */}
        <Card variant="outlined">
          <Space size="middle" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space size="middle">
              <Space.Compact style={{ width: 300 }}>
                <Input
                  placeholder="搜索MCP服务..."
                  prefix={<SearchOutlined />}
                  allowClear
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Space.Compact>
              <Select
                style={{ width: 150 }}
                placeholder="分类筛选"
                value={selectedCategory}
                onChange={setSelectedCategory}
              >
                <Option value="all">
                  <Space>
                    <FilterOutlined />
                    全部分类
                  </Space>
                </Option>
                {categories.map(cat => (
                  <Option key={cat.id} value={cat.id}>
                    <Space>
                      {categoryIcons[cat.id]}
                      {cat.name}
                    </Space>
                  </Option>
                ))}
              </Select>
              <Select
                style={{ width: 150 }}
                placeholder="排序方式"
                value={sortBy}
                onChange={setSortBy}
              >
                <Option value="usage">
                  <Space>
                    <ThunderboltOutlined />
                    调用量
                  </Space>
                </Option>
                <Option value="favorites">
                  <Space>
                    <StarFilled />
                    收藏数
                  </Space>
                </Option>
                <Option value="name">
                  <Space>
                    <SortAscendingOutlined />
                    名称
                  </Space>
                </Option>
              </Select>
            </Space>
            <div style={{ color: '#8c8c8c', fontSize: 14 }}>
              找到 <strong style={{ color: '#1890ff' }}>{totalServers}</strong> 个服务
            </div>
          </Space>
        </Card>

        {/* 分类展示（不折叠） */}
        {categories.map(category => {
          const categoryServers = serversByCategory[category.id] || [];
          if (categoryServers.length === 0) return null;

          return (
            <div key={category.id}>
              {/* 分类标题 */}
              <Card
                size="small"
                style={{ marginBottom: 16 }}
                styles={{ body: { padding: '12px 16px' } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: `${categoryColors[category.id]}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      color: categoryColors[category.id],
                    }}
                  >
                    {categoryIcons[category.id]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                      {category.name}
                      <Tag style={{ marginLeft: 12 }} color={categoryColors[category.id]}>
                        {categoryServers.length} 个服务
                      </Tag>
                    </div>
                    <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                      {category.description}
                    </div>
                  </div>
                </div>
              </Card>

              {/* 服务卡片 */}
              <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
                {categoryServers.map((server: any) => (
                  <Col span={8} key={server.id}>
                    <Card
                      hoverable
                      style={{ height: '100%', position: 'relative' }}
                      styles={{ body: { padding: 16 } }}
                    >
                      {/* 收藏按钮 */}
                      <Button
                        type="text"
                        size="small"
                        icon={
                          favorites.has(server.id) ? (
                            <StarFilled style={{ color: '#faad14' }} />
                          ) : (
                            <StarOutlined />
                          )
                        }
                        onClick={() => handleFavorite(server.id)}
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                        }}
                      />

                      <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        {/* 图标和标题 */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <div
                            style={{
                              fontSize: 32,
                              width: 48,
                              height: 48,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#f5f5f5',
                              borderRadius: 8,
                            }}
                          >
                            {server.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h3
                              style={{
                                margin: 0,
                                fontSize: 15,
                                fontWeight: 600,
                                marginBottom: 4,
                                cursor: 'pointer',
                              }}
                              onClick={() => showServerDetail(server)}
                            >
                              {server.name}
                            </h3>
                            <Space size={4}>
                              <Badge status={server.status === 'active' ? 'success' : 'default'} />
                              <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                                {server.version}
                              </span>
                              <Divider type="vertical" />
                              <Tag color="blue">
                                {server.provider}
                              </Tag>
                            </Space>
                          </div>
                        </div>

                        {/* 描述 */}
                        <p
                          style={{
                            fontSize: 13,
                            color: '#595959',
                            margin: 0,
                            minHeight: 40,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {server.description}
                        </p>

                        {/* 能力标签 */}
                        <div style={{ minHeight: 50 }}>
                          <Space size={4} wrap>
                            {server.capabilities.slice(0, 4).map((cap: string) => (
                              <Tag key={cap} style={{ fontSize: 11, marginBottom: 4 }}>
                                {cap}
                              </Tag>
                            ))}
                            {server.capabilities.length > 4 && (
                              <Tag style={{ fontSize: 11 }}>
                                +{server.capabilities.length - 4}
                              </Tag>
                            )}
                          </Space>
                        </div>

                        {/* 统计信息 */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: 12,
                            borderTop: '1px solid #f0f0f0',
                          }}
                        >
                          <Tooltip title="调用量">
                            <Space size={4}>
                              <ThunderboltOutlined style={{ color: '#8c8c8c' }} />
                              <span style={{ fontSize: 12, color: '#595959' }}>
                                {server.usage.toLocaleString()}
                              </span>
                            </Space>
                          </Tooltip>
                          <Tooltip title="收藏数">
                            <Space size={4}>
                              <StarOutlined style={{ color: '#8c8c8c' }} />
                              <span style={{ fontSize: 12, color: '#595959' }}>
                                {server.favorites}
                              </span>
                            </Space>
                          </Tooltip>
                        </div>

                        {/* 操作按钮 */}
                        <Space style={{ width: '100%' }} size="small">
                          <Button
                            type="primary"
                            size="small"
                            icon={<PlayCircleOutlined />}
                            style={{ flex: 1 }}
                            disabled={server.status === 'active'}
                          >
                            {server.status === 'active' ? '运行中' : '启动'}
                          </Button>
                          <Button
                            size="small"
                            icon={<SettingOutlined />}
                            onClick={() => showServerDetail(server)}
                          >
                            配置
                          </Button>
                          <Button
                            size="small"
                            icon={<FileTextOutlined />}
                            onClick={() => window.open(server.documentation, '_blank')}
                          >
                            文档
                          </Button>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* APM数据展示 */}
              {category.id === 'company-platform' && categoryServers.some((s: any) => s.id === 'mcp-apm') && (
                <Card
                  size="small"
                  style={{ marginBottom: 32 }}
                  styles={{ body: { padding: '12px 16px' } }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: `${categoryColors[category.id]}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        color: categoryColors[category.id],
                      }}
                    >
                      <ApiOutlined />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                        APM数据
                        <Tag style={{ marginLeft: 12 }} color={categoryColors[category.id]}>
                          {categoryServers.find((s: any) => s.id === 'mcp-apm')?.subServices?.length || 0} 个数据源
                        </Tag>
                      </div>
                      <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                        APM监控平台提供的各类数据源
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              {category.id === 'company-platform' && categoryServers.some((s: any) => s.id === 'mcp-apm') && (
                <Card
                  size="small"
                  style={{ marginBottom: 32 }}
                >
                  <Row gutter={[12, 12]}>
                    {categoryServers
                      .find((s: any) => s.id === 'mcp-apm')
                      ?.subServices.map((subService: any, index: number) => (
                        <Col span={6} key={index}>
                          <Card
                            size="small"
                            hoverable
                            style={{ background: '#fafafa' }}
                            styles={{ body: { padding: 12 } }}
                          >
                            <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 13 }}>
                              {subService.name}
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                color: '#8c8c8c',
                                marginBottom: 8,
                                minHeight: 32,
                              }}
                            >
                              {subService.description}
                            </div>
                            <Space size={4} wrap>
                              {subService.capabilities.slice(0, 2).map((cap: string) => (
                                <Tag key={cap} style={{ fontSize: 11 }}>
                                  {cap}
                                </Tag>
                              ))}
                              {subService.capabilities.length > 2 && (
                                <Tag style={{ fontSize: 11 }}>
                                  +{subService.capabilities.length - 2}
                                </Tag>
                              )}
                            </Space>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </Card>
              )}
            </div>
          );
        })}
      </Space>

      {/* 服务详情弹窗 */}
      <Modal
        title={
          <Space>
            <span style={{ fontSize: 24 }}>{selectedServer?.icon}</span>
            <span>{selectedServer?.name}</span>
          </Space>
        }
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setDetailVisible(false)}>
            关闭
          </Button>,
          <Button key="config" type="primary" icon={<SettingOutlined />}>
            配置服务
          </Button>,
        ]}
      >
        {selectedServer && (
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="服务ID">{selectedServer.id}</Descriptions.Item>
              <Descriptions.Item label="版本">{selectedServer.version}</Descriptions.Item>
              <Descriptions.Item label="提供方">{selectedServer.provider}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Badge
                  status={selectedServer.status === 'active' ? 'success' : 'default'}
                  text={selectedServer.status === 'active' ? '运行中' : '已停止'}
                />
              </Descriptions.Item>
              <Descriptions.Item label="调用量" span={2}>
                {selectedServer.usage.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
                {selectedServer.description}
              </Descriptions.Item>
            </Descriptions>

            <div>
              <h4 style={{ marginBottom: 12 }}>能力列表</h4>
              <Space wrap>
                {selectedServer.capabilities.map((cap: string) => (
                  <Tag key={cap} color="blue">
                    {cap}
                  </Tag>
                ))}
              </Space>
            </div>

            <div>
              <h4 style={{ marginBottom: 12 }}>标签</h4>
              <Space wrap>
                {selectedServer.tags.map((tag: string) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>
            </div>

            {selectedServer.subServices && (
              <div>
                <h4 style={{ marginBottom: 12 }}>子服务</h4>
                <List
                  dataSource={selectedServer.subServices}
                  renderItem={(subService: any) => (
                    <List.Item>
                      <List.Item.Meta
                        title={subService.name}
                        description={
                          <Space direction="vertical" size="small">
                            <div>{subService.description}</div>
                            <Space wrap size={4}>
                              {subService.capabilities.map((cap: string) => (
                                <Tag key={cap}>
                                  {cap}
                                </Tag>
                              ))}
                            </Space>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            )}

            <div>
              <Button
                type="link"
                icon={<FileTextOutlined />}
                href={selectedServer.documentation}
                target="_blank"
              >
                查看完整文档
              </Button>
            </div>
          </Space>
        )}
      </Modal>
    </MainLayout>
  );
}



