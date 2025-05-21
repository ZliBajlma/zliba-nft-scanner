import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ConfigPanel } from './components/ConfigPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { ControlPanel } from './components/ControlPanel';
import { LogViewer } from './components/LogViewer';
import { StatsPanel } from './components/StatsPanel';
import { AppContext } from './context/AppContext';
import { NFTResult, AppState, Config } from './types';

function App() {
  // Default configuration based on the Python script
  const [config, setConfig] = useState<Config>({
    start: 1,
    end: 100,
    retries: 3,
    threads: 10,
    modelTarget: "Phantom",
    backdropTarget: "Carrot Juice"
  });

  // App state
  const [appState, setAppState] = useState<AppState>('idle');
  
  // Results and logs
  const [results, setResults] = useState<NFTResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Stats
  const [stats, setStats] = useState({
    scanned: 0,
    found: 0,
    errors: 0,
    timeElapsed: 0,
    progress: 0
  });

  // Add a log entry
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // Start scanning
  const startScan = () => {
    if (appState === 'running') return;
    
    setAppState('running');
    setResults([]);
    setLogs([]);
    setStats({
      scanned: 0,
      found: 0,
      errors: 0,
      timeElapsed: 0,
      progress: 0
    });
    
    addLog(`Starting scan from ${config.start} to ${config.end} with ${config.threads} threads`);
    addLog(`Looking for Model: "${config.modelTarget}" and Backdrop: "${config.backdropTarget}"`);
    
    // In a real implementation, this would call the Python backend
    // For now, we'll simulate the scan with a timer
    simulateScan();
  };

  // Simulate the scanning process
  const simulateScan = () => {
    const totalItems = config.end - config.start + 1;
    let scanned = 0;
    let found = 0;
    let errors = 0;
    let startTime = Date.now();
    
    const intervalId = setInterval(() => {
      // Simulate scanning 1-5 items per interval
      const itemsThisInterval = Math.floor(Math.random() * 5) + 1;
      
      for (let i = 0; i < itemsThisInterval; i++) {
        if (scanned >= totalItems) {
          clearInterval(intervalId);
          setAppState('completed');
          addLog('Scan completed!');
          return;
        }
        
        const current = config.start + scanned;
        scanned++;
        
        // Randomly determine if we found something (10% chance)
        const isFound = Math.random() < 0.1;
        // Randomly determine if there was an error (5% chance)
        const hasError = !isFound && Math.random() < 0.05;
        
        if (isFound) {
          found++;
          const url = `https://t.me/nft/LightSword-${current}`;
          addLog(`[✔] Found: ${url}`);
          setResults(prev => [...prev, {
            id: current,
            url,
            timestamp: new Date().toISOString(),
          }]);
        } else if (hasError) {
          errors++;
          addLog(`[!] Error on https://t.me/nft/LightSword-${current}: Connection timeout (attempt 1)`);
        } else {
          addLog(`[ ] Skipped: https://t.me/nft/LightSword-${current}`);
        }
      }
      
      // Update stats
      const timeElapsed = (Date.now() - startTime) / 1000;
      const progress = (scanned / totalItems) * 100;
      
      setStats({
        scanned,
        found,
        errors,
        timeElapsed,
        progress
      });
      
    }, 200); // Update every 200ms for simulation
    
    // Store the interval ID to clear it when stopping
    // @ts-ignore - In a real app, we'd use a ref
    window.scanIntervalId = intervalId;
  };

  // Stop scanning
  const stopScan = () => {
    if (appState !== 'running') return;
    
    // @ts-ignore - In a real app, we'd use a ref
    clearInterval(window.scanIntervalId);
    setAppState('stopped');
    addLog('Scan stopped by user');
  };

  // Export results
  const exportResults = (format: 'json' | 'csv') => {
    if (results.length === 0) {
      addLog('No results to export');
      return;
    }
    
    let content = '';
    const filename = `nft-results-${new Date().toISOString().slice(0, 10)}.${format}`;
    
    if (format === 'json') {
      content = JSON.stringify(results, null, 2);
    } else {
      // Simple CSV format
      content = 'ID,URL,Timestamp\n';
      content += results.map(r => `${r.id},"${r.url}","${r.timestamp}"`).join('\n');
    }
    
    // Create a download link
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    addLog(`Exported ${results.length} results as ${format.toUpperCase()}`);
  };

  // Clear logs
  const clearLogs = () => {
    setLogs([]);
    addLog('Logs cleared');
  };

  return (
    <AppContext.Provider value={{ 
      config, setConfig, 
      appState, setAppState,
      results, setResults,
      logs, addLog, clearLogs,
      stats, setStats,
      startScan, stopScan, exportResults
    }}>
      <Layout>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <ConfigPanel />
          <StatsPanel />
        </div>
        <ControlPanel />
        <div className="flex flex-col xl:flex-row gap-4">
          <ResultsPanel />
          <LogViewer />
        </div>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;