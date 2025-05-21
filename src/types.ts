// Application state types
export type AppState = 'idle' | 'running' | 'paused' | 'stopped' | 'completed';

// Configuration for the NFT scanner
export interface Config {
  start: number;
  end: number;
  retries: number;
  threads: number;
  modelTarget: string;
  backdropTarget: string;
}

// Result from a successful NFT scan
export interface NFTResult {
  id: number;
  url: string;
  timestamp: string;
}

// Stats about the scanning process
export interface Stats {
  scanned: number;
  found: number;
  errors: number;
  timeElapsed: number;
  progress: number;
}

// Context type for the application
export interface AppContextType {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  results: NFTResult[];
  setResults: React.Dispatch<React.SetStateAction<NFTResult[]>>;
  logs: string[];
  addLog: (message: string) => void;
  clearLogs: () => void;
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
  startScan: () => void;
  stopScan: () => void;
  exportResults: (format: 'json' | 'csv') => void;
}