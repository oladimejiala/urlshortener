import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Mock storage for development/testing
interface MockUrlData {
  id: string;
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
  customAlias: string | null;
  isActive: boolean;
}

const mockUrlStorage: Map<string, MockUrlData> = new Map();
let mockUrlCounter = 0;

// Generate random short code
function generateShortCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Mock response for development/testing when backend is not available
  if (method === "POST" && url === "/api/urls") {
    const customAlias = (data as any)?.customAlias;
    const originalUrl = (data as any)?.originalUrl;
    
    // Generate unique short code if no custom alias
    const shortCode = customAlias || generateShortCode();
    
    // Create unique ID and store the URL
    const id = `mock-${++mockUrlCounter}`;
    const urlData = {
      id,
      shortCode,
      shortUrl: `tiinyurl.com/${shortCode}`,
      originalUrl,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      customAlias: customAlias || null,
      isActive: true,
    };
    
    // Store in mock storage
    mockUrlStorage.set(id, urlData);
    
    return new Response(JSON.stringify(urlData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Mock response for alias check when backend is not available
    if (queryKey[0] === "/api/urls" && queryKey[1] === "check-alias") {
      const alias = queryKey[2];
      if (!alias || alias.length === 0) {
        return { available: false };
      }
      
      // Check if alias is already in use
      const isUsed = Array.from(mockUrlStorage.values()).some(url => url.shortCode === alias);
      return { available: !isUsed };
    }

    // Mock response for analytics when backend is not available
    if (queryKey[0] === "/api/analytics") {
      const storedUrls = Array.from(mockUrlStorage.values());
      const totalClicks = storedUrls.reduce((sum, url) => sum + url.clickCount, 0);
      const avgCtr = storedUrls.length > 0 ? totalClicks / storedUrls.length : 0;
      
      return {
        totalUrls: storedUrls.length,
        totalClicks,
        avgCtr: Math.round(avgCtr * 100) / 100,
        recentUrls: storedUrls.map(url => ({
          id: url.id,
          shortCode: url.shortCode,
          originalUrl: url.originalUrl,
          customAlias: url.customAlias,
          clickCount: url.clickCount,
          isActive: url.isActive,
          createdAt: new Date(url.createdAt),
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      };
    }

    // Mock response for getting URL by short code
    if (queryKey[0] === "/api/urls" && queryKey[1] && queryKey[1] !== "check-alias") {
      const shortCode = queryKey[1];
      const url = Array.from(mockUrlStorage.values()).find(u => u.shortCode === shortCode);
      if (url) {
        // Increment click count when URL is accessed
        url.clickCount++;
        return url;
      }
      throw new Error("URL not found");
    }

    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
