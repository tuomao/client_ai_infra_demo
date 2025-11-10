import { useState, useEffect } from 'react';
import { WhiteScreenIssue, APMData, AgentConfig, KnowledgeItem, SOPDocument } from '@/lib/types';

// 加载白屏问题数据
export function useWhiteScreenIssues() {
  const [data, setData] = useState<WhiteScreenIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/white-screen-data.json');
        const json = await response.json();
        setData(json.issues);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { data, loading, error };
}

// 根据ID获取白屏问题详情
export function useWhiteScreenIssue(id: string) {
  const [data, setData] = useState<WhiteScreenIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/white-screen-data.json');
        const json = await response.json();
        const issue = json.issues.find((item: WhiteScreenIssue) => item.id === id);
        setData(issue || null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadData();
    }
  }, [id]);

  return { data, loading, error };
}

// 加载APM数据
export function useAPMData() {
  const [data, setData] = useState<APMData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/apm-data.json');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { data, loading, error };
}

// 加载Agent配置
export function useAgents() {
  const [data, setData] = useState<AgentConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/agent-data.json');
        const json = await response.json();
        setData(json.agents);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { data, loading, error };
}

// 加载知识库数据
export function useKnowledge() {
  const [data, setData] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/knowledge-data.json');
        const json = await response.json();
        setData(json.items);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { data, loading, error };
}

// 加载SOP文档
export function useSOPDocuments() {
  const [data, setData] = useState<SOPDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/mock/sop-data.json');
        const json = await response.json();
        setData(json.documents);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return { data, loading, error };
}

// 模拟API延迟
export function useSimulateAPICall<T>(
  fetcher: () => Promise<T>,
  delay: number = 500
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        await new Promise(resolve => setTimeout(resolve, delay));
        const result = await fetcher();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetcher, delay]);

  return { data, loading, error };
}

