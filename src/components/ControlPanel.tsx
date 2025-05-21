import React from 'react';
import { Play, Square, Download, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const ControlPanel: React.FC = () => {
  const { startScan, stopScan, exportResults, appState, config } = useAppContext();
  
  // Validation
  const isConfigValid = 
    config.start > 0 && 
    config.end >= config.start && 
    config.threads > 0 && 
    config.threads <= 50 && 
    config.retries > 0 && 
    config.modelTarget.trim() !== '' && 
    config.backdropTarget.trim() !== '';
  
  // Button states
  const canStart = isConfigValid && appState !== 'running';
  const canStop = appState === 'running';
  const canExport = ['stopped', 'completed'].includes(appState);
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={startScan}
          disabled={!canStart}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200
                    ${canStart 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        >
          <Play size={18} className="mr-2" />
          Start Scan
        </button>
        
        <button
          onClick={stopScan}
          disabled={!canStop}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200
                    ${canStop 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        >
          <Square size={18} className="mr-2" />
          Stop Scan
        </button>
        
        <button
          onClick={() => exportResults('json')}
          disabled={!canExport}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200
                    ${canExport 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        >
          <Download size={18} className="mr-2" />
          Export JSON
        </button>
        
        <button
          onClick={() => exportResults('csv')}
          disabled={!canExport}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200
                    ${canExport 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        >
          <Download size={18} className="mr-2" />
          Export CSV
        </button>
        
        {!isConfigValid && (
          <div className="flex items-center text-yellow-500 text-sm ml-auto">
            <AlertTriangle size={16} className="mr-1" />
            Please check your configuration settings
          </div>
        )}
      </div>
    </div>
  );
};