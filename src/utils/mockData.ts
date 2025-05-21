import { NFTResult } from '../types';

// Generate mock data for development
export const generateMockResults = (count: number): NFTResult[] => {
  const results: NFTResult[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = Math.floor(Math.random() * 100) + 1;
    
    results.push({
      id,
      url: `https://t.me/nft/LightSword-${id}`,
      timestamp: new Date().toISOString(),
    });
  }
  
  return results;
};

// Generate a mock log message
export const generateMockLog = (type: 'found' | 'error' | 'skip'): string => {
  const id = Math.floor(Math.random() * 100) + 1;
  const url = `https://t.me/nft/LightSword-${id}`;
  
  switch (type) {
    case 'found':
      return `[✔] Found: ${url}`;
    case 'error':
      return `[!] Error on ${url}: Connection timeout (attempt 1)`;
    case 'skip':
      return `[ ] Skipped: ${url}`;
    default:
      return `[ ] Processing: ${url}`;
  }
};