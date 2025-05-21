import React from 'react';
import { BarChart3, Clock, Check, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const StatsPanel: React.FC = () => {
  const { stats, config, appState } = useAppContext();
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate scan rate per minute
  const scanRate = stats.timeElapsed > 0 
    ? Math.round((stats.scanned / stats.timeElapsed) * 60) 
    : 0;
  
  // Calculate estimated time remaining
  const totalItems = config.end - config.start + 1;
  const itemsRemaining = totalItems - stats.scanned;
  const estimatedSecondsRemaining = scanRate > 0 
    ? (itemsRemaining / scanRate) * 60 
    : 0;
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 md:flex-1">
      <div className="flex items-center mb-4 border-b border-gray-700 pb-2">
        <BarChart3 size={20} className="text-blue-400 mr-2" />
        <h2 className="text-lg font-semibold">Statistics</h2>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{stats.progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${stats.progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <Clock size={16} className="text-blue-400 mr-2" />
            <span className="text-sm text-gray-300">Time</span>
          </div>
          <p className="text-lg font-mono">{formatTime(stats.timeElapsed)}</p>
          <p className="text-xs text-gray-400">
            {appState === 'running' && estimatedSecondsRemaining > 0 
              ? `ETA: ${formatTime(estimatedSecondsRemaining)}` 
              : '\u00A0'}
          </p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <BarChart3 size={16} className="text-blue-400 mr-2" />
            <span className="text-sm text-gray-300">Rate</span>
          </div>
          <p className="text-lg font-mono">{scanRate}/min</p>
          <p className="text-xs text-gray-400">{stats.scanned}/{totalItems}</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <Check size={16} className="text-green-500 mr-2" />
            <span className="text-sm text-gray-300">Found</span>
          </div>
          <p className="text-lg font-mono">{stats.found}</p>
          <p className="text-xs text-gray-400">
            {stats.scanned > 0 
              ? `${((stats.found / stats.scanned) * 100).toFixed(1)}%` 
              : '0%'}
          </p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <AlertTriangle size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm text-gray-300">Errors</span>
          </div>
          <p className="text-lg font-mono">{stats.errors}</p>
          <p className="text-xs text-gray-400">
            {stats.scanned > 0 
              ? `${((stats.errors / stats.scanned) * 100).toFixed(1)}%` 
              : '0%'}
          </p>
        </div>
      </div>
    </div>
  );
};