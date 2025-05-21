import React from 'react';
import { Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const ConfigPanel: React.FC = () => {
  const { config, setConfig, appState } = useAppContext();
  
  // Update a specific config field
  const updateConfig = (field: keyof typeof config, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [field]: typeof config[field] === 'number' ? parseInt(value as string) : value
    }));
  };
  
  // Disable inputs when scanning is in progress
  const isDisabled = appState === 'running';
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 md:flex-1">
      <div className="flex items-center mb-4 border-b border-gray-700 pb-2">
        <Settings size={20} className="text-blue-400 mr-2" />
        <h2 className="text-lg font-semibold">Configuration</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Start Index
          </label>
          <input
            type="number"
            value={config.start}
            onChange={(e) => updateConfig('start', e.target.value)}
            disabled={isDisabled}
            min={1}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            End Index
          </label>
          <input
            type="number"
            value={config.end}
            onChange={(e) => updateConfig('end', e.target.value)}
            disabled={isDisabled}
            min={config.start}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Threads
          </label>
          <input
            type="number"
            value={config.threads}
            onChange={(e) => updateConfig('threads', e.target.value)}
            disabled={isDisabled}
            min={1}
            max={50}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Retries
          </label>
          <input
            type="number"
            value={config.retries}
            onChange={(e) => updateConfig('retries', e.target.value)}
            disabled={isDisabled}
            min={1}
            max={10}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Model Target
          </label>
          <input
            type="text"
            value={config.modelTarget}
            onChange={(e) => updateConfig('modelTarget', e.target.value)}
            disabled={isDisabled}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Backdrop Target
          </label>
          <input
            type="text"
            value={config.backdropTarget}
            onChange={(e) => updateConfig('backdropTarget', e.target.value)}
            disabled={isDisabled}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
        <p>The scan will search for NFTs with the specified Model and Backdrop targets.</p>
      </div>
    </div>
  );
};