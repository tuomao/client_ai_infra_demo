'use client';

import React, { useState } from 'react';
import { Card, Avatar, Input, Button, Space, Divider } from 'antd';
import {
  UserOutlined,
  RobotOutlined,
  SendOutlined,
} from '@ant-design/icons';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  title?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
}

export default function ChatInterface({
  title = 'AI分析助手',
  initialMessages = [],
  onSendMessage,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    if (onSendMessage) {
      onSendMessage(input);
    }

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '我正在分析您的问题，请稍候...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <Card title={title} bordered={false}>
      <div style={{
        height: 400,
        overflowY: 'auto',
        marginBottom: 16,
        padding: 16,
        background: '#fafafa',
        borderRadius: 6,
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#8c8c8c', paddingTop: 100 }}>
            <RobotOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <p>开始与AI助手对话，获取问题分析和建议</p>
          </div>
        ) : (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: 12,
                  maxWidth: '70%',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                }}>
                  <Avatar
                    icon={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                    style={{
                      background: message.role === 'user' ? '#1890ff' : '#52c41a',
                    }}
                  />
                  <div style={{
                    background: message.role === 'user' ? '#1890ff' : '#fff',
                    color: message.role === 'user' ? '#fff' : '#000',
                    padding: '12px 16px',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
                    <div style={{
                      fontSize: 12,
                      opacity: 0.7,
                      marginTop: 8,
                    }}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Space>
        )}
      </div>

      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="输入您的问题或指令..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          发送
        </Button>
      </Space.Compact>
    </Card>
  );
}

