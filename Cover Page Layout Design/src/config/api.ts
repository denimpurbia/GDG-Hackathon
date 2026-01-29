// Backend runs on port 3001, not 5000!
// Use Vite proxy in dev (just '/api'), or full URL in production
const isDev = import.meta.env.DEV;
const envApiUrl = import.meta.env.VITE_API_BASE_URL;

// In dev, use empty string to leverage Vite proxy, otherwise use explicit URL
export const API_BASE_URL = envApiUrl || (isDev ? '' : 'http://localhost:3001');

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (API_BASE_URL) {
    // If API_BASE_URL is set, use it
    return `${API_BASE_URL}/${cleanEndpoint}`;
  } else {
    // Otherwise use Vite proxy (just the endpoint path)
    return `/${cleanEndpoint}`;
  }
};

// Debug: Log the actual API URL being used
if (import.meta.env.DEV) {
  console.log("🔗 API Base URL:", API_BASE_URL || "(using Vite proxy)");
  console.log("📝 From .env:", envApiUrl || "not set - using Vite proxy");
  console.log("🌐 Backend should be on: http://localhost:3001");
  console.log("🔗 Example API URL:", getApiUrl('api/ai'));
}
