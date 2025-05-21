import React, { useRef, useEffect } from 'react';
import { Terminal, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const LogViewer: React.FC = () => {
  const { logs, clearLogs } = useAppContext();
  const logEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 xl:w-1/3">
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <div className="flex items-center">
          <Terminal size={20} className="text-blue-400 mr-2" />
          <h2 className="text-lg font-semibold">Logs</h2>
        </div>
        <button
          onClick={clearLogs}
          className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
          title="Clear logs"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="bg-gray-900 rounded-md h-[400px] overflow-y-auto p-3 font-mono text-sm">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div 
              key={index} 
              className={`py-1 border-b border-gray-800 ${
                log.includes('[✔]') ? 'text-green-400' :
                log.includes('[!]') ? 'text-yellow-400' :
                log.includes('[✘]') ? 'text-red-400' :
                'text-gray-300'
              }`}
            >
              {log}
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">No logs yet</div>
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};