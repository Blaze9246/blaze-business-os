import { auth } from '@clerk/nextjs/server';

const API_BASE_URL = process.env.API_URL || 'http://localhost:3001/api';

/**
 * Get authenticated fetch headers for server-side API calls
 */
export async function getAuthHeaders() {
  const { getToken } = await auth();
  const token = await getToken();
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Server-side authenticated API client
 */
export async function serverApiClient(endpoint: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}
