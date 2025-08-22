import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { QRCodeDisplay } from "./qr-code-display";
import { useToast } from "@/hooks/use-toast";
import { type ShortenedUrlResponse } from "@shared/schema";

interface ShortenedUrlResultProps {
  result: ShortenedUrlResponse;
}

export function ShortenedUrlResult({ result }: ShortenedUrlResultProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://${result.shortUrl}`);
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8" data-testid="card-shortened-result">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your shortened URL is ready!</h3>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <p className="text-sm text-gray-600 mb-1">Short URL:</p>
            <p className="text-lg font-mono text-blue-600" data-testid="text-short-url">
              {result.shortUrl}
            </p>
          </div>
          <Button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            data-testid="button-copy-url"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QRCodeDisplay url={result.shortUrl} shortCode={result.shortCode} />

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Clicks:</span>
              <span className="font-semibold" data-testid="text-click-count">{result.clickCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Created:</span>
              <span className="text-sm text-gray-500" data-testid="text-created-at">
                {new Date(result.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-500 text-sm font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
