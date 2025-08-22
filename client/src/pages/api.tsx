import { Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiPage() {
  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link className="text-blue-500 text-2xl mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">TiinyURL</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</a>
              <a href="#analytics" className="text-gray-600 hover:text-gray-900 font-medium">Analytics</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <a href="/api" className="text-blue-500 hover:text-blue-600 font-medium">API</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">TiinyURL API</h2>
          <p className="text-xl text-gray-600 mb-8">Integrate URL shortening into your applications</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">API Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600">
                  Our REST API is currently in development and will be available to Premium users. 
                  The API will allow you to programmatically create, manage, and track your shortened URLs.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Planned Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Create shortened URLs programmatically</li>
                  <li>Retrieve analytics data</li>
                  <li>Manage custom aliases</li>
                  <li>Bulk URL operations</li>
                  <li>Webhook notifications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Get Notified</h3>
                <p className="text-gray-600">
                  Want to be the first to know when our API launches? 
                  <a href="/contact" className="text-blue-500 hover:text-blue-600 ml-1">Contact us</a> to join our early access program.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}