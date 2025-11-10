'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Drawer,
  Descriptions,
  Input,
  Checkbox,
  Form,
  message,
  Typography,
  Divider,
} from 'antd';
import {
  ThunderboltOutlined,
  UserOutlined,
  ApiOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text, Paragraph } = Typography;

// 可选的用户信息字段（基本信息userId和userName始终返回）
const USER_INFO_FIELDS = [
  { key: 'isNewUser', label: '是否新用户', description: '是否为首次使用的新用户' },
  { key: 'deviceType', label: '设备类型', description: '用户使用的设备类型（iOS/Android/Web等）' },
  { key: 'version', label: '版本', description: '应用版本号' },
  { key: 'isTeenMode', label: '是否青少年模式', description: '是否开启青少年模式' },
];

export default function MCPToolsPage() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 监听drawerVisible变化
  useEffect(() => {
    console.log('drawerVisible状态变化:', drawerVisible);
    console.log('selectedTool:', selectedTool);
  }, [drawerVisible, selectedTool]);

  const tools = [
    {
      key: '1',
      name: 'read_file',
      description: '读取文件内容',
      server: 'Filesystem MCP',
      usage: 234,
      avgTime: '25ms',
    },
    {
      key: '2',
      name: 'write_file',
      description: '写入文件内容',
      server: 'Filesystem MCP',
      usage: 123,
      avgTime: '35ms',
    },
    {
      key: '3',
      name: 'search_files',
      description: '搜索文件内容',
      server: 'Filesystem MCP',
      usage: 456,
      avgTime: '150ms',
    },
    {
      key: '4',
      name: 'git_log',
      description: '查看Git提交历史',
      server: 'Git MCP',
      usage: 234,
      avgTime: '120ms',
    },
    {
      key: '5',
      name: 'getUserInfo',
      description: '获取用户信息',
      server: 'Yunxiao MCP',
      usage: 567,
      avgTime: '80ms',
    },
  ];

  // 处理工具点击
  const handleToolClick = (tool: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('点击工具:', tool);
    console.log('当前drawerVisible状态:', drawerVisible);
    
    if (tool && tool.name === 'getUserInfo') {
      console.log('准备打开getUserInfo弹窗');
      setSelectedTool(tool);
      setDrawerVisible(true);
      form.resetFields();
      setResult(null);
      console.log('已设置drawerVisible为true');
    } else {
      message.info('该工具暂未实现');
    }
  };

  // 调用getUserInfo
  const handleGetUserInfo = async (values: any) => {
    setLoading(true);
    try {
      const { userId, fields } = values;
      
      // 构建请求参数
      const params: any = { userId };
      
      // 如果选择了字段，添加到参数中
      if (fields && fields.length > 0) {
        params.fields = fields;
      }

      // 模拟MCP调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟返回数据
      const mockResult: any = {
        userId,
        userName: '测试用户',
      };

      // 根据选择的字段添加相应数据
      if (fields) {
        if (fields.includes('isNewUser')) {
          mockResult.isNewUser = false;
        }
        if (fields.includes('deviceType')) {
          mockResult.deviceType = 'iOS';
        }
        if (fields.includes('version')) {
          mockResult.version = '10.2.0';
        }
        if (fields.includes('isTeenMode')) {
          mockResult.isTeenMode = false;
        }
      }

      setResult(mockResult);
      message.success('获取用户信息成功');
    } catch (error) {
      message.error('获取用户信息失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '工具名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <Space>
          {name === 'getUserInfo' ? (
            <UserOutlined style={{ color: '#1890ff' }} />
          ) : (
            <ThunderboltOutlined style={{ color: '#1890ff' }} />
          )}
          <span style={{ fontWeight: 500 }}>{name}</span>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '所属服务器',
      dataIndex: 'server',
      key: 'server',
      render: (server: string) => <Tag color="blue">{server}</Tag>,
    },
    {
      title: '调用次数',
      dataIndex: 'usage',
      key: 'usage',
      sorter: (a: any, b: any) => a.usage - b.usage,
    },
    {
      title: '平均耗时',
      dataIndex: 'avgTime',
      key: 'avgTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => {
        const isGetUserInfo = record?.name === 'getUserInfo';
        return (
          <Button
            type="link"
            size="small"
            onClick={(e) => {
              console.log('按钮被点击，record:', record);
              handleToolClick(record, e);
            }}
            style={{ padding: 0 }}
          >
            {isGetUserInfo ? '获取用户信息' : '测试调用'}
          </Button>
        );
      },
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>MCP工具</h1>
        <p style={{ color: '#8c8c8c', marginBottom: 24 }}>
          MCP服务器提供的各类工具函数
        </p>

        <Card>
          <Table 
            columns={columns} 
            dataSource={tools}
            rowKey="key"
            pagination={false}
          />
        </Card>
        
        {/* 临时测试按钮 */}
        <div style={{ marginTop: 16 }}>
          <Button 
            type="primary" 
            onClick={() => {
              console.log('测试按钮点击');
              const testTool = tools.find(t => t.name === 'getUserInfo');
              if (testTool) {
                setSelectedTool(testTool);
                setDrawerVisible(true);
                console.log('测试：已设置drawerVisible为true');
              }
            }}
          >
            测试打开getUserInfo弹窗
          </Button>
        </div>
      </div>

      {/* getUserInfo 半层弹窗 */}
      <Drawer
        title={
          <Space>
            <ApiOutlined style={{ color: '#1890ff', fontSize: 20 }} />
            <span>MCP协议详情 - getUserInfo</span>
          </Space>
        }
        open={drawerVisible}
        onClose={() => {
          console.log('关闭Drawer');
          setDrawerVisible(false);
          setResult(null);
        }}
        width={720}
        placement="right"
        destroyOnClose={false}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* MCP协议信息 */}
          <div>
            <Title level={4}>
              <ApiOutlined style={{ marginRight: 8 }} />
              MCP协议信息
            </Title>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="工具名称">getUserInfo</Descriptions.Item>
              <Descriptions.Item label="所属服务器">Yunxiao MCP</Descriptions.Item>
              <Descriptions.Item label="描述">获取用户信息，支持按需返回字段</Descriptions.Item>
              <Descriptions.Item label="调用次数">{selectedTool?.usage || 0}</Descriptions.Item>
              <Descriptions.Item label="平均耗时">{selectedTool?.avgTime || '80ms'}</Descriptions.Item>
            </Descriptions>
          </div>

          <Divider />

          {/* 参数配置 */}
          <div>
            <Title level={4}>参数配置</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleGetUserInfo}
            >
              <Form.Item
                name="userId"
                label="用户ID"
                rules={[{ required: true, message: '请输入用户ID' }]}
              >
                <Input
                  placeholder="请输入用户ID"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="fields"
                label="返回字段（可选，不选则只返回基本信息）"
                tooltip="基本信息包含userId和userName，选择其他字段后会在返回结果中包含"
              >
                <Checkbox.Group style={{ width: '100%' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {USER_INFO_FIELDS.map(field => (
                      <Checkbox key={field.key} value={field.key}>
                        <Space direction="vertical" size={0}>
                          <Text strong>{field.label}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {field.description}
                          </Text>
                        </Space>
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<ApiOutlined />}
                  block
                >
                  调用getUserInfo
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* 返回结果 */}
          {result && (
            <>
              <Divider />
              <div>
                <Title level={4}>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  返回结果
                </Title>
                <Card>
                  <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '16px', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    <code>{JSON.stringify(result, null, 2)}</code>
                  </pre>
                </Card>
                <div style={{ marginTop: 16 }}>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="用户ID">{result.userId}</Descriptions.Item>
                    <Descriptions.Item label="用户名">{result.userName}</Descriptions.Item>
                    {result.isNewUser !== undefined && (
                      <Descriptions.Item label="是否新用户">
                        {result.isNewUser ? '是' : '否'}
                      </Descriptions.Item>
                    )}
                    {result.deviceType && (
                      <Descriptions.Item label="设备类型">{result.deviceType}</Descriptions.Item>
                    )}
                    {result.version && (
                      <Descriptions.Item label="版本">{result.version}</Descriptions.Item>
                    )}
                    {result.isTeenMode !== undefined && (
                      <Descriptions.Item label="是否青少年模式">
                        {result.isTeenMode ? '是' : '否'}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </div>
              </div>
            </>
          )}

          {/* MCP协议说明 */}
          <Divider />
          <div>
            <Title level={4}>协议说明</Title>
            <Paragraph>
              <Text strong>getUserInfo</Text> 是一个MCP工具，用于获取用户信息。
            </Paragraph>
            <Paragraph>
              <Text strong>基本信息：</Text> 始终返回 userId 和 userName，只需要传入 userId 参数。
            </Paragraph>
            <Paragraph>
              <Text strong>扩展字段：</Text> 通过 fields 参数指定需要返回的字段，支持以下字段：
              <ul>
                {USER_INFO_FIELDS.map(field => (
                  <li key={field.key}>
                    <Text code>{field.key}</Text>: {field.description}
                  </li>
                ))}
              </ul>
            </Paragraph>
            <Paragraph>
              <Text strong>调用示例：</Text>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginTop: '8px'
              }}>
                <code>{`// 只获取基本信息
getUserInfo({ userId: "123456" })
// 返回: { userId: "123456", userName: "用户名" }

// 获取扩展字段
getUserInfo({ 
  userId: "123456",
  fields: ["isNewUser", "deviceType", "version"]
})
// 返回: { 
//   userId: "123456", 
//   userName: "用户名",
//   isNewUser: false,
//   deviceType: "iOS",
//   version: "10.2.0"
// }`}</code>
              </pre>
            </Paragraph>
          </div>
        </Space>
      </Drawer>
    </MainLayout>
  );
}



