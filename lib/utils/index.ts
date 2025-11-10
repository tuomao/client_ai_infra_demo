// 工具函数

// 格式化日期时间
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// 格式化相对时间
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}天前`;
  if (hours > 0) return `${hours}小时前`;
  if (minutes > 0) return `${minutes}分钟前`;
  return '刚刚';
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

// 格式化数字（带千分位）
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

// 格式化百分比
export function formatPercent(num: number, decimals: number = 2): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

// 格式化持续时间（毫秒）
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(2)}分钟`;
  return `${(ms / 3600000).toFixed(2)}小时`;
}

// 生成随机ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 延迟函数
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 获取颜色根据严重程度
export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: '#ff4d4f',
    high: '#ff7a45',
    medium: '#ffa940',
    low: '#52c41a',
  };
  return colors[severity] || '#d9d9d9';
}

// 获取状态标签
export function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    pending: '待处理',
    analyzing: '分析中',
    resolved: '已解决',
    ignored: '已忽略',
    running: '运行中',
    passed: '通过',
    failed: '失败',
  };
  return statusMap[status] || status;
}

// 高亮搜索文本
export function highlightText(text: string, search: string): string {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// 解析错误堆栈
export function parseStackTrace(stack: string): Array<{
  file: string;
  line: number;
  column: number;
  function: string;
}> {
  const lines = stack.split('\n');
  const result = [];
  
  for (const line of lines) {
    const match = line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
    if (match) {
      result.push({
        function: match[1],
        file: match[2],
        line: parseInt(match[3]),
        column: parseInt(match[4]),
      });
    }
  }
  
  return result;
}

// 深度克隆
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// 防抖
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

