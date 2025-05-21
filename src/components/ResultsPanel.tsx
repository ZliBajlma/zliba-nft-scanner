import React, { useState } from 'react';
import { List, Search, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { NFTResult } from '../types';

export const ResultsPanel: React.FC = () => {
  const { results } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter results based on search term
  const filteredResults = searchTerm 
    ? results.filter(r => r.url.toLowerCase().includes(searchTerm.toLowerCase()))
    : results;
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex-1">
      <div className="flex items-center mb-4 border-b border-gray-700 pb-2">
        <List size={20} className="text-blue-400 mr-2" />
        <h2 className="text-lg font-semibold">Results</h2>
        <div className="ml-auto text-sm">
          <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md">
            {results.length}
          </span>
        </div>
      </div>
      
      {/* Search bar */}
      {results.length > 0 && (
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search results..."
            className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      
      {/* Results table */}
      {results.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="px-4 py-2 rounded-tl-md">#</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">Found At</th>
                <th className="px-4 py-2 rounded-tr-md">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-4 py-2 font-mono">{result.id}</td>
                  <td className="px-4 py-2 font-mono text-blue-400">{result.url}</td>
                  <td className="px-4 py-2 text-sm text-gray-400">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2">
                    <a 
                      href={result.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Open
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>No results found yet</p>
          <p className="text-sm mt-2">Start a scan to find matching NFTs</p>
        </div>
      )}
    </div>
  );
};