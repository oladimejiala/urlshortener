import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RefreshCw, Link, MousePointer, TrendingUp, Copy, QrCode, Trash2 } from "lucide-react";
import { type AnalyticsData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function AnalyticsDashboard() {
  const { toast } = useToast();

  const { data: analytics, isLoading, refetch } = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics"],
  });

  const copyToClipboard = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(`https://lnkzip.com/${shortUrl}`);
      toast({
        title: "Success",
        description: "URL copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-6 h-24"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div id="analytics" className="bg-white rounded-2xl shadow-lg p-8" data-testid="card-analytics">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Analytics Dashboard</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          className="text-blue-500 hover:text-blue-600"
          data-testid="button-refresh-analytics"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <Link className="text-blue-500 text-2xl mr-4" />
            <div>
              <p className="text-blue-600 text-sm font-medium">Total URLs</p>
              <p className="text-2xl font-bold text-blue-900" data-testid="text-total-urls">
                {analytics?.totalUrls || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <MousePointer className="text-green-500 text-2xl mr-4" />
            <div>
              <p className="text-green-600 text-sm font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-green-900" data-testid="text-total-clicks">
                {analytics?.totalClicks || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="text-purple-500 text-2xl mr-4" />
            <div>
              <p className="text-purple-600 text-sm font-medium">Avg. Clicks</p>
              <p className="text-2xl font-bold text-purple-900" data-testid="text-avg-ctr">
                {analytics?.avgCtr || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent URLs Table */}
      <div className="overflow-x-auto">
        <h4 className="font-semibold text-gray-900 mb-4">Recent URLs</h4>
        <table className="w-full" data-testid="table-recent-urls">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Short URL</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Original URL</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Clicks</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {analytics?.recentUrls.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No URLs created yet. Create your first shortened URL above!
                </td>
              </tr>
            ) : (
              analytics?.recentUrls.map((url) => (
                <tr
                  key={url.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                  data-testid={`row-url-${url.id}`}
                >
                  <td className="py-3 px-4">
                    <span className="text-blue-600 font-mono text-sm">
                      urlshortener0.com/{url.customAlias || url.shortCode}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600 text-sm truncate max-w-xs block">
                      {url.originalUrl}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold">{url.clickCount}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-500 text-sm">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(url.customAlias || url.shortCode)}
                        className="text-blue-500 hover:text-blue-600 p-1"
                        title="Copy"
                        data-testid={`button-copy-${url.id}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-600 p-1"
                        title="QR Code"
                        data-testid={`button-qr-${url.id}`}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 p-1"
                        title="Delete"
                        data-testid={`button-delete-${url.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
