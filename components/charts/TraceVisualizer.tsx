'use client';

import React from 'react';
import { Card, Timeline, Badge, Tag } from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { formatDateTime } from '@/lib/utils';
import type { TraceData } from '@/lib/types';

interface TraceVisualizerProps {
  traces: TraceData[];
}

export default function TraceVisualizer({ traces }: TraceVisualizerProps) {
  const renderTraceItem = (trace: TraceData, level: number = 0) => {
    const typeColorMap: Record<string, string> = {
      navigation: '#1890ff',
      api: '#52c41a',
      render: '#fa8c16',
      custom: '#722ed1',
    };

    const typeTextMap: Record<string, string> = {
      navigation: '导航',
      api: 'API',
      render: '渲染',
      custom: '自定义',
    };

    return (
      <div key={trace.id} style={{ marginLeft: level * 20 }}>
        <div style={{
          padding: '12px 16px',
          background: '#fafafa',
          borderRadius: 6,
          marginBottom: 8,
          border: '1px solid #f0f0f0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{trace.name}</div>
              <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                <Tag color={typeColorMap[trace.type]} style={{ marginRight: 8 }}>
                  {typeTextMap[trace.type]}
                </Tag>
                <span>时间: {new Date(trace.timestamp).toLocaleTimeString()}</span>
                <span style={{ marginLeft: 16 }}>耗时: {trace.duration}ms</span>
              </div>
              {trace.metadata && (
                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                  {trace.metadata.error && (
                    <Tag color="red">错误: {trace.metadata.error}</Tag>
                  )}
                  {trace.metadata.status && (
                    <span>状态: {trace.metadata.status}</span>
                  )}
                  {trace.metadata.size && (
                    <span style={{ marginLeft: 16 }}>大小: {(trace.metadata.size / 1024).toFixed(2)}KB</span>
                  )}
                </div>
              )}
            </div>
            <div style={{
              width: 200,
              height: 8,
              background: '#f0f0f0',
              borderRadius: 4,
              position: 'relative',
              marginLeft: 16,
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: trace.metadata?.error ? '#ff4d4f' : typeColorMap[trace.type],
                borderRadius: 4,
              }} />
            </div>
          </div>
        </div>
        {trace.children && trace.children.map(child => renderTraceItem(child, level + 1))}
      </div>
    );
  };

  return (
    <Card title="Trace链路追踪" bordered={false}>
      <div style={{ position: 'relative' }}>
        <div style={{ marginBottom: 16, padding: 12, background: '#f6ffed', borderRadius: 6, border: '1px solid #b7eb8f' }}>
          <div style={{ fontSize: 12, color: '#52c41a' }}>
            <strong>提示:</strong> 时间线展示了请求的完整链路，可以帮助定位性能瓶颈和错误位置
          </div>
        </div>
        {traces.map(trace => renderTraceItem(trace))}
      </div>
    </Card>
  );
}

