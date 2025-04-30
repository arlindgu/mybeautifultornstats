// types/logs.d.ts
export interface LogEntry {
    log: number;
    title: string;
    timestamp: number;
    category: string;
    data: Record<string, any>;
    params: Record<string, any>;
  }