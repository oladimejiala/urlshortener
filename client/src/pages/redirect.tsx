import { useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ExternalLink } from "lucide-react";

export default function Redirect() {
  const { shortCode } = useParams<{ shortCode: string }>();

  const { data: redirectData, isLoading, error } = useQuery<{ redirectUrl: string }>({
    queryKey: ["/api/redirect", shortCode],
    enabled: !!shortCode,
  });

  useEffect(() => {
    if (redirectData?.redirectUrl) {
      // Small delay to allow click tracking to complete
      setTimeout(() => {
        window.location.href = redirectData.redirectUrl;
      }, 100);
    }
  }, [redirectData]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h1 className="text-xl font-semibold text-gray-900 mb-2">Redirecting...</h1>
              <p className="text-sm text-gray-600">Please wait while we redirect you to your destination.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !redirectData) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Link Not Found</h1>
            </div>
            <p className="mt-4 text-sm text-gray-600 mb-4">
              The shortened URL you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/"
              className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Create a new short link
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Redirecting...</h1>
            <p className="text-sm text-gray-600 mb-4">
              Taking you to: <span className="font-mono text-blue-600">{redirectData.redirectUrl}</span>
            </p>
            <p className="text-xs text-gray-500">
              If you're not redirected automatically, <a href={redirectData.redirectUrl} className="text-blue-500 hover:underline">click here</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
